// App.js
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FaHome, FaUserFriends, FaBell, FaSearch, FaEllipsisH } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { TbMessageCircleFilled } from "react-icons/tb";
import './TopBar.css';
import UserMenu from '../UserMenu/UserMenu.jsx';

function App() {
  const [activeIcon, setActiveIcon] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleIconClick = (iconName) => {
    setActiveIcon(iconName);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar">
      {/* Left Section */}
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <FaFacebook className="icon facebook-icon me-2" />
        Facebook
      </Navbar.Brand>

      {/* Center Section */}
      <Nav className="mx-auto">
        <Nav.Link onClick={() => handleIconClick('home')} className={activeIcon === 'home' ? 'active' : ''}>
          <GoHome className="icon" />
        </Nav.Link>
        <Nav.Link onClick={() => handleIconClick('friends')} className={activeIcon === 'friends' ? 'active' : ''}>
          <FaUserFriends className="icon" />
        </Nav.Link>
      </Nav>

      {/* Right Section */}
      <Form className="d-flex me-auto navbar__search">
        <InputGroup>
          <InputGroup.Text>
            <FaSearch className="icon" />
          </InputGroup.Text>
          <FormControl type="text" placeholder="Tìm kiếm trên Facebook" />
        </InputGroup>
      </Form>

      <Nav className="ms-auto d-flex align-items-center">
        <Nav.Link>
          <FaBell className="icon" />
        </Nav.Link>
        <Nav.Link>
          <TbMessageCircleFilled className="icon" />
        </Nav.Link>
        <Nav.Link onClick={toggleUserMenu}>
          <FaEllipsisH className="icon" />
        </Nav.Link>
      </Nav>

      {showUserMenu && <UserMenu />}
    </Navbar>
  );
}

export default App;
