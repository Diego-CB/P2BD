import React from 'react'

const handleTop10 = (setTop10) => {
    fetch('http://127.0.0.1:8000/cantidadCuentas')
	.then(response => response.json())
	.then(result => {
        if (result.userExist) return alert('No se pudo obtener el listado de usuarios')
        setTop10(result.list)
	})
	.catch(error => {
		console.error('Error al obtner listado de usuarios', error)
	})
}


const CategoryR = () => {

    const [top10, setTop10] = React.useState([])
    top10.length == 0 && handleTop10(setTop10)

    return (
        <div className='list'>
            <header>
                <h3>Cantidad de cuentas avanzadas se han creado en los últimos 6 meses</h3>
                <div className="table-headers qc-table-headers">
                    <div>Cantidad</div>
                </div>
            </header>
            <ul className="table-content-user">
                {top10.map((row, index) => 
                    <li 
                        className="row-content-user qc-table-content"
                        key={index}
                    >
                        <p>{row.cantidad}</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default CategoryR