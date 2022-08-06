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
        const res = await fetch('https://swapi.dev/api/films/')
        if (!res.ok) {
          throw new Error('Something went wrong! retrying..please wait for few minutes');
          
        }
        <button>retrying</button>
  
      const data = await res.json()
  
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releseDate: movieData.relese_data
          }
        })
        setMovies(transformedMovies);
  
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

  

  return (
    <React.Fragment>
      <section>
      <AddMovie  />
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
