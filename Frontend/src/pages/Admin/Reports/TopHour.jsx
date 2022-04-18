import React from 'react'
import TextInput from '../../../components/TextInput.jsx'

const handleTop10 = (setTop10, date) => {
    fetch('http://127.0.0.1:8000/getDateTop', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			date,
		})
	})
	.then(response => response.json())
	.then(result => {
        if (!result.success) return alert('No se pudo agregar la pelicula')
        console.log(result.list)
        setTop10(result.list)
	})
	.catch(error => {
		console.error('Error al agregar peliculas', error)
	})
}


const CategoryR = () => {

    const [top10, setTop10] = React.useState([])
    const [date, setDate] = React.useState([])

    return (
        <>
        <TextInput 
            set = {setDate} 
            title='Ingrese fecha mm-dd-yyyy para hora pico' 
            className='add-movie-input'
        /> 
        <button
            className="default-button add-movie-button"
            type='button'
            onClick={() => {
                if (date == ''){
                    return alert('Llene los campos para continuar')
                }

                handleTop10(setTop10, date)
            }}
        >
            Buscar hora pico
        </button>
        
        <div className='list'>
            <header>
                <h3>Cantidad de cuentas avanzadas se han creado en los últimos 6 meses</h3>
                <div className="table-headers qc-table-headers">
                    <div>Hora Pico</div>
                </div>
            </header>
            <ul className="table-content-user">
                {top10.map((row, index) => 
                    <li 
                        className="row-content-user qc-table-content"
                        key={index}
                    >
                        <p>{row.hora}</p>
                    </li>
                )} 
            </ul>
        </div>
        </>
    )
}

export default CategoryR