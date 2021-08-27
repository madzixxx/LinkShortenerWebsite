import React, { useState } from "react";
require('dotenv').config()

var validUrl = require('valid-url');

function Shortener(){

    //const key = 'b5ab099671e040039de3c073fdab0ef3e57a3332';

    const [link, setLink]=useState("");
    const [newLink, setNewLink]=useState("");

    function handleChange(event){
        setLink(event.target.value);
    }

    function handleClick(event){
        
        const inputLink=event.target.value;
        setLink(inputLink);

        if (validUrl.isUri(link)){
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.KEY}`
                },
                body: JSON.stringify({long_url: link})
            }).then(response => response.json())
            .then(data => setNewLink(data.link));
            setLink(link);
        } else {
            setLink(link);
            setNewLink("Imput is not an URL");
        }
    }

    function copyToClipboard(){
        var copyText = document.getElementById("newURL");

        /* Select the text field */
        copyText.select();

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);
    }

    return(
        <div className="container">
            <p>Paste the link you want to shorten</p>
            <input placeholder="Your link" name="inputLink" onChange={handleChange} value={link}></input>
            <button onClick={handleClick}>Shorten</button>
            <input placeholder="Shortened link" name="outputLink" id="newURL" disabled value={newLink}></input>
            <button id="copy" onClick={copyToClipboard}>Copy</button>
        </div>

    );
}

export default Shortener;