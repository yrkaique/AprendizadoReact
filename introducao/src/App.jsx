
function App() {

  let nome = "Kaique"
  let sobrenome = "Jesus"
  let nome_completo = nome + " " + sobrenome

  let cliques = 0 // let cliques = useState(0) // useState é uma função do React que permite criar um estado para a variável cliques

  function aumentarCliques() {
    cliques += 1
  }

  return (
    <div>
      <h1>Olá {2+2} Mundo!</h1>
      <p>Estou apren{console.log("flores")}dendo React!</p>
      <p>Meu nome é {nome_completo}</p>

      <hr/>

      <p>Você clicou {cliques} vezes</p>
      <button onClick={aumentarCliques}>Clique aqui!</button>
    </div>
  )
}

export default App
