
import { useState } from "react"

function App() {

  let [cliques, alteraCliques] = useState(0)
  let [nome, alterarNome] = useState("aguardando...")

  function carregarNome(){
    alterarNome("Kaique")
  }

  return (
    <div>

      <h1>Olá Mundo!</h1>
      <p>Estou aprendendo React!</p>
      <p>Meu nome é : {nome}</p>
      <button onClick={carregarNome}>Carregar nome</button>

      <hr/>

      <p>Você clicou {cliques} vezes</p>
      <button onClick={ () => alteraCliques(cliques + 1) }>Clique aqui!</button>

    </div>
  )
}

export default App
