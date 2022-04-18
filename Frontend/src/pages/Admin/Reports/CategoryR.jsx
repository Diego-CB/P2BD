import React from 'react'

const handleTop10 = (setTop10) => {
    fetch('http://127.0.0.1:8000/categoryReproduc')
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
                <h3>Cantidad de reproducciones por cada categoría, por tipo de cuenta en 2022</h3>
                <div className="table-headers CatR-table-headers">
                    <div>Reproducciones</div>
                    <div>Categoria</div>
                    <div>Cuenta</div>
                </div>
            </header>
            <ul className="table-content-user">
                {top10.map((row, index) => 
                    <li 
                        className="row-content-user CatR-table-content"
                        key={index}
                    >
                        <p>{row.reproducciones}</p>
                        <p>{row.ismovie ? 'Pelicula' : 'Serie'}</p>
                        <p>{row.plan == 0 ? 'Basica' 
                            : (row.plan == 1 ? 'Estandar' : 'Avanzada')
                        }</p>
                    </li>
                )} 
            </ul>
        </div>
    )
}

export default CategoryR