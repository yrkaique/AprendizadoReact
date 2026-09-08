import { useState } from 'react'

function App() {

  const [users, setUsers] = useState([])


  async function buscarTodos() {
    const response = await fetch('https://dummyjson.com/users')
    const data = await response.json()
    console.log(data)
    setUsers(data.users)
  }

  function mostrarInformacoes(user) {
    alert("Telefone"+user.phone+"\nEmail: "+ user.email+"\nMora em: "+user.address.city)
  }

  return (
    <div>

      <h1>Consumo API</h1>
      <p>Buscando dados de API DummyJSON</p>

      <ul>

        {
          users.length == 0 ?
            <button onClick={buscarTodos}>Carregar dados</button>
          :
            users.map(
              i => <li> Sr(a) {i.firstName} tem {i.age} anos. <button onClick={() => mostrarInformacoes(i)}>Ver informações</button> </li>
            )
        }

      </ul>

    </div>
  );
}

export default App;