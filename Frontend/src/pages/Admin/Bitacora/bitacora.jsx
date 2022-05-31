import React, { useEffect } from "react"

const handleRecords = ( setRecords ) => {

    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/recordList", requestOptions)
    .then(response => response.json())
    .then(result => setRecords(result.list))
    .catch(error => console.log('error', error));

}

const Bitacora = ({ setAdminShow }) => {

    const [records, setRecords] = React.useState([])
    // typeof(records == 'undefined') && handleRecords(setRecords) && console.log('Si fjklsd;ajfl')

    useEffect( () => {
        const rec = handleRecords(setRecords);
    }, [])

    console.log(' -> ', records)
    return (
        <div className = 'content'>
            <div className="ver-bitacora-admin">
                <header>
                    <h3>Bitácora</h3>
                    <div className="table-bitacora">
                        <div>Username</div>
                        <div>Hora de cambio</div>
                        <div>Tipo de cambio</div>
                        <div>Tabla</div>
                        <div>Descripción</div>
                    </div>
                </header>
                <ul className="table-content-bitacora">
                    {records.length > 0 && records.map((row, index) => (
                        <li 
                            className="row-bitacora"
                            key={index}
                        >
                            <p>{row.username}</p>
                            <p>{row.record_time}</p>
                            <p>{row.record_type}</p>
                            <p>{row.table_name}</p>
                            <p>{row.description}</p>
                        </li>
                    )
                    )} 
                </ul>
            </div>
            <footer className="admin-footer">
                <button 
                    className="default-button nav-button"
                    onClick={() => setAdminShow(0)}
                >
                    Ir a Homepage
                </button>
            </footer>
        </div>
    )
}

export default Bitacora;