// PlannerCard.js
import React from 'react';
import { MDBCard, MDBCardBody, MDBBtn, MDBCardTitle, MDBCardHeader, MDBCardFooter, MDBIcon, MDBBadge } from 'mdb-react-ui-kit';

const PlannerCard = ({ id, content }) => {
  return (
    <MDBCard alignment='center'>
      <MDBCardHeader className='d-flex w-100 justify-content-between align-items-center'>
        <p className='font-text m-0' style={{fontSize: "12px"}}>ID: {content.id}</p>
        <p className='font-text m-0' style={{fontSize: "12px"}}>Lote {content.property.number}</p>
      </MDBCardHeader>
      <MDBCardBody className='w-100 d-flex flex-column justify-content-start align-items-start'>
        <div className='d-flex justify-content-between align-items-center w-100'>
          <MDBCardTitle className='font-text' style={{fontSize: "16px"}}>{content.title}</MDBCardTitle>
          <p className='font-text m-0'>Plazo: {content.term}</p>
        </div>

        <div className='d-flex justify-content-between align-items-center w-100'>
          <p className='font-text m-0' style={{fontSize: "12px"}}>{content.observations}</p>
          <MDBBtn className='gap-2' color='tertiary'>
            <MDBIcon fas icon="download" size='sm' color='black'/>
            <span className='font-text text-black' style={{fontSize: "12px"}}>.pdf</span>
          </MDBBtn>
        </div>

        {content.status === 'solved' ? (
          <MDBBadge color='success' pill className='font-text'>Solucionado</MDBBadge>
        ) : content.status === 'unsolved' ? (
          <MDBBadge color='danger' pill className='font-text'>Vencida</MDBBadge>
        ) : content.status === 'pending' ? (
          <MDBBadge color='warning' pill className='font-text'>Pendiente</MDBBadge>
        ) : null}

      </MDBCardBody>
      <MDBCardFooter className='d-flex w-100 justify-content-between align-items-center'>
        <p className='text-muted font-text m-0' style={{fontSize: "12px"}}>{content.due_date}</p>
        <div className='d-flex w-auto gap-2'>
          <MDBIcon fas color='success' icon='pen' style={{cursor:"pointer"}}/>
          <MDBIcon fas color='danger' icon='trash' style={{cursor: "pointer"}}/>
        </div>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default PlannerCard;

