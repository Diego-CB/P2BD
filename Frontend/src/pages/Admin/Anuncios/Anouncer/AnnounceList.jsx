import React from "react"

const handleAdsList = (setAds) => {
    fetch('http://127.0.0.1:8000/announcerList')
	.then(response => response.json())
	.then(result => {
        if (!result.success) return alert('No se pudo obtener el listado de anuncios')
        setAds(result.list)
	})
	.catch(error => {
		console.error('Error al obtner listado de anuncios', error)
	})
}

const AdsList = ( {ads, setAds}) => {

    ads.length == 0 && handleAdsList(setAds)

    return (
        <div className="ver-content-admin">
            <header>
                <h3>Listado de Anunciantes</h3>
                <div className="table-headers announce-table-headers">
                    <div>announcer_id</div>
                    <div>a_name</div>
                </div>
            </header>
            <ul className="table-content">
                {ads.map((row, index) => 
                    <li 
                        className="row-content announce-row-content"
                        key={index}
                    >
                        <p>{row.announcer_id}</p>
                        <p>{row.a_name}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default AdsList