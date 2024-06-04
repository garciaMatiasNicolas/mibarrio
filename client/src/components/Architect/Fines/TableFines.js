import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import "./Fines.css";

const ColumnNames = ({name, icon}) => {
    return(
        <th scope='col' className='w-auto'>
            <div className="d-flex justify-content-center align-items-center w-auto gap-2">
                <MDBIcon fas icon={icon} style={{color:"#FF914D"}} />
                <p className='font-text mt-3' style={{color:"#FF914D"}}>{name}</p>
            </div>
        </th>
    )
};

const TableFines = ({data}) => {
    return (
        <div style={{overflow: "auto"}} className='w-100'>
            <MDBTable align='middle' responsive="xl">
                <MDBTableHead>
                    <tr>
                        <ColumnNames name="Titulo" icon="book" />
                        <ColumnNames name="Fecha" icon="calendar-alt" />
                        <ColumnNames name="Lote" icon="house" />
                        <ColumnNames name="Propietario" icon="user" />
                        <ColumnNames name="Barrio" icon="house" />
                        <ColumnNames name="Estado" icon="check-circle" />
                        <ColumnNames name="Penalidad" icon="exclamation-circle" />
                        <ColumnNames name="Plazo" icon="stopwatch" />
                        <ColumnNames name="Aviso" icon="file-pdf" />
                    </tr>
                </MDBTableHead>
                    {console.log(data)}
                <MDBTableBody>
                    {data.map(item=> (
                        <tr>
                            {/* TITULO */}
                            <td className='font-text text-center'>{item.title}</td>
                            {/* FECHA */}
                            <td className='font-text text-center'>{item.due_date}</td>
                            {/* LOTE */}
                            <td className='font-text text-center'>Lote Nº {item.property.number}</td>
                            {/* PROPIETARIO */}
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='ms-3'>
                                        <p className='font-text mb-1 text-center'>{item.property.owner}</p>
                                        <p className='font-text text-muted mb-0 text-center'>{item.property.email}</p>
                                    </div>
                                </div>
                            </td>
                            {/* BARRIO */}
                            <td>
                                <p className='font-text mb-1 text-center'>{item.property.neighborhood}</p>
                                <p className='font-text text-muted mb-0 text-center'>{item.property.address}</p>
                            </td>
                            {/* ESTADO */}
                            <td>
                                {item.status === 'solved' ? (
                                <MDBBadge color='success' pill className='font-text'>Solucionado</MDBBadge>
                                ) : item.status === 'unsolved' ? (
                                <MDBBadge color='danger' pill className='font-text'>Sin solución</MDBBadge>
                                ) : item.status === 'pending' ? (
                                <MDBBadge color='warning' pill className='font-text'>Pendiente</MDBBadge>
                                ) : `${item.status}`}
                            </td>
                            {/* PENALIDAD */}
                            <td className='font-text text-center'>{item.term}</td>
                            {/* PLAZOO */}
                            <td className='font-text text-center'>{item.penalty}</td>
                            {/* PDF */}
                            <td style={{"cursor": "pointer"}}>
                                <div className="d-flex justify-content-start align-items-center gap-2 w-auto">
                                    <MDBIcon fas icon="download" />
                                    <p className='font-text mt-3 text-center'>.pdf</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
        </div>
    )
};

export default TableFines;