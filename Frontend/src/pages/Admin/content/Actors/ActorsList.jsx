import React, { useEffect } from "react"

const handleActorsList = (setActorsList) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/actorsList", requestOptions)
      .then(response => response.json())
      .then(result => setActorsList(result.list))
      .catch(error => console.log('error', error));
}

const ActorList = () => {

    const [actorsList, setActorsList] = React.useState([])

    actorsList.length == 0 && handleActorsList(setActorsList)

    return (
        <div className="ver-content-admin">
            <header>
                <h3>Listado de Actores</h3>
                <div className="table-headers-actors">
                    <div>Id actor</div>
                    <div>Nombre</div>
                </div>
            </header>
            <ul className="table-content-actors">
                {actorsList.length > 0 && actorsList.map((row, index) => (
                    <li 
                        className="row-content-actors"
                        key={index}
                    >
                        <p>{row.id_actor}</p>
                        <p>{row.actor}</p>
                    </li>
                )
                )} 
            </ul>
        </div>
    )
}

export default ActorList