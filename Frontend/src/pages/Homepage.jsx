import React, { useEffect, useState } from "react"
import Header from "../components/Header.jsx";

// Images
import Titanic from "../images/imgMovies/Titanic.png"
import TheMessanger from "../images/imgMovies/TheMessanger.jpg"
import Shrek1 from "../images/imgMovies/Shrek1.jpg"
import SecondAct from "../images/imgMovies/SecondAct.jpg"
import Ratatouille from "../images/imgMovies/Ratatouille.jpeg"
import KickButtowski from "../images/imgMovies/KickButtowski.jpg"

import '../styles/homepage.css'

// Arrow function to get the movie info
const handleHomepage = (setMovies) => {
	fetch('http://127.0.0.1:8000/moviesList', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({})
    })
	.then(response => response.json())
	.then (result => {
		// console.log('Movies: ', result.movies)
        setMovies(result.movies)
	})
	.catch (error => {
		console.error('Error en homepage', error)
		alert('Server connection problem at handleHomepage')
	})
}

// Para mostrar las pelis favoritas del usuario
const handleFavorites = (username, profile, setFavMovies) => {
	fetch('http://127.0.0.1:8000/getFavorites', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        setFavMovies(result.favorites)
	})
	.catch (error => {
		console.error('Error en handleFavs', error)
		alert('Server connection problem at handleFavorites')
	})
}

// Para añadir a favoritos
const handleAddFavorites = (id_content, username, profile) => {
	fetch('http://127.0.0.1:8000/addFavorite', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            id_content,
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        console.log('AddFavorites ', result.sucesss)
	})
	.catch (error => {
		console.error('Error en handleFavs', error)
		alert('Server connection problem at handleFavorites')
	})
}

// Para cambiar estado a watching
const handleUpdateState = ( username, profile) => {
	fetch('http://127.0.0.1:8000/updateState', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        // console.log('From handleUpdateState', result.sucesss)
	})
	.catch (error => {
		console.error('Error en handleFavs', error)
		alert('Server connection problem at handleFavorites')
	})
}

const handleUpdateStateFalse = ( username, profile, setEstado) => {
	fetch('http://127.0.0.1:8000/updateStateFalse', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        setEstado(false)
        // console.log('From handleUpdateState', result.sucesss)
	})
	.catch (error => {
		console.error('Error en handleUpdateStateFalse', error)
		alert('Server connection problem at handleUpdateStateFalse')
	})
}


const handleTomarEstado = ( username, profile, setEstado ) => {
	fetch('http://127.0.0.1:8000/tomarEstado', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        setEstado(result.estado[0].estado)
	})
	.catch (error => {
		console.error('Error en handleFavs', error)
		alert('Server connection problem at handleFavorites')
	})
}


const handleContinuarViendo = ( username, profile, setContinueMovies ) => {
	fetch('http://127.0.0.1:8000/ContinuarViendo', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        setContinueMovies(result.continue)
	})
	.catch (error => {
		console.error('Error en handleContinuarViendo', error)
		alert('Server connection problem at handleContinuarViendo')
	})
}


const handleSubirVisualizacion = ( id_content, started, finished, username, profile ) => {
	fetch('http://127.0.0.1:8000/subirVisualizacion', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            id_content,
            started,
            finished,
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        console.log(result.sucesss)
	})
	.catch (error => {
		console.error('Error en handhandlesubirVisualizacionleFavs', error)
		alert('Server connection problem at handleFavohandlesubirVisualizacionrites')
	})
}


const handleSearchActor = ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchActor', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleSearchDirector = ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchDirector', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleSearchTitle = ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchTitle', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleSearchCategory= ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchCategory', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleSearchGenero= ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchGenero', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleSearchFecha= ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchFecha', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handlePremios= ( nameactor, setMoviesSearched ) => {
	fetch('http://127.0.0.1:8000/SearchPremios', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            nameactor,
        })
    })
	.then(response => response.json())
	.then (result => {
        setMoviesSearched(result.moviess)
        console.log('Nombre ', nameactor)
        console.log('Lista de pelis ', result.moviess)
	})
	.catch (error => {
		console.error('Error en handleSearchActor', error)
		alert('Server connection problem at handleSearchActor')
	})
}


