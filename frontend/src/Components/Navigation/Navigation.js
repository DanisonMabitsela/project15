import React from "react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/menuItems";
import { signout, adminIcon } from "../../utils/Icons";
import "./Navigation.css";

function Navigation({ active, setActive, setSignedIn }) {
  const history = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    setActive(2);
    history("/login");
  };

  const handleAdminClick = () => {
    setActive(5); // Set the active tab to the admin component
  };

  return (
    <nav className="nav-styled">
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
        {/* Admin button */}
        <li
          onClick={handleAdminClick}
          className={active === 5 ? "active" : ""}
        ></li>
      </ul>
      <div className="bottom-nav">
        {/* Sign out button */}
        <li onClick={handleSignOut}>{signout} Sign Out</li>
      </div>
    </nav>
  );
}

export default Navigation;
