import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que los estilos estén en un archivo separado y bien importados.
import LogInForm from '../../components/Login/LogInForm';
import SignUpForm from '../../components/Signup/SingUp';

const LogInContainer = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <SignUpForm/>
            </div>
            <div className="form-container sign-in-container">
                <LogInForm />
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h2>¿Ya tienes cuenta?</h2>
                        <p>Ingresa aquí!</p>
                        <button className="ghost" onClick={handleSignInClick} id="signIn">Inicia sesión</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h2>Bienvenido de vuelta!</h2>
                        <p>¿No tienes cuenta? <br />Creala!</p>
                        <button className="ghost" onClick={handleSignUpClick} id="signUp">Registrarme</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInContainer;
