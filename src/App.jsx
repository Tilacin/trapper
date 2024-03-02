import { Route, Routes } from "react-router-dom"
import GameArea from './components/GameArea'
import ProgressPage from "./components/ProgressPage"


function App() {
  return (
    
    <Routes>
    <Route path="/" element={ <GameArea />} />
    <Route path="/progress" element={<ProgressPage />} />
  </Routes>
       
     
  )
}

export default App
