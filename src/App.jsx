import { Routes, Route } from "react-router-dom"
import { createContext, useState } from "react"
import Home from './pages/home'
import Search from './pages/search'
import Result from './pages/result'
import NotFound from './pages/notfound'
export const UserContext = createContext()

const App = () => {
  const [likedMovies, setLikedMovies] = useState([])

  //tabe taghire vaziate movie bar asase like
  const toggleLike = (id) => {
    setLikedMovies((prev) => prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id])
  }

  return (
    <UserContext.Provider value={{ likedMovies, toggleLike }}>
      <div className="mt-[50px] mb-[120px] mx-auto w-[920px] container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search/:query/:page" element={<Search />} />
          <Route path="/search/genre/:genre/:page" element={<Search />} />
          <Route path='/result/:id' element={<Result />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App
