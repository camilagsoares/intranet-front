import Header from './components/Header'
import { GlobalStyle } from "./styles/global"
import Table from './components/Table'
import Index from './pages/Index'
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from 'react';

function App() {

  const [open, setOpen] = useState(true);

  return (
    <div className='flex'>
      <div className='bg-dark-blue h-screen p-5 pt-8 w-72 relative'>
        <BsArrowLeftShort className='bg-white text-dark-blue text-3xl rounded-full absolute -right-3 top-9 border-dark-blue cursor-pointer' />
      </div>
      <div className='p-7'></div>
      <h1 className='text-2xl font-semibold'>Home page</h1>
      <Index />
      {/* 
      <GlobalStyle /> */}
    </div>
  )
}

export default App
