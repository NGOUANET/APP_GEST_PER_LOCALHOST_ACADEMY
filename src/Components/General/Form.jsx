import React from 'react';

 function Form({

}) {
    return (
        
        <div className=' w-10/12 max-w-[600px] px-9 py-14 rounded-2xl bg-white border-2 border-gray-100 relative left-96 top-24'>
            <h1 className='text-5xl font-semibold'>Bienvenue</h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>Veuillez entrer votre identifiant et mot de passe s'il vous plaît.</p>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Identifiant</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-cover'
                        placeholder="Votre identifiant"/>
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Mot de passe</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-cover'
                        placeholder="Mot de passe"
                        type={"password"}
                    />
                </div>
                
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-orange-600 rounded-xl text-white font-bold text-lg'>Connexion</button>
                    
                </div>
                
            </div>
        </div>
        
    )   

}
    export default Form