const handleRecomendations= ( username, profile, setRecomendations ) => {
	fetch('http://127.0.0.1:8000/Recomendations', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
            username,
            profile,
        })
    })
	.then(response => response.json())
	.then (result => {
        setRecomendations(result.moviess)
	})
	.catch (error => {
		console.error('Error en handleRecomendations', error)
		alert('Server connection problem at handleRecomendations')
	})
}


const handleAnuncios= ( setAdAnuncio ) => {
	fetch('http://127.0.0.1:8000/Anuncio', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({})
    })
	.then(response => response.json())
	.then (result => {
        setAdAnuncio(result.ad[0].message)
        alert('ad: ' + result.ad[0].message);
	})
	.catch (error => {
		console.error('Error en handleRecomendations', error)
		alert('Server connection problem at handleRecomendations')
	})
}

const handleSetFinishedMovie = ( profile, content, username ) => {
	fetch('http://127.0.0.1:8000/setFinishedMovie', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({
			content,
			profile,
			username,
		})
	})
	.then(response => response.json())
	.then (result => {
		if (!result.success) return alert('Error de conexion')
		console.log('Finalizada la pelicula')
	})
	.catch (error => {
		console.error('Error en handleRecomendations', error)
		alert('Server connection problem at handleRecomendations')
	})
}


