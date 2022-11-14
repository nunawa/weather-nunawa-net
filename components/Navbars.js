import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

export const Navbars = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <Nav.Link as={Link} href="/" className="link-light fs-5">
          全国の暑さ指数一覧
        </Nav.Link>
        <Nav.Link
          as={Link}
          href="/about"
          className="link-light justify-content-end"
        >
          About
        </Nav.Link>
      </Container>
    </Navbar>
  );
};
