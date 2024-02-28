import { Link } from "react-router-dom"



const StartPage = () => {


  return (
    <div className="flex gap-8 justify-center flex-col items-center w-screen h-screen bg-[url('/start.jpg')]  bg-center bg-cover text-2xl font-bold text-amber-300">
      <h1>Главная</h1>
      <Link to='/game'>Играть</Link>
    </div>
  )
}

export default StartPage