import React from 'react'

const handleTop10 = (setTop10) => {
    fetch('http://127.0.0.1:8000/top10Genres')
	.then(response => response.json())
	.then(result => {
        if (result.userExist) return alert('No se pudo obtener el listado de usuarios')
        setTop10(result.list)
	})
	.catch(error => {
		console.error('Error al obtner listado de usuarios', error)
	})
}


const Top10 = () => {

    const [top10, setTop10] = React.useState([])
    top10.length == 0 && handleTop10(setTop10)

    return (
        <div className='list'>
            <header>
                <h3>Top 10 de generos mas vistos en 2022</h3>
                <div className="table-headers top10-table-headers">
                    <div>Genero</div>
                    <div>{'Total Consumido (min)'}</div>
                </div>
            </header>
            <ul className="table-content-user">
                {top10.map((row, index) => 
                    <li 
                        className="row-content-user top10-table-content"
                        key={index}
                    >
                        <p>{row.genre}</p>
                        <p>{row.total_consumido}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default Top10