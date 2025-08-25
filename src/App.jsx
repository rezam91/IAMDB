import { Routes , Route } from "react-router-dom"
import Head from './components/head'
import Home from './pages/home'
import Search from './pages/search'
import Result from './pages/result'
import NotFound from './pages/notfound'

const App = () => {

  return (
    <>
      <Head />
      <div className="mt-[50px] ml-auto mr-auto w-[920px] border border-white" >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search/:query/:page" element={<Search />} />
          <Route path="/search/genre/:genre/:page" element={<Search />} />
          <Route path='/result/' element={<Result />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
