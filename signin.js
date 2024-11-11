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

    // return (
    //     <div>
    //         <input
    //             type="text"
    //             placeholder="Nom d'utilisateur"
    //             value={nom}
    //             onChange={(e) => setNom(e.target.value)}
    //         />
    //         <input
    //             type="password"
    //             placeholder="Mot de passe"
    //             value={mdp}
    //             onChange={(e) => setMdp(e.target.value)}
    //         />
    //         <button onClick={login}>Enregistrer</button>
    //     </div>
    // ); 






return (
        
    <div className=' w-10/12 max-w-[600px] px-9 py-14 rounded-2xl bg-white border-2 border-gray-100 relative left-96 top-24'>
        <h1 className='text-5xl font-semibold'>Bienvenue</h1>
        <p className='mt-4 text-lg font-medium text-gray-500'>Veuillez entrer votre identifiant et mot de passe s'il vous plaît.</p>
        <div className='mt-8'>
            <div className='flex flex-col'>
                <label className='text-lg font-medium'>Identifiant</label>
                <input 
                    className='w-full p-4 mt-1 bg-cover border-2 border-gray-100 rounded-xl'
                    placeholder="Nom d'utilisateur"  value={nom}
                    onChange={(e) => setNom(e.target.value)}/>
            </div>
            <div className='flex flex-col mt-4'>
                <label className='text-lg font-medium'>Mot de passe</label>
                <input 
                    className='w-full p-4 mt-1 bg-cover border-2 border-gray-100 rounded-xl'
                    placeholder="Mot de passe"
                    type={"password"}  value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                />
            </div>
            
            <div className='flex flex-col mt-8 gap-y-4'>
                <button onClick={login} className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-orange-600 rounded-xl text-white font-bold text-lg'>Connexion</button>
                
            </div>
            
        </div>
    </div>
    
) 
} 

export default SignIn;






