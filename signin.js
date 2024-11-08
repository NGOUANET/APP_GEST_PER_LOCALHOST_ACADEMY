import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [nom, setNom] = useState("");
    const [mdp, setMdp] = useState("");
    const navigate = useNavigate(); // Hook de navigation pour redirection

    const login = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/login', {
                username: nom,
                password: mdp
            });

            if (res.status === 200) {
                console.log("Connexion réussie");
                navigate('/home'); // Redirige vers la page d'accueil
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
            />
            <button onClick={login}>Enregistrer</button>
        </div>
    );
}

export default SignIn;
