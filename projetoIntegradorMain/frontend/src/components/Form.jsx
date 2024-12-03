
import React from "react";
import { Form,  TextArea, Button } from "../style/CardStyles"; 

const InfoForm = () => {
  const [comentario, setComentario] = React.useState(""); 

  const handleCommentChange = (e) => {
    setComentario(e.target.value);
  };

  const handleSaveComment = () => {
    
    alert("Comentário salvo: " + comentario);
  };

  return (
    <Form>
      
      <h2>Nome Completo</h2>
      <p>Curso: Engenharia de Software</p>
      <p>Status: Ativo</p>
      <p>Data de Início: 01/01/2023</p>
      <p>Data de Conclusão: 31/12/2024</p>

     
      <label>Comentários:</label>
      <TextArea
        value={comentario}
        onChange={handleCommentChange}
        placeholder="Digite seu comentário aqui"
      />
      <Button onClick={handleSaveComment}>Salvar Comentário</Button>
    </Form>
  );
};

export default InfoForm;
