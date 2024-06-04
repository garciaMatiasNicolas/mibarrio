// PlannerColumn.js
import React from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PlannerCard from './Cards';

const PlannerColumn = ({ title, cards, columnId }) => {
  return (
    <MDBCard className="border-end border-bottom" style={{ height: '100%', minHeight:"300px"}}>
      <MDBCardBody>
        <h3 className="mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>{title}</h3>
        <Droppable droppableId={columnId}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlannerCard id={card.id} content={card} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default PlannerColumn;

