import { useEffect, useState } from "react";
import CreateFine from "../../components/Architect/Fines/CreateFine";
import FiltersFines from "../../components/Architect/Fines/FiltersFines";
import TableFines from "../../components/Architect/Fines/TableFines";
import { getData } from "../../services/Requests";

const apiUrl = process.env.REACT_APP_API_URL;

const FinesContainer = ({userType}) => {
    return userType === "Architect" ? <ArchitectFines/> : <OwnersFines/>
};

const ArchitectFines = () => {

    const [data, setData] = useState([]);
    
    const obtainFines = async () => {
        try {
          const response = await getData(`${apiUrl}/api/fines/`);
          response.length !== 0 &&  setData(response); 
        } catch (error) {
          console.error('Error fetching fines', error);
        }
    };

    useEffect(()=>{
        obtainFines();
    }, [])

    return(
        <div style={{flexGrow: 1}} className="d-flex justify-content-start align-items-start flex-column gap-5">
            <CreateFine type="fine" setDataCreated={setData}/>
            <FiltersFines/>
            <TableFines data={data}/> 
        </div>
    )
}

const OwnersFines = () => {
    return(
        <div>Multas Propietarios</div>
    )
}

export default FinesContainer;