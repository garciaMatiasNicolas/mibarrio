import { 
    MDBBtn, 
    MDBIcon, 
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter 
} from "mdb-react-ui-kit";
import FormCreateFine from "./FormCreateFine";
import { useState } from "react";
import "./Fines.css";

const CreateFine = ({type, setDataCreated}) => {
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => {setBasicModal(!basicModal)};

    return(
        <div className="w-auto d-flex justify-content-center align-items-center gap-2">
            <h5 className="font-text mt-2">Crear multa</h5>

            <MDBBtn onClick={toggleOpen} className='mx-2' tag='a' color='success' outline floating>
                <MDBIcon fas icon="plus" />
            </MDBBtn>

            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1' staticBackdrop>
                <MDBModalDialog >
                    <MDBModalContent>
                        <MDBModalHeader style={{background: "#FF914D"}}>
                            <p className="mt-3 text-white fs-5">Formulario de creación de multa</p>
                            <MDBIcon far icon="times-circle" color="white" size="lg" onClick={toggleOpen} style={{cursor:"pointer"}}/>
                        </MDBModalHeader>
                        
                        <MDBModalBody>
                            <FormCreateFine type={type} setDataCreated={setDataCreated}/>
                        </MDBModalBody>

                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
}

export default CreateFine;