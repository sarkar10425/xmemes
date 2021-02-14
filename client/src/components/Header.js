import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import backendUrl from '../config'
import M from 'materialize-css'

function Header() {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [caption, setCaption] = useState("")

  const postMeme = async (e) => {
    e.preventDefault();
    const URL = `${backendUrl}/memes`;
    try{
      const res = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            url: url,
            caption: caption,
          }),
        })
      const data = await res.json()
      if(data.error){
        M.toast({html: data.error, classes: "#c62828 red darken-3"})
      }
      if(data.success){
        M.toast({html: data.success, classes: "#388e3c green darken-2"})
      }
      setName("")
      setUrl("")
      setCaption("")
      console.log(data)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className="header">
      <Form className="header-form" style={{ width: "40%" }}>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Meme Creator Name" className="form-input" style={{color: "white"}} />
        <br />
        <Form.Control type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Meme Image URL" className="form-input" style={{color: "white"}} />
        <br />
        <Form.Control type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Meme Caption" className="form-input" style={{color: "white"}} />
        <br />
        <div className="submit-btn">
          <Button
            variant="primary"
            type="submit"
            style={{height: "auto", width: "auto"}}
            onClick={(e) => postMeme(e)}
          >
            Create Meme
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Header;
