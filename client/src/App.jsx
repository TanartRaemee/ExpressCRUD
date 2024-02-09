import FromProduct from './components/FromProduct'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FromEditProduct from './components/FromEditProduct'


function App() {
  

  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path='/' element={<FromProduct />} />        
        <Route path='/edit/:id' element={<FromEditProduct />} />        
      </Routes> 
    </>
    </BrowserRouter>
  )
}

export default App
