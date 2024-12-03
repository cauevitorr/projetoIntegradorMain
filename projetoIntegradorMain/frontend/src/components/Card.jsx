// import React from "react";
import { Card, ProfileImage, ProfileInfo } from "../styles/CardStyles";

const InfoCard = () => {
  return (
    <Card>
      <ProfileImage
        src="https://via.placeholder.com/120"
        alt="Foto do Colaborador"
      />
      <ProfileInfo>
        <h2>Nome Completo</h2>
        <p>Contato: (XX) XXXXX-XXXX</p>
        <p>E-mail: colaborador@email.com</p>
      </ProfileInfo>
    </Card>
  );
};

export default InfoCard;