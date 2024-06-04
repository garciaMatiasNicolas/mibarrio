import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Sidebar.css";
import { MDBIcon } from "mdb-react-ui-kit";
import { archTasks, propTasks } from "../data/Tasks";

const Sidebar = ({userType, setContainerDisplayed}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);


  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const setContainer = (id) => {
    setContainerDisplayed(id);
  }

  return (
    <div className="sidebar">
        <nav style={{minHeight:"100vh"}} className="d-flex flex-column justify-content-between align-items-start">
            <ul>
                <li className="d-flex justify-content-start align-items-center w-auto gap-2">
                    <MDBIcon fas icon="home" color="white"/>
                    <Link to="/dashboard" className="text-white m-0">
                        <span>Inicio</span>
                    </Link>
                </li>

                <li style={{cursor:"pointer"}} onClick={()=>{setContainer("Profile")}} className="d-flex justify-content-start align-items-center w-auto gap-2">
                    <MDBIcon fas icon="user-alt" color="white"/>
                    <span className="text-white m-0">Perfil</span>
                </li>

                <li style={{cursor:"pointer"}} onClick={()=>{setContainer("Settings")}} className="d-flex justify-content-start align-items-center w-auto gap-2">
                    <MDBIcon fas icon="cog" color="white"/>
                    <span className="text-white m-0">Configuración</span>
                </li>

                <li className="d-flex justify-content-start align-items-center w-auto gap-2" style={{cursor: "pointer"}} onClick={toggleSubMenu}>
                    <MDBIcon fas icon="tools"  color="white"/>
                    <span>Tareas</span>
                    <MDBIcon fas icon={subMenuOpen ? "caret-down" : "caret-up"} color="white" size="xs"/>
                </li>
                
                {subMenuOpen && (
                    <ul className="subnav">
                        {userType === "Architect" ? 
                            (archTasks.map(item => (<li key={item.id} onClick={()=>{setContainer(item.id)}} className="d-flex justify-content-start align-items-center w-auto gap-2" style={{cursor: "pointer"}}><MDBIcon fas icon={item.icon} color="white"/><span>{item.name}</span></li>))) 
                            : 
                            (propTasks.map(item => (<li key={item.id} onClick={()=>{setContainer(item.id)}} className="d-flex justify-content-start align-items-center w-auto gap-2" style={{cursor: "pointer"}}><MDBIcon fas icon={item.icon} color="white"/><span>{item.name}</span></li>)))}
                    </ul>
                )}
            </ul>
            
            <ul>
                <li className="d-flex justify-content-start align-items-center w-auto gap-2">
                    <MDBIcon fas icon="sign-out-alt" color="white"/>
                    <Link to="/login" className="text-white m-0">
                        <span>Cerrar sesión</span>
                    </Link>
                </li>
                <li className="d-flex justify-content-start align-items-center w-auto gap-2">
                    <MDBIcon fas icon="headset" color="white"/>
                    <Link to="/support" className="text-white m-0">
                        <span>Contactar a soporte</span>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default Sidebar;

