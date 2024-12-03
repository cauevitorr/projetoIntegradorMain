import jwt from "jsonwebtoken";

const createColaboradorToken = (colaborador, request, response) => {
  const token = jwt.sign(
    {
      id: colaborador.id,
      nome: colaborador.nome,
      email: colaborador.email
    },
    "SENHASUPERSEGURA",
    {
      expiresIn: "14h",
    }
  );

  response.status(200).json({
    message: "Você está autenticado",
    token: token,
    colaboradorId: colaborador.id,
  });
};

export default createColaboradorToken;