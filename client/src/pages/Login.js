import LoginContainer from "../containers/Login/LoginContainer";

const LoginPage = () => {

    

    return (
        <div className="w-100 d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <LoginContainer />
            {/* <MDBRow className="w-100 p-0 m-0" style={{minHeight: "100vh"}}> 
                <MDBCol md='4' style={{background: "#FFFCF1", minHeight: "100vh"}} className="p-0 m-0 h-100">
                    <div style={wrapper}>
                        <img src={logo} className="logo" alt="Logo del software Mi Barrio"/>
                        <p style={{color: "FF914D"}} className="fs-5">Bienvenido de vuelta!</p>
                        {isSignUp ? <SingUp setIsSignUp={setIsSignUp} /> : <LogInForm setIsSignUp={setIsSignUp} /> }
                    </div>
                </MDBCol>

                <MDBCol md='8' className="p-0 m-0 h-100" style={{minHeight: "100vh"}}>
                    <img className="w-100" style={{minHeight: "100vh"}} src={AssetLogIn} alt="Ciudad de noche dibujada a mano" />
                </MDBCol>
            </MDBRow> */}
        </div>
    );

}

export default LoginPage;