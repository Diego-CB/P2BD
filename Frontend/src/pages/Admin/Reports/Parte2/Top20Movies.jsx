import React from "react";

const handleTop20Movies = (start, end, setMovies) => {
  fetch('http://127.0.0.1:8000/Top20Movies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      start,
      end
    })
  })
    .then(response => response.json())
    .then(result => {
      if (!result.success) return alert('Error de conexion, intente mas tarde')
      setMovies(result.movies)
    })
}

const Top20Movies = () => {
  const [start, setStart] = React.useState('')
  const [end, setEnd] = React.useState('')
  const [movies, setMovies] = React.useState([])

  return (
    <>
    <div className="date-input">
			<h4>Ingrese fecha de Inicio</h4>
      <input 
        className="date-input" 
        onChange={(event) => setStart(event.target.value)}
			  type="date"
      />
		</div>
    <div className="date-input">
			<h4>Ingrese fecha final</h4>
			<input 
        className="date-input" 
        onChange={(event) => setEnd(event.target.value)}
			  type="date"
      />
		</div>
    <button
      className="default-button add-movie-button"
      type='button'
      onClick={() => {
        if ([start, end].includes('')) return alert(
          'Llene los campos para continuar'
        )
        handleTop20Movies(start, end, setMovies)
      }}
    >
      hacer consulta entre {start} y {end}
    </button>
    
    {movies.length > 0 
    && (
      <div className='list'>
        <header>
          <h3>
            Top 20 de películas que comenzaron a verse pero que llevan más de 20 días 
            sin finalizarse
          </h3>
        </header>
        <ul className="table-content-user">
          {movies.map((row, index) =>
            <li 
              className="row-content-user qc-table-content"
              key={index}
            >
              <p>{row.title}</p>
            </li>
          )}
        </ul>
      </div>
    )}
    </>
  )
}

export default Top20Movies
