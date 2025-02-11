import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import Search from './Components/Search'

function App() {
  return (
    <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
    </div>
  )
  }

export default App
