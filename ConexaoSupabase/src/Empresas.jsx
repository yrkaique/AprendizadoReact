import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./Empresas.css"

function Empresas() {

    const [empresas, alteraEmpresas] = useState([])
    const [funcionarios, alteraFuncionarios] = useState([])

    const [exibeEmpresas, alteraExibeEmpresas] = useState(true)
    const [exibeFuncionarios, alteraExibeFuncionarios] = useState(false)
    const [exibeModal, alteraExibeModal] = useState(false)


    async function buscaTodasEmpresas() {
        const { error, data } = await supabase.from("empresas").select()
        console.log(data)
        alteraEmpresas(data)
    }

    async function buscaTodosFuncionarios() {
        const { error, data } = await supabase.from("funcionarios").select(' *, empresas(nome, endereco)')
        console.log(data)
        alteraFuncionarios(data)
    }

    async function buscaFuncionariosPorEmpresa(id_empresa) {
        const { error, data } = await supabase.from("funcionarios").select(' *, empresas(nome, endereco)').eq('id_empresa', id_empresa)
        console.log(data)
        alteraFuncionarios(data)
        alternaVisualizacao()
    }

    function alternaVisualizacao() {

        if (exibeEmpresas == true) {
            alteraExibeEmpresas(false)
            alteraExibeFuncionarios(true)
        } else {
            alteraExibeEmpresas(true)
            alteraExibeFuncionarios(false)
        }
    }

    useEffect(() => {
        buscaTodasEmpresas()
        buscaTodosFuncionarios()
    }, [])

    return (
        <div>

            {
                exibeModal == true ?
                    <div>
                        <div onClick={() => alteraExibeModal(false)} className="fundoPreto" ></div>
                        <div className="modal">
                            <h2>Novo Funcionario</h2>
                            <input placeholder="Nome..." />
                            <br />
                            <input placeholder="Contato..." />
                            <br />
                            <select>
                                <option value="1" >Funcionario comum</option>
                                <option value="0" >Administrador</option>
                            </select>
                            <br />
                            <button>Salvar</button>
                        </div>
                    </div>
                    :
                    <></>
            }

            <h1>Empresas</h1>
            <p>Consulta na tabela empresas e funcionários</p>

            {
                exibeEmpresas == true ?

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
                                        <td> <button onClick={() => buscaFuncionariosPorEmpresa(i.id)}>Ver Funcionarios</button> </td>
                                    </tr>
                                )
                            }

                        </table>
                    </div>
                    :
                    <></>
            }

            {
                exibeFuncionarios == true ?

                    <div>
                        <h2>Funcionarios</h2>

                        <button onClick={alternaVisualizacao}>Voltar</button>
                        <br /><br />
                        <button onClick={() => alteraExibeModal(true)}>Adicionar novo</button>
                        <br /><br />
                        <table border="true">
                            <tr>
                                <td>ID</td>
                                <td>Endereço da Empresa</td>
                                <td>Nome da Empresa</td>
                                <td>Nome</td>
                                <td>Cargo</td>
                                <td>Contato</td>
                            </tr>
                            {
                                funcionarios.map(i =>
                                    <tr>
                                        <td>{i.id}</td>
                                        <td>{i.empresas.endereco}</td>
                                        <td>{i.empresas.nome}</td>
                                        <td>{i.nome}</td>
                                        <td>{i.cargo == 0 ? "Administrador" : "Funcionario comum"}</td>
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