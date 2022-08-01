import React from "react";
import { useState } from "react";
import "./Card.css";

//function placeACard(card) {
 // return <div className="card">{card}</div>;
//}

function Card({name, image}){
    const [{angle, xPosition,yPosition}] = useState({ //useState returns an array with the state and a function to update it
        angle:Math.random()*90-45,      //iniitial state of the card will be on a random angle
        xPosition: Math.random()*40-20, //initial state of the card will be on a random position on the x axis
        yPosition: Math.random()*40-20  //initial state of the card will be on a random position on the y axis
    });
    //translate is a Css function repositions an element in the horizantal and vertical directions. 
    //translate(x position of the item , y posiiton of the item) we can also add rotate to say how much we want card to rotate
    //translate(xPosition, yPosition rotate(angle in degrees))
    const transform = `translate(${xPosition}px, ${yPosition}px) rotate(${angle}deg)`; 
    
    return(
        <img className = "Card"
             src={image}
             alt={name}
             style={{transform}}
        />
    );
}

export default Card;

