import Puzzle from "./Puzzle"

function App() {

  return (
    <div style={
      { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }
    }>
      <h1>Сыграем в пятнашки, бро?</h1>
      <Puzzle />
    </div>
  )
}

export default App
