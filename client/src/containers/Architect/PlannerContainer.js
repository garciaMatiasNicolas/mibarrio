import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { DragDropContext } from 'react-beautiful-dnd';
import PlannerColumn from '../../components/Architect/Planner/Columns';
import { getData, postData } from "../../services/Requests";
import showAlert from '../../components/Alerts/Alerts';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const apiUrl = process.env.REACT_APP_API_URL;

const PlannerContainer = () => {
  const [data, setData] = useState({notifications: [], fines1: [], fines2: []});

  const obtainNotifications = async () => {
    try {
      const response = await getData(`${apiUrl}/api/notification/`)
      setData(prevData => ({...prevData, notifications: response}));
    } catch (error) {
      console.error('Error fetching notifications', error);
    }
  };

  const obtainFines = async () => {
    try {
      const response = await getData(`${apiUrl}/api/fines/`);
      console.log(response)
      response.length !== 0 &&  setData(prevData => ({...prevData, fines1: response.filter(fine => fine.type === 'type1'), fines2: response.filter(fine => fine.type === 'type2')})); 
    } catch (error) {
      console.error('Error fetching fines', error);
    }
  };

  useEffect(() => {
    obtainNotifications();
    obtainFines();
  }, []);

  const createFine = async (sourceItem, destinationId) => {
    const today = new Date().toISOString().split('T')[0];

    const data = {
      title: sourceItem.title,
      property: sourceItem.property.id,
      penalty: sourceItem.penalty,
      term: sourceItem.term,
      user: sourceItem.user,
      due_date: today,
      image: sourceItem.image,
      observations: sourceItem.observations,
      status: 'pending'
    };

    if (destinationId.startsWith("fines")){
      if (destinationId === 'fines1') {
        data.content_type = 'notifications';
        data.object_id = sourceItem.id;
      } else {
        data.content_type = 'fines';
        data.object_id = sourceItem.id;
      }
    }

    try {
      const response = await postData(`${apiUrl}/api/fines/`, data);
      response.message === "fine_saved" &&  showAlert(
        'Registro exitoso!',
        'Su multa fue creada exitosamente',
        {
          background: '#00a310',
          titleClass: 'text-white',
          popupClass: 'border-success',
          contentClass: 'text-white'
        },
        <MDBIcon icon="check" color='white' className="text-success" />
      );
    } catch (error) {
      console.log(error);
      showAlert(
        'Oops! Ocurrió un error',
        'Su petición no se completo, si persiste, contactar a soporte',
        {
          background: ' #ff4d4d',
          titleClass: 'text-white',
          popupClass: 'border-danger',
          contentClass: 'text-white'
        },
        <MDBIcon icon="times" color='white' className="text-danger" />
      );
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const sourceColumn = [...data[source.droppableId]]; 
    const destinationColumn = [...data[destination.droppableId]]; 

    const [draggedItem] = sourceColumn.splice(source.index, 1);

    MySwal.fire({
      text: `Está a punto de crear una multa para el lote ${draggedItem.property.number} a partir de esta notificación. ¿Desea continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){}
      /* if (result.isConfirmed) {
        destinationColumn.splice(destination.index, 0, draggedItem);
        setData({
          ...data,
          [source.droppableId]: sourceColumn,
          [destination.droppableId]: destinationColumn,
        });

        if (source.droppableId === 'notifications' && destination.droppableId.startsWith('fines')) {
          createFine(draggedItem, destination.droppableId);
        } else if (source.droppableId.startsWith('fines') && destination.droppableId.startsWith('fines')) {
          createFine(draggedItem, destination.droppableId);
        }
      } else {
        sourceColumn.splice(source.index, 0, draggedItem); 
        setData({
          ...data,
          [source.droppableId]: sourceColumn
        });
      } */
    });
  };

  return (
    <MDBContainer fluid>
      <h2 className="text-center mb-4 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Planner</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <MDBRow className='h-100' style={{minHeight: "550px"}}>
          <MDBCol>
            <PlannerColumn title="Notificaciones" cards={data.notifications} columnId="notifications" />
          </MDBCol>
          <MDBCol>
            <PlannerColumn title="Multas 1" cards={data.fines1} columnId="fines1" />
          </MDBCol>
          <MDBCol>
            <PlannerColumn title="Multas 2" cards={data.fines2} columnId="fines2" />
          </MDBCol>
        </MDBRow>
      </DragDropContext>

      
    </MDBContainer>
  );
};

export default PlannerContainer;


