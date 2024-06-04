import { useEffect, useState } from "react";
import CreateNotification from "../../components/Architect/Notifications/CreateNoti.js";
import TableNotifications from "../../components/Architect/Notifications/TableNoti.js";
import { getData } from "../../services/Requests.js";

const apiUrl = process.env.REACT_APP_API_URL;
const NotificationsContainer = ({userType}) => {
    return(
        userType === "Architect" ? <ArchitectNoti/> : <OwnersNoti/>
    )
};

const ArchitectNoti = () => {
    const [data, setData] = useState([]);

    const obtainNotifications = async () => {
        try {
          const response = await getData(`${apiUrl}/api/notification/`)
          setData(response);
        } catch (error) {
          console.error('Error fetching notifications', error);
        }
    };

    useEffect(()=>{
        obtainNotifications();
    }, []);

    return(
        <div style={{flexGrow: 1}} className="d-flex justify-content-start align-items-start flex-column gap-5">
            <CreateNotification type="noti" setDataCreated={setData} />
            <TableNotifications data={data} />
        </div>
    )
}

const OwnersNoti = () => {
    return(
        <div>Notificaciones Propietarios</div>
    )
}

export default NotificationsContainer;