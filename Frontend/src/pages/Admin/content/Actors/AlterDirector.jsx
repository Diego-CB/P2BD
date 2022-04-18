import React from "react"
import TextInput from "../../../../components/TextInput.jsx"

const handleAlterMovie = (proyect, director, select, newValue) => {
    
    if (select == 'director') {
        newValue = `'${newValue}'`
    }

    fetch('http://127.0.0.1:8000/alterDirector', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            proyect,
            director,
            select,
            newValue,
        })
    })
    .then(response => response.json())
    .then(result => {
        if (!result.success) return alert('No se pudo modificar el director')
        alert('Se modifico el director con exito')
    })
    .catch(error => {
        console.error('Error al agregar peliculas', error)
    })
}

const AlterMovie = ({ }) => {

    const [idContent, setIdContent] = React.useState(0)
    const [nombre, setNombre] = React.useState(0)
    const [select, setSelect] = React.useState('')
    const [newValue, setNewValue] = React.useState('')

    return (
        <div className="add-content-admin">
            <header>
                <h3>Editar Director</h3>
            </header>
            <form className="alter-movie-form">
                <div className='alter-movie-input d1'>
                    <h4>Ingrese nombre del director a editar</h4>
                    <input 
                        onChange={(event) => setNombre(event.target.value)}
                        type="text"
                        value={nombre}
                    />
                </div>
                
                <div className='alter-movie-input d1'>
                    <h4>Ingrese id del proyecto del director a editar</h4>
                    <input 
                        onChange={(event) => setIdContent(event.target.value)}
                        type="number"
                        value={idContent}
                    />
                </div>

                <div className='alter-movie-input'>
                    <h4>Seleccione campo a editar</h4>
                    <select 
                        onChange={(event) => setSelect(event.target.value)}
                        name="select" 
                        className="genre-select"
                    >
                        <option value='-'>-</option>
                        <option value='director'>Nombre</option>
                        <option value='id_content'>Proyecto</option>
                    </select>
				</div>		

                <TextInput 
                    title='Ingrese nuevo valor' 
                    set={setNewValue} 
                    className='alter-movie-input'
                /> 

                <button
                    className="default-button alter-movie-button"
                    type='button'
                    onClick={() => {
                        if (idContent == 0  || newValue == ''){
                            return alert('Llene los campos para continuar')
                        }

                        handleAlterMovie(idContent, nombre, select, newValue)
                    }}
                >
                    Editar Director {nombre} en {idContent}
                </button>
            </form>
        </div>
    )
}

export default AlterMovie