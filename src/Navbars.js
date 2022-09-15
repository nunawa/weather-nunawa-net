import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export const Navbars = () => {
  return (
    <Navbar bg='light'>
        <Container>
            <Navbar.Brand>
                <Link to={"/"} style={{color: 'inherit', textDecoration: 'inherit'}}>全国の暑さ指数一覧</Link>
            </Navbar.Brand>
            <Nav.Link className='justify-content-end'>
                <Link to={"/about"} style={{color: 'inherit', textDecoration: 'inherit'}}>About</Link>
            </Nav.Link>
        </Container>
    </Navbar>
  )
};