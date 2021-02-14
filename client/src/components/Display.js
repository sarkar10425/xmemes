import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { Card, Button, Form } from "react-bootstrap";
import backendUrl from "../config";
import M from "materialize-css";

function Display() {
  const [memes, setMemes] = useState([]);
  const [newUrl, setNewurl] = useState("");
  const [newCaption, setNewcaption] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const getAllMemes = async () => {
    try {
      const res = await fetch(`${backendUrl}/memes`);
      const data = await res.json();
      console.log(data)
      setMemes([...data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const displayBlock = (visible) => {
    setNewurl("");
    setNewcaption("");
    if (visible) {
      document.getElementById("update-meme").style.display = "block";
    } else {
      document.getElementById("update-meme").style.display = "none";
    }
  };

  const DeleteMeme = async (id) => {
    const URL = `${backendUrl}/memes/${id}`;
    try {
      const data = await (
        await fetch(URL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (data.error) {
        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
      }
      if (data.success) {
        M.toast({ html: data.success, classes: "#388e3c green darken-2" });
      }
      getAllMemes();
    } catch (err) {
      console.log(err);
    }
  };

  const EditMeme = async (e) => {
    e.preventDefault();
    const URL = `${backendUrl}/memes/${id}`;
    try {
      const data = await (
        await fetch(URL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: newUrl,
            caption: newCaption,
          }),
        })
      ).json();
      if (data.error) {
        M.toast({ html: data.error, classes: "#c62828 red darken-3" });
      }
      if (data.success) {
        M.toast({ html: data.success, classes: "#388e3c green darken-2" });
      }
      displayBlock(false);
      getAllMemes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMemes();
  }, [1]);

  return (
    <div className="display">
      {memes.length > 0 ? (
        <>
          {memes
            .slice()
            .reverse()
            .map((meme) => (
              <div>
                
                  <Card
                    className="meme-card"
                    style={{
                      width: "25em",
                      height: "42em",
                      maxWidth: "25em",
                      minWidth: "auto",
                      padding: "10px",
                    }}
                    key={meme._id}
                  >
                    <Card.Title
                      style={{
                        color: "black",
                        fontFamily: "Serif",
                        fontSize: "20px",
                        textAlign: "center"
                      }}
                    >
                      Posted by: {meme.name.toUpperCase()}
                    </Card.Title>
                    <hr />
                    <div className="container" style={{ textDecoration: "none", overflow: "hidden", borderRadius: "5px", height: "75%", width: "100%" }}>
                      <Link
                    to={`/memes/${meme._id}`}
                  >
                      <Card.Img
                        className="card-image"
                        variant="top"
                        src={meme.url}
                        height="100%"
                        width="100%"
                        style={{border: "10px solid black"}}
                        title="Click to view meme"
                      />
                      <div className="middle">
                        <div className="text">VIEW MEME</div>
                      </div>
                      </Link>
                    </div>
                    
                    <Card.Body
                      style={{
                        height: "35%",
                        overflowY: "auto",
                        padding: "15px",
                        margin: "15px",
                      }}
                    >
                      <Card.Text style={{ color: "gray", fontSize: "12px", backgroundColor: "#F5F5F5", borderRadius: "2px"}}>
                        <b>
                          <h5 style={{ color: "black" }}>Caption:</h5>
                        </b>
                        {meme.caption}
                      </Card.Text>
                    </Card.Body>
                    <div
                      className="meme-btn"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="info"
                        onClick={(e) => {
                          displayBlock(true);
                          setId(meme._id);
                          setName(meme.name);
                        }}
                      >
                        Edit Meme
                      </Button>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          DeleteMeme(meme._id);
                        }}
                      >
                        Delete Meme
                      </Button>
                    </div>
                  </Card>
                

                <div
                  id="update-meme"
                  className="meme-edit"
                  style={{
                    display: "none",
                    margin: "0px 18px",
                    overflow: "auto",
                    position: "fixed",
                    top: "10em",
                    left: "10px",
                    height: "60%",
                    width: "86%",
                    zIndex: "999",
                    backgroundColor: "#D0D0D0",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    className="meme-edit-header"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "40px",
                    }}
                  >
                    <h3>Edit Meme</h3>
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        displayBlock(false);
                      }}
                    >
                      x
                    </span>
                  </div>
                  <div className="meme-edit-form" style={{ padding: "20px" }}>
                    <Form.Label style={{ fontWeight: "500" }}>
                      Meme creator name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontWeight: "700" }}
                      value={name}
                      readOnly
                      className="form-input"
                    />
                    <br />
                    <Form.Label style={{ fontWeight: "500" }}>
                      New meme url:{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewurl(e.target.value)}
                      placeholder="New Meme Url"
                      className="form-input"
                    />
                    <br />
                    <Form.Label style={{ fontWeight: "500" }}>
                      New meme caption:{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={newCaption}
                      onChange={(e) => setNewcaption(e.target.value)}
                      placeholder="New Meme Caption"
                      className="form-input"
                    />
                    <br />
                    <div
                      className="edit-meme-btn"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => EditMeme(e)}
                        style={{
                          margin: "20px",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                      >
                        Update Changes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <div style={{ color: "white", fontWeight: "600", fontSize: "30px" }}>
          Getting your memes ready ...
        </div>
      )}
    </div>
  );
}

export default Display;
