import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu Icon
import { IconButton } from '@mui/material'; // Use IconButton to make it clickable
import { push as Menu } from 'react-burger-menu'; // Use the 'push' effect for the menu
import './BurgerMenu.css'; // Add some styles for the menu
import ContactPopup from './ContactPopup'; // Import the contact popup component
import AboutPopup from './AboutPopup'; // Import the AboutPopup

const BurgerMenu = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu open/close
  const [isContactOpen, setIsContactOpen] = useState(false); // State for controlling the contact popup
  const [isAboutOpen, setIsAboutOpen] = useState(false); // State for About popup

  // Generate an avatar URL using DiceBear's Dylan style, always using this avatar system
  const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${user?.displayName || 'random'}`;

  // Simple function to refresh the page
  const handleLogout = () => {
    window.location.reload();
  };

  const openContactPopup = () => {
    setIsContactOpen(true);
  };

  const closeContactPopup = () => {
    setIsContactOpen(false);
  };

  const handleAboutClick = () => {
    setIsAboutOpen(true);
  };

  const handleAboutClose = () => {
    setIsAboutOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Burger Icon Button */}
      <IconButton
        aria-label="menu"
        onClick={handleMenuToggle}
        style={{
          backgroundColor: '#fab613',
          borderRadius: '50%',
          color: 'white',
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)} // Keep track of menu state
      >
        {/* User Profile Section */}
        <div className="user-profile">
          <img
            src={avatarUrl}  // Always use DiceBear avatar
            alt={user?.displayName || "User"}
            className="user-avatar"
          />
          <div className="user-info">
            <p className="pub-goer-title">Hey Pub Goer!</p>
            <p className="user-name">{user?.displayName || "Anonymous"}</p>
          </div>
        </div>

        {/* Menu Items */}
        <a className="menu-item" onClick={handleAboutClick}>
          About
        </a>

        <a className="menu-item" onClick={openContactPopup}>
          Contact
        </a>

        <a
          className="menu-item"
          href="https://www.paypal.com/donate/?business=B7LSD6DW66AAQ&no_recurring=0&currency_code=GBP"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy us a Beer 🍺
        </a>

        <a
          className="menu-item"
          href="/terms-and-conditions"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>

        <a
          className="menu-item"
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>

        <div className="menu-footer">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </Menu>

      {/* Contact Popup */}
      {isContactOpen && <ContactPopup onClose={closeContactPopup} />}

      {/* About Popup */}
      {isAboutOpen && <AboutPopup onClose={handleAboutClose} />}
    </>
  );
};

export default BurgerMenu;