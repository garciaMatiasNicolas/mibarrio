import { useState } from "react";
import Navbar from "../../layouts/Navbar";
import Sidebar from "../../layouts/Sidebar";
import FinesContainer from "../../containers/Architect/FinesContainer";
import NotificationsContainer from "../../containers/Architect/NotiContainers";
import ProfileContainer from "../../containers/ProfileContainer";
import SettingsContainer from "../../containers/SettingsContainer";
import PlannerContainer from "../../containers/Architect/PlannerContainer";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";

const Dashboard = () => {
    const [containerDisplay, setContainerDisplay] = useState("Dashboard");

    return(
        <div className="d-flex flex-column">
            <Navbar/>
            <MDBRow className="w-100 gap-0 p-0">
                <MDBCol lg="2" md="4">
                    <Sidebar userType={"Architect"} setContainerDisplayed={setContainerDisplay}/>
                </MDBCol>

                <MDBCol lg="9" md="8">
                    <main className="container-fluid">
                        {containerDisplay === "Fines" && <FinesContainer userType={"Architect"}/>}
                        {containerDisplay === "Notifications" && <NotificationsContainer userType={"Architect"}/>}
                        {containerDisplay === "Profile" && <ProfileContainer/>}
                        {containerDisplay === "Settings" && <SettingsContainer/>}
                        {containerDisplay === "Planner" && <PlannerContainer/>}
                    </main>
                </MDBCol>
            </MDBRow>
                    
        </div>
    );
};

export default Dashboard;
