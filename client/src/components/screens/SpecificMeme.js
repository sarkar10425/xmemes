import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendUrl from "../../config";
import { Card, Button } from "react-bootstrap";

function SpecificMeme() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const urlString = window.location.pathname.split("/");
  const id = urlString[urlString.length - 1];

  const getSpecificMeme = async () => {
    const URL = `${backendUrl}/memes/${id}`;
    try {
      const data = await (await fetch(URL)).json();
      setName(data.data[0].name);
      setUrl(data.data[0].url);
      setCaption(data.data[0].caption);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSpecificMeme();
    setTimeout(() => {
        document.getElementById("loading").style.display = "none"
        document.getElementById("specific-meme-card").style.display= "block"
    }, 1700)
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    }}>
      <div id="loading" style={{display: 'block', fontSize: "40px", color: "white"}}>Loading .....</div>
      <div id="specific-meme-card" style={{display: 'none'}}>
      <Card
        className="meme-card"
        style={{
          width: "25em",
          height: "42em",
          maxWidth: "25em",
          minWidth: "auto",
          padding: "10px",
        }}
        key={id}
      >
        <Card.Title
          style={{
            color: "black",
            fontFamily: "cursive",
            fontSize: "15px",
            textAlign: "center"
          }}
        >
          Posted by: {name.toUpperCase()}
        </Card.Title>
        <hr />
        <Card.Img
          variant="top"
          src={url}
          height="65%"
          width="100%"
          style={{
            overflow: "hidden",
            border: "10px solid black"
          }}
        />
        <Card.Body
          style={{
            height: "45%",
            overflowY: "auto",
            padding: "15px",
            margin: "15px",

          }}
        >
          <Card.Text style={{ color: "gray", fontSize: "12px" }}>
            <b>
              <h5 style={{ color: "black" }}>Caption:</h5>
            </b>
            {caption}
          </Card.Text>
        </Card.Body>
        <Link to="/">
          <div style={{textAlign: "center"}}>
            <Button variant="info">Go to Memes Gallary</Button>
          </div>
        </Link>
      </Card>
    </div>
    </div>
  );
}

export default SpecificMeme;
