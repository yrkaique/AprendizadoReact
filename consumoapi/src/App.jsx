import { useEffect, useState } from "react";

function App() {

    const [usuarios, alteraUsuarios] = useState([])
    const [pesquisa, alteraPesquisa] = useState("")

    async function buscarTodos(){
        const response = await fetch("https://dummyjson.com/users")
        const data = await response.json()
        console.log(data)
        alteraUsuarios(data.users)
    }

    async function buscarNome(nome){
        const response = await fetch("https://dummyjson.com/users/search?q="+nome)
        const data = await response.json()
        console.log(data)
        alteraUsuarios(data.users)
    }

    function mostrarInformacoes(usuario){
        alert("Telefone: "+ usuario.phone +"\nEmail: "+ usuario.email+"\nCidade: "+usuario.address.city)
    }

    useEffect( ()=>{
        buscarTodos()
    }, [] )

    return (
        <div>

            <h1>Consumo de API</h1>
            <p>Buscando dados da API DummyJSON</p>
            
            <hr/>
            <input onChange={ e => alteraPesquisa(e.target.value) } placeholder="Digite um nome..." />
            <button onClick={ ()=> buscarNome(pesquisa) } >🔎 Pesquisar</button>

            <ul>
                {
                    usuarios.length == 0 ?
                        <p>Lista vazia...</p>
                    :
                        usuarios.map(
                            i => <li> <img width="30" src={"https://api.dicebear.com/10.x/initials/svg?seed="+i.firstName} /> {i.gender == "male" ? "O senhor" : "A senhora"} {i.firstName} tem {i.age} anos <button onClick={ ()=> mostrarInformacoes(i) } >Ver informações</button> </li>
                        )
                }                
            </ul>

        </div>
    );
}

export default App;