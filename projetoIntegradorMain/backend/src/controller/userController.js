import connection from "../config/conn.js";
import bcrypt from "bcryptjs";


export const createUser = (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ message: "Por favor, preencha todos os campos." });
  }

  const query = "SELECT * FROM usuarios WHERE cpf = ?";
  connection.query(query, [cpf], (err, results) => {
    if (err) {
      console.error("Erro ao verificar usuário:", err);
      return res.status(500).json({ message: "Erro ao verificar usuário no banco." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Usuário já existe." });
    }

    
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erro ao criptografar senha:", err);
        return res.status(500).json({ message: "Erro ao criptografar senha." });
      }

     
      const insertQuery = "INSERT INTO usuarios (cpf, senha) VALUES (?, ?)";
      connection.query(insertQuery, [cpf, hashedPassword], (err, results) => {
        if (err) {
          console.error("Erro ao inserir usuário no banco:", err);
          return res.status(500).json({ message: "Erro ao salvar usuário no banco." });
        }

        res.status(201).json({ message: "Usuário criado com sucesso!" });
      });
    });
  });
};


export const loginUser = (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({ message: "Por favor, preencha todos os campos." });
  }

  const query = "SELECT * FROM usuarios WHERE cpf = ?";
  connection.query(query, [cpf], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ message: "Erro ao buscar usuário no banco." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const user = results[0];

   
    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        console.error("Erro ao verificar senha:", err);
        return res.status(500).json({ message: "Erro interno ao verificar senha." });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      
      res.status(200).json({ message: "Login efetuado com sucesso!", user });
    });
  });
};
