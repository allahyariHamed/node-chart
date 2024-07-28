import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NodeChart from './pages/node-chart'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NodeChart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
