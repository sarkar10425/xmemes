import React from "react";
import {Navbar} from "react-bootstrap";

function Nav() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px"}}>
          <img
            alt=""
            src="https://www.pinclipart.com/picdir/middle/73-733173_own-creation-funny-face-logo-meme-mania-clipart.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{borderRadius: "50%"}}
          />{" "}
          Meme Stream
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Nav;
