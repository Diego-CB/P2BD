import React from 'react'

const handleTop10Terms = (setTerms) => {
  fetch('http://127.0.0.1:8000/Top10Terms')
    .then(response => response.json())
    .then(result => {
      if (!result.success) return alert('Error de conexion, intente mas tarde')
      setTerms(result.terms)
    })
}

const Top10Terms = () => {
  const [terms, setTerms] = React.useState([])

  React.useEffect(() => {
    handleTop10Terms(setTerms)
  }, [])

  return (
    <div className='list'>
      <header>
        <h3>Top 10 de los términos que los usuarios buscan </h3>
      </header>
      <ul className="table-content-user">
        {terms.map((row, index) => 
          <li 
            className="row-content-user qc-table-content"
            key={index}
          >
            <p>{row.term}</p>
          </li>
        )} 
      </ul>
    </div>
  )
}

export default Top10Terms
