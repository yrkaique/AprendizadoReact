import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css"

function Empresas() {

    const [empresas, setEmpresas] = useState([])
    const [showEmpresas, setShowEmpresas] = useState(true)
    /*----------------------------------------------*/
    const [funcionarios, setFuncionarios] = useState([])
    const [showFuncionarios, setShowFuncionarios] = useState(false)
    /*----------------------------------------------*/
    const [showModal, setShowModal] = useState(false)
    /*----------------------------------------------*/
    const [idEmpresa, setIdEmpresa] = useState("")
    const [nome, setNome] = useState("")
    const [contato, setContato] = useState("")
    const [cargo, setCargo] = useState("1")

    async function searchAllEmpresas() {
        const { error, data } = await supabase.from("empresas").select()

        console.log(data)
        setEmpresas(data)
    }

    async function searchAllFuncionarios() {
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)")

        console.log(data)
        setFuncionarios(data)
    }

    async function searchFuncionariosEmpresa(id_empresa){
        const { error, data } = await supabase.from("funcionarios").select("*, empresas(*)").eq("id_empresa", id_empresa)

        console.log(data)
        setFuncionarios(data)

        setIdEmpresa(id_empresa)
    }

    function setView(){
        if(showEmpresas == true){
            setShowEmpresas(false)
            setShowFuncionarios(true)
        }else{
            setShowEmpresas(true)
            setShowFuncionarios(false)
        }
    }

    async function insertFuncionario(){
        const obj ={
            id_empresa: parseInt(idEmpresa),
            nome: nome,
            contato: contato,
            cargo: parseInt(cargo)
        }

        const { error } = await supabase.from("funcionarios").insert(obj)
        if (error == null){
            alert ("Funcionário cadastrado")
            setShowModal(false)
            searchFuncionariosEmpresa(idEmpresa)
        }else{
            alert ("Erro ao cadastrar funcionário. Entre em contato com o suporte técnico")
            console.log(error)
        }
    }

    useEffect(() => {
        searchAllEmpresas()
        searchAllFuncionarios()
    }, [])

    return (
        <div>

            {
                showModal == true ?
                <div>
                    <div onClick={()=> setShowModal(false)} className="fundoPreto"></div>
                    
                    <div className="modal">
                        <h2>Novo funcionário</h2>
                        <input onChange={(e)=> setNome(e.target.value)} placeholder="Nome"/>
                        <br/>
                        <input onChange={(e)=> setContato(e.target.value)} placeholder="Contato"/>
                        <br/>
                        <select onChange={(e)=> setCargo(e.target.value)}>
                            <option value="1">Funcionário comum</option>
                            <option value="0">Administrador</option>
                        </select>
                        <br/><br/>
                        <button onClick={insertFuncionario}>Salvar</button>
                    </div>
                </div>
                :
                <></>
            }

            <h1>Relacionamento de Tabelas</h1>
            <p>Consulte na tabela empresas e funcionários </p>

            {
                showEmpresas == true ?
                    <div>
                        <h2>Empresas</h2>
                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>CNPJ</td>
                                <td>Endereço</td>
                                <td>Ações</td>
                            </tr>
                            {
                                empresas.map(i =>
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.cnpj}</td>
                                        <td>{i.endereco}</td>
                                        <td><button onClick={()=> {searchFuncionariosEmpresa(i.id); setView()}}>Ver funcionários</button></td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    :
                    <></>
            }

            {
                showFuncionarios == true ?
                    <div>
                        <h2>Funcionários</h2>
                        <button onClick={()=> setShowModal(true)}>Cadastrar</button>
                        <br/><br/>
                        <button onClick={()=> {setView(); setIdEmpresa()}}>Voltar</button>

                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Nome</td>
                                <td>Nome da Empresa</td>
                                <td>Endereço da Empresa</td>
                                <td>Cargo</td>
                                <td>Contato</td>
                            </tr>
                            {
                                funcionarios.map(i =>
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.empresas.nome}</td>
                                        <td>{i.empresas.endereco}</td>
                                        <td>{i.cargo == 0 ?
                                            "Administrador"
                                            :
                                            "Funcionário comum"
                                        }</td>
                                        <td>{i.contato}</td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                    :
                        <></>
            }
        </div>
    );
}

export default Empresas;