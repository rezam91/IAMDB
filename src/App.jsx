import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Head from './components/head';
import Home from './pages/home';
import Search from './pages/search';
import Result from './pages/result';
import NotFound from './pages/notfound';

// Create context
export const UserContext = createContext();

const App = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  const toggleLike = (id) => {
    setLikedMovies((prev) =>
      prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]
    );
  };

  return (
    <UserContext.Provider value={{ likedMovies, toggleLike }}>
      <Head />
      <div className="border border-white mt-[50px] mx-auto w-[920px]">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search/:query/:page" element={<Search />} />
          <Route path="/search/genre/:genre/:page" element={<Search />} />
          <Route path='/result/' element={<Result />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
