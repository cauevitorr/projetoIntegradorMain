import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, LeftPanel, RightPanel, Form, Input, Button, Link } from "../style/LoginStyles";

const LoginPage = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cpf || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login efetuado com sucesso!");
        navigate("/home"); 
      } else {
        alert(data.message || "Erro ao efetuar login.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Container>
      <LeftPanel>
        <h1>Treino Way</h1>
        <p>Ferramenta para consulta de status de treinamentos</p>
      </LeftPanel>
      <RightPanel>
        <Form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button type="submit">Entrar</Button>
          <Link href="/register">Cadastrar</Link>
        </Form>
      </RightPanel>
    </Container>
  );
};

export default LoginPage;
