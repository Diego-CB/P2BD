import React from "react"
import TextInput from "../../../../components/TextInput.jsx"

const handleTop5Content = (month, setTop5) => {
  fetch('http://127.0.0.1:8000/top5Content', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      month
    })
  })
    .then(response => response.json())
    .then(result => {
      if (!result.success) return alert('Error de conexion, intente mas tarde')
      setTop5(result.tops)
    })
}

const Top5Content = () => {
  const [top5, setTop5] = React.useState([])
  const [month, setMonth] = React.useState('')
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1]

  return (
    <>
    <TextInput 
      set = {setMonth} 
      title='Ingrese mes para buscar' 
      className='add-movie-input'
    /> 
    <button
      className="default-button add-movie-button"
      type='button'
      onClick={() => {
        if (month === '0') return setTop5([])
        try{
          const intMonth = parseInt(month, 10)
          if (intMonth < 0 || intMonth > 12 || month == ''){
            return alert('Llene los campos para continuar')
          }

          handleTop5Content(month, setTop5)
        } catch (e) {
          return alert('Llene los campos para continuar')
        }
      }}
    >
      hacer consulta para mes {month}
    </button>
    
    {top5.length > 0 
    && top5.map((top, indexTop) => {
      if (top.length === 0) return (
        <div 
          className='list'
          key={indexTop}
        >
          <header>
            <h3>Top 5 de contenido visto a las {hours[indexTop]} en mes {month}</h3>
          </header>
          <ul className="table-content-user">
            <li 
              className="row-content-user qc-table-content"
            >
              <p>No se vio contenido en este tiempo</p>
            </li>
          </ul>
        </div>
      )
      
      return (
        <div className='list'>
          <header>
            <h3>Top 5 de contenido visto a las {hours[indexTop]} en mes {month}</h3>
          </header>
          <ul className="table-content-user">
            {top.map((row, index) => 
              <li 
                className="row-content-user qc-table-content"
                key={index}
              >
                <p>{row.title}</p>
              </li>
            )} 
          </ul>
        </div>
      )
    })}
    </>
  )
}

export default Top5Content
