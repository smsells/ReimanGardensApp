import { stack as Menu } from "react-burger-menu";
import { Routes, Route, Link } from "react-router-dom";

export default function AppMenu() {
  return (
    <Menu
      disableAutoFocus
      right
      // style={menuStyle}
      style={{ color: organization.menuColor }}
      isOpen={isMenuOpen}
      onStateChange={handleStateChange}
    >
      <Link
        className="menu-link"
        style={{ color: organization.menuColor }}
        to={"/"}
        onClick={() => handleCloseMenu()}
      >
        Home
      </Link>
      <Link
        className="menu-link"
        to={"/notes"}
        onClick={() => handleCloseMenu()}
      >
        NoteList
      </Link>
      <Link
        className="menu-link"
        to={"/stats"}
        onClick={() => handleCloseMenu()}
      >
        Stats
      </Link>
      <Link
        className="menu-link"
        to={"/gallery"}
        onClick={() => handleCloseMenu()}
      >
        Gallery
      </Link>
      <Link
        className="menu-link"
        to={"/parks"}
        onClick={() => handleCloseMenu()}
      >
        Parks Around the World
      </Link>

      <Link
        className="menu-link"
        to="/signin"
        onClick={() => handleCloseMenu()}
      >
        {loggedIn ? "Admin Panel" : "Sign In"}
      </Link>
      {loggedIn ? (
        <Link
          className="menu-link"
          onClick={() => {
            signOut();
            handleCloseMenu();
          }}
        >
          Sign out
        </Link>
      ) : (
        ""
      )}
    </Menu>
  );
}
