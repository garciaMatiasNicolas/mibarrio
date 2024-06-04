import "./Fines.css";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { postData, getData } from "../../../services/Requests";
import showAlert from "../../Alerts/Alerts.js";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

const apiUrl = process.env.REACT_APP_API_URL;

const Select = ({icon, options, title, name}) => {
    return (
        <div className="d-flex justify-content-start w-100 align-items-start flex-column">
            <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                <MDBIcon className="mb-1" fas icon={icon} style={{color: "#FF914D"}}/>
                <p className="font-text m-0">{title}</p>
            </div>

            <div className="form-group py-2" style={{width:"200px"}}>
                <select name={name} className="input-field bg-white w-100" required>
                    <option defaultChecked className="text-black font-text">...</option>
                    {Object.entries(options).map(([key, value]) => (
                        <option key={key} value={key} className="text-black font-text">{value}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};


const FormCreateFine = ({type, setDataCreated, closeModal}) => {
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [properties, setProperties] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');

    const loadNeighborhoods = async () => {
        try {
            const response = await getData(`${apiUrl}/api/neighborhood/`);
            const data = response.reduce((acc, item) => {
                acc[item.id] = item.name;
                return acc;
            }, {});
            setNeighborhoods(data);
        } catch (error) {
            console.error("Error loading neighborhoods:", error);
        }
    };
    
    const loadProperties = async () => {
        try {
            const response = await getData(`${apiUrl}/api/properties/`);
            const data = response.reduce((acc, item) => {
                acc[item.id] = item.property_number;
                return acc;
            }, {});
            setProperties(data);
        } catch (error) {
            console.error("Error loading properties:", error);
        }
    };
    

    useEffect(() => {
        loadNeighborhoods();
        loadProperties();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
    }
    
    const allowDrop = (event) => {
        event.preventDefault();
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        const data = {
            title: formData.get('title'),
            property: formData.get('property'),
            term: formData.get('term'),
            penalty: formData.get('penalty'),
            observations: formData.get('observations'),
            status: "pending",
            description: formData.get('description'),
            creator: 1
        };
    
        try {
            const response = await postData(`${apiUrl}/api/${type === "noti" ? "notification" : "fines"}/`, data);
            if (response.message === "noti_created") {
                showAlert(
                    'Notificacion creada!',
                    'Su notificacion fue creada exitosamente',
                    {
                        background: '#00a310',
                        titleClass: 'text-white',
                        popupClass: 'border-success',
                        contentClass: 'text-white'
                    },
                    <MDBIcon icon="check" color='white' className="text-success" />
                );
                setDataCreated(response);
            } else if (response.message === "fine_created") {
                showAlert(
                    'Multa creada!',
                    'Su multa fue creada exitosamente',
                    {
                        background: '#00a310',
                        titleClass: 'text-white',
                        popupClass: 'border-success',
                        contentClass: 'text-white'
                    },
                    <MDBIcon icon="check" color='white' className="text-success" />
                );
                setDataCreated(response);
            };
    
        } catch (error) {
            showAlert(
                'Error!',
                `Ocurrio un error: ${error.response.data.logs}`,
                {
                    background: ' #ff4d4d',
                    titleClass: 'text-white',
                    popupClass: 'border-danger',
                    contentClass: 'text-white'
                },
                <MDBIcon icon="times" color='white' className="text-danger" />
            );
        }
        
        closeModal();
    };    
    
    return(
        <form onSubmit={handleSubmit}> 
            <div className="ms-2 mb-3 d-flex justify-content-start w-100 align-items-start flex-column">
                <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                    <MDBIcon className="mb-1" fas icon="comments" style={{color: "#FF914D"}}/>
                    <p className="font-text m-0">Titulo</p>
                </div>
                <input className="input-field mt-1" name="title" type="text" style={{width:"435px"}}/>
            </div>

            <div className="d-flex justify-content-between w-100 align-items-center ms-2">
                <Select icon="home" title="Barrio" options={neighborhoods} />
                <Select icon="home" title="Lote" name="property" options={properties} />
            </div>

            <div className="d-flex justify-content-between w-100 align-items-center mt-3 ms-2">
                <Select icon="stopwatch" title="Plazo de correción" name="term" options={{ "24hs": "24hs", "48hs": "48hs", "72hs": "72hs", "96hs": "96hs" }}  />
                <Select icon="exclamation-circle" title="Penalidad" name="penalty"  options={{ "1/2 Expensa": "1/2 Expensa", "1 Expensa": "1 Expensa", "2 Expensas": "2 Expensas", "3 Expensas": "3 Expensas" }}  />
            </div>

            <div className="mt-3">
                <div className="drag-drop-area d-flex justify-content-center align-items-center flex-column ms-2" onDrop={handleDrop} onDragOver={allowDrop}>
                   <p className="font-text">Arrastra y suelta las imágenes aquí</p> 
                   <MDBBtn className='mx-2' tag='a' outline floating color="secondary">
                        <MDBIcon fas icon="plus" color="secondary" />
                    </MDBBtn>
                </div>
            </div>

            <div className="mt-4 ms-2 d-flex justify-content-start w-100 align-items-start flex-column">
                <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                    <MDBIcon className="mb-1" fas icon="gavel" style={{color: "#FF914D"}}/>
                    <p className="font-text m-0">Articulos infringidos</p>
                </div>
                <textarea className="input-field mt-3" name="description" type="textarea" style={{minWidth:"435px"}}/>
            </div>

            <div className="mt-4 ms-2 d-flex justify-content-start w-100 align-items-start flex-column">
                <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                    <MDBIcon className="mb-1" fas icon="comments" style={{color: "#FF914D"}}/>
                    <p className="font-text m-0">Observaciones</p>
                </div>
                <textarea className="input-field mt-3" name="observations" type="textarea" style={{minWidth:"435px"}}/>
            </div>

            <div className="mt-4 ms-2 d-flex justify-content-start w-100 align-items-start flex-column">
                <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                    <MDBIcon className="mb-1" fas icon="calendar-alt" style={{color: "#FF914D"}}/>
                    <p className="font-text m-0">Fecha</p>
                </div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/dd/yyyy"
                    className="input-field mt-3"
                    style={{minWidth:"435px"}}
                />
            </div>

            <div className="mt-4 ms-2 d-flex justify-content-start w-100 align-items-start flex-column">
                <div className="d-flex justify-content-start align-items-end gap-2 w-auto">
                    <MDBIcon className="mb-1" fas icon="clock" style={{color: "#FF914D"}}/>
                    <p className="font-text m-0">Hora</p>
                </div>
                <TimePicker
                    onChange={setStartTime}
                    value={startTime}
                    className="input-field mt-3"
                    style={{minWidth:"435px"}}
                />
            </div>

            <MDBBtn type="submit" className="create-button mt-3">Crear {type === "noti" ? "Notificación" : "Multa"}</MDBBtn>
        
        </form>
    )
};

export default FormCreateFine;