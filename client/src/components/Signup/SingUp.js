import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { getData, postData } from '../../services/Requests';
import showAlert from '../Alerts/Alerts';

const apiUrl = process.env.REACT_APP_API_URL;

const SignUpForm = () => {
    const formRef = useRef(null);
    const [neighborhoods, setNeighborhoods] = useState([]);

    const loadNeighborhoods = async () => {
        try {
            const response = await getData(`${apiUrl}/api/neighborhood/`);
            setNeighborhoods(response);
        } catch (error) {
            console.error("Error loading neighborhoods:", error);
        }
    };
    
    useEffect(() => {
        loadNeighborhoods();
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        const data = {
            email: formData.get('email'),
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            dni: formData.get('dni'),
            user_type: 'owner',
            password: formData.get('password'),
            neighborhood: formData.get('neighborhood'),
            property_number: formData.get('property_number')
        };
    
        try {
            const response = await postData(`${apiUrl}/api/users/`, data);
            if (response.message === "user_created") {
                showAlert(
                    'Registro exitoso!',
                    'Su usuario fue creado exitosamente',
                    {
                        background: '#00a310',
                        titleClass: 'text-white',
                        popupClass: 'border-success',
                        contentClass: 'text-white'
                    },
                    <MDBIcon icon="check" color='white' className="text-success" />
                );
            }
        } catch (error) {
            showAlert(
                'Error!',
                'Ocurrio un error durante el registro de su usuario',
                {
                    background: ' #ff4d4d',
                    titleClass: 'text-white',
                    popupClass: 'border-danger',
                    contentClass: 'text-white'
                },
                <MDBIcon icon="times" color='white' className="text-danger" />
            );
        } finally {
            formRef.current.reset();
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <h2>Crear Cuenta</h2>
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

            <span>O usa tu email para registrate</span>
            
            <div className='d-flex justify-content-center align-items-center gap-2 w-100 mt-2'>
                <div className="input-with-icon">
                    <MDBIcon icon="user" className="input-icon" />
                    <input type="text" name='first_name' placeholder="Nombre"style={{color:"#FF914D"}}  autocomplete="off" required/>
                </div>

                <div className="input-with-icon">
                    <MDBIcon icon="user" className="input-icon" />
                    <input type="text" name='last_name' placeholder="Apellido" style={{color:"#FF914D"}} autocomplete="off" required/>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center gap-2 w-100'>
                <div className="input-with-icon">
                    <MDBIcon icon="passport" className="input-icon" />
                    <input type="number" name='dni' placeholder="DNI" style={{color:"#FF914D"}} autocomplete="off" required/>
                </div>

                <div className="input-with-icon">
                    <MDBIcon icon="envelope" className="input-icon" />
                    <input type="email" placeholder="Email" name='email' style={{color:"#FF914D"}} autocomplete="off" required/>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center gap-2 w-100'>
                <div className="input-with-icon">
                    <MDBIcon icon="lock" className="input-icon" />
                    <input type="password" name='password' placeholder="Contraseña" style={{color:"#FF914D"}} autocomplete="off" required/>
                </div>
               
                <div className="input-with-icon">
                    <MDBIcon icon="house" className="input-icon" />
                    <select required defaultValue="" name='neighborhood'>
                        <option value="" disabled hidden>Barrio</option>
                        
                        {neighborhoods.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                        
                    </select>
                </div>
            </div>

            <div className="input-with-icon">
                <MDBIcon icon="house" className="input-icon" />
                <input type="number" name='property_number' placeholder="N° de lote" />
            </div>
            
            <button className='mt-2'>Registrarme</button>
        </form>
    );
};

export default SignUpForm;