// -------- MAIN HOMEPAGE --------
const Homepage = ({username, profile}) => {

    const [adAnuncio, setAdAnuncio] = React.useState('El sabor Chapin')
    const [movies, setMovies] = React.useState('')
    const [startTime, setStartTime] = React.useState(0)
    const [estado, setEstado] = React.useState(false)
    const [category, setCategory] = React.useState('Actor')
    const [favMovies, setFavMovies] = React.useState('')
    const [continueMovies, setContinueMovies] = React.useState('')
    const [moviesSearched, setMoviesSearched] = React.useState('')
    const [recomendations, setRecomendations] = React.useState(false)
    const [searchingFor, setSearchingFor] = React.useState('')

    useEffect(() => {
        const moviesFav = handleFavorites(username, profile, setFavMovies)
        const moviesCont = handleContinuarViendo(username, profile, setContinueMovies)
        const moviesCall = handleHomepage(setMovies);
        const moviesReco = handleRecomendations(username, profile, setRecomendations)
        setInterval(
            function(){
                const adAlert = handleAnuncios(setAdAnuncio);
            }
            ,600000
        );

        }, [])

    const images = [Titanic, Shrek1, Ratatouille, SecondAct, KickButtowski, TheMessanger]

	return(
		<div className = 'content-home'>
			<Header title='Movies'/>
			<h4 className='Welcome'>Welcome {profile}</h4>
			<div className='main-content-homepage'>
				<div className='Search-bar'>
                    <form action="/" method="get" className='Search'>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search movies"
                            name="s" 
                            onChange={(event) => setSearchingFor(event.target.value)} />
                        <select className="Search-select"
                            onChange={(event) => setCategory(event.target.value)}>
                            <option value="Actor">Actor</option>
                            <option value="Director">Director</option>
                            <option value="Nombre">Nombre</option>
                            <option value="Categoria">Categoria</option>
                            <option value="Genero">Genero</option>
                            <option value="FechaE">Fecha estreno</option>
                            <option value="Premios">Premios</option>
                        </select>
                        <button className="Search-btn" onClick={()=>{
                            console.log('cat', category)
                            if (category==='Actor') {
                                handleSearchActor(searchingFor, setMoviesSearched)
                            } else if (category==='Director') {
                                handleSearchDirector(searchingFor, setMoviesSearched)
                            } else if (category==='Nombre') {
                                handleSearchTitle(searchingFor, setMoviesSearched)
                            } else if (category==='FechaE') {
                                handleSearchFecha(searchingFor, setMoviesSearched)
                            } else if (category==='Premios') {
                                handlePremios(searchingFor, setMoviesSearched)
                            } else if (category==='Genero') {
                                handleSearchGenero(searchingFor, setMoviesSearched)
                            } else if (category==='Categoria') {
                                if (searchingFor.toLowerCase()==='pelicula' || searchingFor.toLowerCase()==='película' || searchingFor.toLowerCase()==='peliculas' || searchingFor.toLowerCase()==='películas'){
                                    const verdad = true
                                    handleSearchCategory(verdad, setMoviesSearched)
                                } else if (searchingFor.toLowerCase()==='serie' || searchingFor.toLowerCase()==='series'){ 
                                    const falso = false
                                    handleSearchCategory(falso, setMoviesSearched)
                                }
                            }
                            event.preventDefault();
                        }}>Search</button>
                    </form>
				</div>
                <div className="Searched">
                    <h3>De tu búsqueda se encontró...</h3>
                    {moviesSearched && moviesSearched.map((movie) => (
                        <h4 className="favs">{movie.title}</h4>
                    ))}
                </div>
                <div className='ContinueWatching'>
                    <h3>Continuar Viendo</h3>
                    {continueMovies && continueMovies.map((movie) => (
                        <h4 className="favs">{movie.title}</h4>
                    ))}
                </div>
                <div className='WishList'>
                    <h3>Favoritas</h3>
                    {favMovies && favMovies.map((movie) => (
                        <h4 className="favs">{movie.title}</h4>
                    ))}
                </div>
                <div className='Recomendations'>
                    <h3>Recomendaciones</h3>
                    {recomendations && recomendations.map((movie) => (
                        <h4 className="favs">{movie.title}</h4>
                    ))}
                </div>
                <div className='Espacio'></div>
				<div className="Movies">
					<h3>Películas</h3>    
                    <div className="Movies-grid">
                        {movies && movies.map((movie) => (
                            <div className="Movie">
                                <h4 className="Movie-title" key={movie.id_content}>{movie.title}</h4>
                                <img className="Movie-pic" src={images[movie.id_content - 1]}></img>
                                <br/>
                                <button className="Movie-btn" onClick={() => {
                                    if (estado == false) {
                                        // Cambiar estado de user_profiles
                                        const StartingTime = new Date().toISOString()
                                        setStartTime(StartingTime)
                                        handleUpdateState(username, profile)
                                        handleTomarEstado(username,profile,setEstado)
                                    } else if (estado == true) {
                                        alert("No se permiten visualizar 2 películas al mismo tiempo. Intenta más tarde!")
                                    }
                                }}>Ver película</button>
                
                                <button className="Movie-btn" onClick={() => {
                                    if (estado == true) {
                                        const StopTime = new Date().toISOString()
                                        console.log('Stop: ', StopTime)
                                        console.log('Start: ', startTime)
                                        handleSubirVisualizacion(movie.id_content, startTime, StopTime, username, profile)
                                        handleUpdateStateFalse(username, profile, setEstado)
                                    }
                                    //Llamar función de fetch
                                }}>Detener película</button>

                                <button className="Movie-btn" onClick={() => {
																	handleSetFinishedMovie( profile, movie.id_content, username)
																	//Llamar función de fetch
                                }}>Finalizar película</button>

                                <button className="Movie-btn" onClick={() => {
                                    console.log('Favoritos', movie.id_content)
                                    handleAddFavorites(movie.id_content, username, profile)
                                }}>Agregar a Favoritos</button>
                            </div>
                        ))}
                    </div>
				</div>
			</div>
		</div>
	)
}

export default Homepage;