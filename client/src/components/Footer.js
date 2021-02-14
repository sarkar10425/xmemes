import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <div
      className="footer"
      style={{
        backgroundColor: "#66bd88",
        height: "200px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "cebter",
        padding: "50px",
        position: "relative",
        bottom: "0px",
      }}
    >
      <div className="footer-details">
        <div style={{ textDecoration: "underline", fontFamily: "system-ui" }}>
          <b>
            <h4>DEVELOPED BY: </h4>
          </b>
        </div>
        <div>
          <b>
            <h5>Arindam Sarkar</h5>
          </b>
        </div>
        <div
          className="footer-social"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
          }}
        >
          <a href="https://github.com/sarkar10425" target="_blank">
            <GitHubIcon style={{ color: "black" }} />
          </a>
          <a href="https://www.linkedin.com/in/arindam-sarkar-227337188/" target="_blank">
            <LinkedInIcon style={{ color: "black" }} />
          </a>
        </div>
      </div>
    </div>
  );
}
