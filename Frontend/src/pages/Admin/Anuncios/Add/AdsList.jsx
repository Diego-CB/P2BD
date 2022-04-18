import React from "react"

const handleAdsList = (setAds) => {
    fetch('http://127.0.0.1:8000/adsList')
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
                <h3>Listado de Anuncios</h3>
                <div className="table-headers ads-table-headers">
                    <div>ad_id</div>
                    <div>announcer_id</div>
                    <div>message</div>
                </div>
            </header>
            <ul className="table-content">
                {ads.map((row, index) => 
                    <li 
                        className="row-content ads-row-content"
                        key={index}
                    >
                        <p>{row.ad_id}</p>
                        <p>{row.announcer_id}</p>
                        <p>{row.message}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default AdsList