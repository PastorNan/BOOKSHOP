import React from 'react'
import ShowAll from './Components/ShowAll'
import AddBook from './Components/AddBook'


function App() {  

  return (
    <div className='m-5'>
      <h1 className='text-black  text-6xl text-center'>WELCOME TO THE BOOKSHOP</h1>
      <AddBook/>
      <ShowAll/>
    </div>
  )
}

export default App
