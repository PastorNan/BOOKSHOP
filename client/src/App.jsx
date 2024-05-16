import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ShowAll from './Components/ShowAll'
import AddBook from './Components/AddBook'
import NavBar from './Components/NavBar'
import NotFound from './Components/NotFound'
import UpdateBook from './Components/UpdateBook'


function App() {  

  return (
    <div className='m-5'>
      <h1 className='text-black  text-6xl text-center'>WELCOME TO THE BOOKSHOP</h1>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ShowAll/>}/>
        <Route path='/book'>
          <Route path='add' element={<AddBook/>} />
          <Route path='update/:id' element={<UpdateBook />} />
        </Route>
       <Route path='*' element={<NotFound/>} />
      </Routes>

    </div>
  )
}

export default App
