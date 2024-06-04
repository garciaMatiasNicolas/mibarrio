import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const LoginForm = () => {
    return (
        <form action="#">
            <h2>Iniciar sesión</h2>
            <div className="d-flex justify-content-center align-items-center gap-2 w-auto mb-2">
                <MDBBtn className='m-1' floating size='lg' tag='a' style={{ backgroundColor: '#3b5998' }} >
                    <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating size='lg' tag='a' className='m-1' style={{ backgroundColor: '#55acee' }} >
                    <MDBIcon fab icon='twitter' />
                </MDBBtn>
                
                <MDBBtn className='m-1' floating size='lg' tag='a' style={{ backgroundColor: '#dd4b39' }} >
                    <MDBIcon fab icon='google' />
                </MDBBtn>
            </div>
            <span className="mb-2">O usa tu cuenta</span>

            <div className="input-with-icon">
                <MDBIcon icon="envelope" className="input-icon" />
                <input type="email" placeholder="Email" />
            </div>

            <div className="input-with-icon">
                <MDBIcon icon="lock" className="input-icon" />
                <input type="password" placeholder="Contraseña" />
            </div>
            
            <p>¿Olvidaste tu contraseña?</p>
            <button>Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;