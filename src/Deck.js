import React from 'react'
import Card from "./Card";
import { useState , useEffect , useRef } from "react";
import axios from "axios";
import "./Deck.css";

//we will use deck api for this project : it lets us to shuffle, reshuffle the cards,
//a brand new deck,
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

// A React Componnet maintains its own state.
// If state changes in any events (e: setHooks,useEffect())) , the component will re-render.
// If the 

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]); //this is an array of cards
    const [autoDraw , setAutoDraw] = useState(false); //this will be used to start/stop the auto 
    const timerRef = useRef(null);

    //use the api to get a deck of cards
useEffect(() => {
    console.log("useEffect1");
    async function getData(){
        let deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        setDeck(deck.data); //modifying the data --useState(null) -- it changes to show the cards.
    }
    getData();//this will get a new deck of cards
}, [setDeck]); //this will get a new deck of cards every time the component is rendered

//if the user chooses autoDrwan then draw a card automatically in every second.
//// by using useRef we can keep track of the timer
//and by using useEffect we can draw a card fri=om the api, add card to state "drawn" list
//and then remove the card from the state "deck" list
   useEffect(() => {
    console.log("useEffect2");
    async function getCard(){
        let { deck_id } = deck;

        try{
            let drawResult = await axios.get(`${API_BASE_URL}${deck_id}/draw/`);

            if(drawResult.data.remaining === 0){
                setAutoDraw(false);
                throw new Error("No more cards in the deck");
            }

            const card = drawResult.data.cards[0]; //we only want the first card
            setDrawn(d => [ ...d, 
                                 {
                                    id : card.code,
                                    name: card.suit+""+card.value,
                                    image:card.image
                                 }
                                ]);
        }catch(err){
            console.log(err);
        }
    }

    if(autoDraw && !timerRef.current){//if the timer is not running and the user wants to autoDraw
        timerRef.current = setInterval(async () => { //the timer when start 60-59-58 when the page is refreshed it start 58-57-56
            await getCard();
        } , 1000); //this will draw a card every second
    } 
    return() =>{
        clearInterval(timerRef.current); //this will clear the timer when the component is unmounted
        timerRef.current = null; //
    };
   } , [autoDraw, setAutoDraw , deck]); //

   const toggleAutoDraw = () =>{
         setAutoDraw(auto => !auto); // setAotoDraw will take auto and return the opposite
   };

   const cards = drawn.map(c =>(//this will map the drawn cards to the cards component
    <Card
         key={c.id}
         name ={c.name}
         image={c.image}
    />
   ));


  return (
    <div className = "Deck">
        {deck ? ( //initially it was null
            <button className="Deck-gimme" onClick={toggleAutoDraw}>
                {autoDraw ? "Stop" : "Start"} Drawing For Me! 
            </button>
        ) : null }
        <div className="Deck-cardarea"> { cards } </div>
        
    </div>
  );
}

export default Deck