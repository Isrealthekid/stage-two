import { Link } from 'react-router-dom'
import IMDb from "../src/assets/imgs/IMDb.png"
import fruit from "../src/assets/imgs/fruit.png"
import requests from './Request'
import { useState, useEffect } from 'react'
import NavBar from './NavBar'

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(requests.requestTopRated)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setMovies(data.results.slice(0, 10));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const movie = movies[currentIndex];

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
  }

  return (
    <div className='w-full bg-cover bg-center h-screen bg-gradient-to-r from-black to-gray-400 ' loading="lazy" style={backgroundStyle}>
      <NavBar />

      <section className='ml-3 md:ml-5% text-white w-95% md:w-30% mt-30 md:mt-20'>
        <h1 className='text-10 md:text-12'>{movie?.title}</h1>

        <div className='flex my-3 text-4 w-full'>
          <div className='flex mr-8'>
            <img src={IMDb} alt="" className='mr-2' /> <p>86.0 / 100</p>
          </div>

          <div className='flex'>
            <img src={fruit} alt="" className='mr-2' /> <p>97%</p>
          </div>
        </div>

        <p className='my-8 pr-4 text-4'>{truncateString(movie?.overview, 200)}</p>

        <Link to="" className='text-white py-2 px-5 rounded-1 bg-#BE123C hover:bg-red-500 transition'><i className="fa fa-play-circle"></i>  WATCH TRAILER</Link>
      </section>
    </div>
  )
}

export default Hero;
