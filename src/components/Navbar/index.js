import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle={{ color:'black' }}>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle={{ color:'black' }}>
                        About
                    </NavLink>
                    <NavLink to="/contact" activeStyle={{ color:'black' }}>
                        Contact Us
                    </NavLink>
                    <NavLink to="/plants" activeStyle={{ color:'black' }}>
                        Plants
                    </NavLink>
                    <NavLink to="/login" activeStyle={{ color:'black' }}>
                        Login / Register
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;