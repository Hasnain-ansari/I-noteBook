import React, { useEffect }from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";


 

export const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('auth-token');
    navigate('/login');
  }
  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          
          
          
          <button
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} aria-current="page" to="/about">
              About
            </Link>
            </ul>
          </div>

            {!localStorage.getItem('auth-token')?<form className="d-flex">         
              <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
            </form>: <button onClick={handleLogout} className="btn btn-primary">logout</button>}
        </div>
      </nav>
    
  );
};
