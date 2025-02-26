import React from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { logout } from '../../services/authService';

class Navbar extends React.Component {
  isActive = (path) => {
    return this.props.location.pathname === path ? "active" : "";
  };

  handleLogout = () => {
    logout();
    this.props.navigate("/login");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            Product Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive("/dashboard")}`} to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${this.isActive("/products")}`} to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  My account 
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/change-password">
                      Change password
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    
                    <button className="dropdown-item" onClick={this.handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <span className="nav-link disabled" aria-disabled="true">
                  Disabled
                </span>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

// ✅ Wrap component with `withRouter` to get `location`

const NavbarWithRouter = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} location={location} />;
};

export default NavbarWithRouter;
