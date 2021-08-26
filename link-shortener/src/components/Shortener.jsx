import React, { useState } from "react";

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
    
        fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer b5ab099671e040039de3c073fdab0ef3e57a3332`
                },
                body: JSON.stringify({long_url: link})
            }).then(response => response.json())
            .then(data => setNewLink(data.link));
    
            setLink(link);
    }

    return(
        <div className="container">
            <p>Paste the link you want to shorten</p>
            <input placeholder="Your link" name="inputLink" onChange={handleChange} value={link}></input>
            <button onClick={handleClick}>shorten</button>
            <input placeholder="Shortened link" name="outputLink" disabled value={newLink}></input>
        </div>

    );
}

export default Shortener;