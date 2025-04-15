import React from "react";
import * as Components from './Components.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Auth() {
    const [signIn, toggle] = React.useState(true);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

     // Fonction pour l'inscription
     const handleSignUp = async (e) => {
        e.preventDefault();  // Ajout pour éviter la soumission par défaut du formulaire
        console.log("Début de la fonction handleSignUp");
        try {
            const response = await axios.post('http://localhost:3001/auth/signup', {
                nom,
                prenom,
                email,
                password,
            });

            // Rediriger vers la page de connexion après inscription
            if (response.data.token) {
                toggle(true);  // Passer à l'écran de connexion
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();  // Ajout pour éviter la soumission par défaut du formulaire
        console.log("Début de la fonction handleLogin");
    
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                password,
            });
        
            if (response.data.token) {
                const token = response.data.token;
    
                // Vérifier si le token est bien décodé
                try {
                    const base64Payload = token.split('.')[1];
                    const payload = atob(base64Payload);
                    const decoded = JSON.parse(payload);
                    
                    console.log('Token décodé:', decoded); // Vérifie si 'role' est bien dans le token
    
                    // Vérification et redirection selon le rôle
                    if (decoded.role === 'admin') {
                        console.log('Redirection vers /dashboardAdmin');
                        navigate('/dashboardAdmin', { replace: true });
                    } else {
                        console.log('Redirection vers /dashboardUser');
                        navigate('/dashboardUser', { replace: true });
                    }
                } catch (decodeError) {
                    console.error('Erreur de décodage:', decodeError);
                }
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };
    
    
 
    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Créer un compte</Components.Title>
                    <Components.Input type='text' placeholder="Nom " value={nom} onChange={(e) => setNom(e.target.value)}  />
                    <Components.Input type='text' placeholder="Prenom"  value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Components.Button onClick={handleSignUp}>S'inscrire</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Se connecter</Components.Title>
                    <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Components.Input type='password' placeholder='Mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* <Components.Anchor href='#'>Mot de passe oublié ?</Components.Anchor> */}
                    <Components.Button onClick={handleLogin}>Se connecter</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>

                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Bienvenue de nouveau !</Components.Title>
                        <Components.Paragraph>
                            Pour participer aux quiz et tester vos connaissances, connectez-vous avec vos informations personnelles.
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Se connecter
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Bonjour, ami(e) !</Components.Title>
                        <Components.Paragraph>
                            Entrez vos informations personnelles et commencez à jouer à nos quiz passionnants !
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            S'inscrire
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    )
}

export default Auth;
