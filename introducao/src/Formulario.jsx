import { useState } from "react"

function Formulario(){

    let [nome, alteraNome] = useState("")
    let [idade, alteraIdade] = useState("")
    let [cidade, alteraCidade] = useState("")
    let [estado, alteraEstado] = useState("")

    function salvar(){
        if(nome <= 0){
            alert("Preencha o campo nome")
            return
        }
        if(idade <= 0){
            alert("Preencha o campo idade")
            return
        }
        if(cidade <= 0){
            alert("Preencha o campo cidade")
            return
        }
        if(estado <= 0){
            alert("Preencha o campo estado")
            return
        }else{
            alert("Nome: " + nome + "\nIdade: " + idade + "\nCidade: " + cidade + "\nEstado: " + estado)
        }
        
    }

    return(
        <div>
            <h1>Pagina de formulário</h1>
            <p>Aprendendo a usar o input no React</p>

            <p>Digite seu nome: </p>
            <input onChange={ e => alteraNome(e.target.value)}/>
            <br/><br/>

            <p>Digite sua idade: </p>
            <input onChange={ e => alteraIdade(e.target.value)}/>
            <br/><br/>

            <p>Digite onde mora: </p>
            <input onChange={ e => alteraCidade(e.target.value)}/>
            <input onChange={ e => alteraEstado(e.target.value)}/>
            <br/><br/>
            <button onClick={salvar}>Salvar</button>
        </div>
    )

}

export default Formulario