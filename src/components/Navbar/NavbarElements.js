import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled, { css } from "styled-components";
 
export const Nav = styled.nav`
  background: #ffb3ff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
`;
 
export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
 
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
 
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  ${(props) =>
    props.showMenu &&
    css`
      display: flex;
      flex-direction: column;
      background: #f2f2f2;
      position: absolute;
      top: 85px;
      right: 0;
      left: 0;
      padding: 1rem;
    `}
  // white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;