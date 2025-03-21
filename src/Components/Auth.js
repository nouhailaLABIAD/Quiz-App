import React from "react";
import * as Components from './Components.js';

function Auth() {
    const [signIn, toggle] = React.useState(true);
    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Créer un compte</Components.Title>
                    <Components.Input type='text' placeholder="Nom d'utilisateur" />
                    <Components.Input type='email' placeholder='Email' />
                    <Components.Input type='password' placeholder='Mot de passe' />
                    <Components.Button>S'inscrire</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Se connecter</Components.Title>
                    <Components.Input type='email' placeholder='Email' />
                    <Components.Input type='password' placeholder='Mot de passe' />
                    <Components.Anchor href='#'>Mot de passe oublié ?</Components.Anchor>
                    <Components.Button>Se connecter</Components.Button>
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
