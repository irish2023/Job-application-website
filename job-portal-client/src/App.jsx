import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar />
    {/*<h1 className='text-3xl font-bold text-indigo-700 bg-yellow-400'> Hello developer!! </h1>*/} 
     <Outlet />
     <footer>Footer</footer>
    </>
   
  )
}

export default App
