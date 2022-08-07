import React, { useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, serError] = useState(null);
  const [cancel, setCancel] = useState(false)
  useEffect(() => {
    const fetchMoviesHandler = async () => {
      setIsLoading(true);
      serError(null)
      try {
        const res = await fetch('https://react-fetch-movies-30c1d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')
        if (!res.ok) {
          throw new Error('Something went wrong! retrying..please wait for few minutes');
          
        }
        <button>retrying</button>
  
      const data = await res.json()
      console.log(data)

      const loadedMovies = [];

      for( const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releseDate: data[key].releseDate
        })
      }

        setMovies(loadedMovies);
  
      }
      catch (error){
        serError(error.message);
      }
      setIsLoading(false)
      
    }
    
    fetchMoviesHandler()
  }, [])

  const cancelRetry = ()=> {
    setCancel(true);
    setIsLoading(false)
  }

  const addMoviesHandler = async (movie) => {
    const res = await fetch('https://react-fetch-movies-30c1d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data)
  }

  

  

  return (
    <React.Fragment>
      <section>
      <AddMovie onLoad={addMoviesHandler} />
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Movies not found!</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error} <button onClick={cancelRetry}>stop retrying</button></p>}
        {cancel && <p>No movies available</p>}

      </section>
    </React.Fragment>
  );
}

export default App;
