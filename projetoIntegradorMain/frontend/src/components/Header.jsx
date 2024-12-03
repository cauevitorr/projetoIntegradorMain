// import React from "react";
import { ContainerBusca, ContainerNav, Nav, Span, ParteHeader, ALogin, ButtonLogin } from "../style/Header.js";
import { Link } from 'react-router-dom'



const Header = () => {
    return (
        <>
            <Nav>
                <ContainerNav>
                    <Link className="link" to="/">HOME</Link>
                    <Span>|</Span>
                    <Link className="link" to="/paginaColaborador">PÁGINA DO COLABORADOR</Link>
                    <Span>|</Span>
                    <Link className="link" to="/relatorioDeBusca">RELATÓRIO DE BUSCA</Link>
                </ContainerNav>
                <ALogin>
                    <ButtonLogin>Login</ButtonLogin>
                </ALogin>
            </Nav>
            <ParteHeader />
        </>
    )
}

export default Header;