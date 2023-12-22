import { useState } from "react";
import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

const MyNavbar = ({ showSearchResult }) => {
  const [searchString, setSearchString] = useState("");
  const location = useLocation();

  const searchStringHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      showSearchResult(searchString.trim());
    } else {
        setSearchString(e.currentTarget.value);
    }
  };

  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "black" }}>
      <Link to="/">
        <Navbar.Brand>
          <img
            src="data/logo.png"
            alt="NetflixLogo"
          />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="http://localhost:3002">
            <div
              className={
                "nav-link font-weight-bold" +
                (location.pathname === "/" ? " active" : "")
              }
            >
              Home
            </div>
          </Link>
          <Link to="/">
            <div
              className={
                "nav-link font-weight-bold" +
                (location.pathname === "/tv-shows" ? " active" : "")
              }
            >
              TV Shows
            </div>
          </Link>
        </Nav>
        <span className="d-flex align-items-center">
          <InputGroup className="icons">
            <FormControl
              placeholder="Search and press enter"
              aria-label="search"
              aria-describedby="basic-addon1"
              onKeyDown={searchStringHandler}
              onChange={searchStringHandler}
              value={searchString}
            />
          </InputGroup>
        </span>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
