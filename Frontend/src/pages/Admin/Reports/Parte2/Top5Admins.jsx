import React from 'react'

const handleTop5Admins = (setAdmins) => {
  fetch('http://127.0.0.1:8000/top5admins')
    .then(response => response.json())
    .then(result => {
      if (!result.success) return alert('Error de conexion, intente mas tarde')
      console.log(result.admins)
      setAdmins(result.admins)
    })
}

const Top5Admins = () => {
  const [admins, setAdmins] = React.useState([])

  React.useEffect(() => {
    handleTop5Admins(setAdmins)
  }, [])

  return (
    <div className='list'>
      <header>
        <h3>
          Top 5 de los administradores que más modificaciones realizan en las cuentas de usuarios
        </h3>
      </header>
      <ul className="table-content-user">
        {admins.map((row, index) => 
          <li 
            className="row-content-user qc-table-content"
            key={index}
          >
            <p>{row.username}</p>
          </li>
        )} 
      </ul>
    </div>
  )
}

export default Top5Admins