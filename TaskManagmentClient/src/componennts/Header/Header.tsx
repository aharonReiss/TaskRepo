import React, { useState } from 'react';
import styled from 'styled-components';
import TaskAppStorage from '../../utils/TaskAppStorage';
import { observer } from 'mobx-react';
import { taskStore } from '../../stores/TaskStore';


interface NavProps {
    isOpen: boolean;
  }

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: blueviolet;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Nav = styled.nav<NavProps>`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: blueviolet;
    padding: 1rem;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const LoginButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = observer(() => {
    const logOut = () => {
        TaskAppStorage.deleteToken();
        window.location.reload()
    }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    {taskStore.showHeader && <HeaderContainer>
      <Logo>Tasks Managment</Logo>
      <MenuButton onClick={toggleMenu}>☰</MenuButton>
      <Nav isOpen={isMenuOpen}>
        <NavLink href="/manage-task">Add Task</NavLink>
        <LoginButton onClick={logOut}>Logout</LoginButton>
      </Nav>
    </HeaderContainer>}
    
    </>
  );
});

export default Header;