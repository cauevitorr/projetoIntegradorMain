import axios from 'axios'
import React from 'react'
import Edit from "./Edit.jsx"
import { Th } from '../style/Body.js';
import { Table, Button } from 'react-bootstrap'

const List = ({ funcionarios, setFuncionarios }) => {

  const [show, setShow] = React.useState(false)
  const [ondEdit, setOnEdit] = React.useState(null)

  const handleEdit = (funcionario) => {
    setOnEdit(funcionario)
    setShow(true)
  }

  const handleSubmitEdit = async (editedFuncionario) => {
    try {
      await axios.put(`http://localhost:3333/api/${editedFuncionario.id}`, editedFuncionario)
      setFuncionarios((prevFuncionarios) => prevFuncionarios.map((funcionario) => (funcionario.is === editedFuncionario.id ? editedFuncionario : funcionario)))
      setShow(false)
    } catch (error) {
      console.error(error)
    }
  }

     const handleDelete = async (id) => {
       try {
         await axios.delete(`http://localhost:3333/api/${id}`)
         setFuncionarios(funcionarios.filter((funcionario) => funcionario.id !== id))
       } catch(error) {
         console.log(error)
       }
     }

  return (
    <>
      <Table style={{ marginLeft: "100px", marginTop: "30px" }} striped bordered hover>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Função</Th>
            <Th>Treinamento</Th>
            <Th>Status</Th>
            <Th>Data Inicio</Th>
            <Th>Data Conclusão</Th>
          </tr>
        </thead>
        {funcionarios.map((funcionario, index) => (
          <tbody key={index}>
            <tr>
              <td>{funcionario.nome}</td>
              <td >{funcionario.funcao}</td>
              <td>{funcionario.treinamento}</td>
              <td>{funcionario.status_treinamento}</td>
              <td>{funcionario.data_inicio}</td>
              <td>{funcionario.data_conclusao}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(funcionario)}>Editar</Button>
                 <Button style={{marginLeft: "10px"}} variant="danger" onClick={()=> handleDelete(funcionario.id)}>Deletar</Button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table >
      <Edit show={show} handleClose={() => setShow(false)} funcionario={ondEdit} />
    </>
  );
}

export default List;