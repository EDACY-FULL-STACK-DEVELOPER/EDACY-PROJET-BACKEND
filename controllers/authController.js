const User = require('../models/User');
const jwt = require('jsonwebtoken');


// inscription
exports.register = async (req, res) => {

    try {
        const {prenom, nom, email, password} = req.body;

        if (!password) {
            return res.status(400).json({ message: "Le mot de passe est requis" });
          }
      
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
          }

        const user = new User({prenom, nom, email, password});
        await user.save();
      
    } catch (error) {
        console.error("Erreur dans register :", error);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
        
    }

};

// connexion
exports.login = async (req, res) =>{
    const { email, password } = req.body;

    try {
        // Vérifier que email et password sont fournis
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }
        // comparer le mot de passe fourni avec celui qui est dans la base de donnée
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // generer un token
        const token = jwt.sign(
            {
                userId: user._id,
                prenom: user.prenom,
                nom: user.nom,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // renvoyer un objet contenant les informations de l'utilisateur
        res.status(200).json({
            message: 'Connexion reussi!',
            token, 
            user: {
                id: user._id,
                prenom: user.prenom,
                nom: user.nom,
                email: user.email
            },
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", err); // Log l'erreur
        res
        .status(500)
        .json({ message: "Erreur lors de la connexion.", error: err.message });
        
    }
};