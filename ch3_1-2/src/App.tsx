import Puzzle from "./Puzzle"

function App() {

  return (
    <div style={
      { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }
    }>
      <h1 style={{ margin: '0 0 20px', textAlign: 'center' }}>Сыграем в пятнашки, бро?</h1>
      <Puzzle />
    </div>
  )
}

export default App
