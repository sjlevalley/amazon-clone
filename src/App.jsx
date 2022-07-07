import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Checkout from './Checkout'
import Header from './Header'
import Home from './Home'

function App () {
  return (
    <Router>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/checkout'
            element={
              <>
                <Checkout />
              </>
            }
          />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
