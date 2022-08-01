import React from 'react'
import Card from "./Card";
import { useState , useEffect , useRef } from "react";
import axios from "axios";

//we will use deck api for this project : it lets us to shuffle, reshuffle the cards,
//a brand new deck,
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]); //this is an array of cards
    const [autoDraw , setAutoDraw] = useState(false); //this will be used to start/stop the auto 
    const timerRef = useRef(null);

    //use the api to get a deck of cards
useEffect(() => {
    async function getData(){
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        setDeck(deck.data);
    }
    getData();//this will get a new deck of cards
}, [setDeck]); //this will get a new deck of cards every time the component is rendered



  return (
    <div>Deck</div>
  )
}

export default Deck