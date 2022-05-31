import React, { useEffect } from "react"

const handleCastingList = (setCastingList) => {
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/castingList", requestOptions)
    .then(response => response.json())
    .then(result => setCastingList(result.list))
    .catch(error => console.log('error', error));
}

const CastingList = ({castingList, setCastingList}) => {

    castingList.length == 0 && handleCastingList(setCastingList)

    return (
        <div className="ver-content-admin">
            <header>
                <h3>Listado de Casting</h3>
                <div className="table-headers-casting">
                    <div>Id película</div>
                    <div>Título película</div>
                    <div>Id actor</div>
                </div>
            </header>
            <ul className="table-content-casting">
                {castingList.length > 0 && castingList.map((row, index) => 
                    <li 
                        className="row-content-casting"
                        key={index}
                    >
                        <p>{row.id_content}</p>
                        <p>{row.title}</p>
                        <p>{row.id_actor}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default CastingList
