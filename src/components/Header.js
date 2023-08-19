import React from "react";
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar, NavItem} from "react-bootstrap";

const Header = () => {
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Nav className="navbar-brand">
                    <div className="border rounded">
                        <Nav.Link className="text-white text-decoration-none">
                            XYZ Engine
                        </Nav.Link>
                    </div>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <NavItem> <NavLink to="/" className="text-white text-decoration-none p-4"> Add Project </NavLink> </NavItem>
                        <NavItem> <NavLink to="/projectList" className="text-white text-decoration-none p-4">Project List</NavLink> </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;