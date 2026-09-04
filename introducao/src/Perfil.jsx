import { useState } from "react"

function Perfil() {

    let [estaExibindoPerfil, alteraestaExibindoPerfil] = useState(false)

    let usuario = {
        nome: "Kaique",
        email: "kaiquebjesus22@gmail.com"
    }
    
    let [exibirSenha, alteraExibirSenha] = useState(false)

    let senha = "123123"
    

    return(
        <div>
            <h1>Perfil de usuario</h1>
            <p>Veja aqui suas informações do perfil</p>
            <button onClick={() => alteraestaExibindoPerfil(!estaExibindoPerfil)}></button>

            {
                estaExibindoPerfil == true ? 
                    <div>
                        <p>nome: {usuario.nome}</p>
                        <p>email: {usuario.email}</p>
                        <button>Alterar senha</button>
                    </div>
                     
                : 
                    <p>Não está mostrando...</p>
            }

            <h1>alterar senha</h1>
            
            {
                exibirSenha == true ?
                    <div>

                        <p>Digite sua senha atual:</p>
                        <input onChange={ e => alteraNome(e.target.value)}/>
                        <p>Insira sua nova senha:</p>
                        <input type="password" placeholder="Nova senha" />
                        <button>Alterar</button>  
                    </div>
                :
                    <p>Não está mostrando...</p>
            }

        </div>
    )

}

export default Perfil