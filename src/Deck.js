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

//if the user chooses autoDrwan then draw a card automatically in every second.
//// by using useRef we can keep track of the timer
//and by using useEffect we can draw a card fri=om the api, add card to state "drawn" list
//and then remove the card from the state "deck" list
   useEffect(() => {
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

    if(autodraw && !timerRef.current){//if the timer is not running and the user wants to autoDraw
        timerRef.current = setInterval(async () => {
            await getCard();
        } , 1000); //this will draw a card every second
    } 
    return() =>{
        clearInterval(timerRef.current);
        timerRef.current = null;
    };
   } , [autoDraw, setAutoDraw , deck]);

   const toggleAutoDraw = () =>{
         setAutoDraw(auto => !auto);
   };

   const cards = drawn.map(c =>(
    <Card
         key={c.id}
         name ={c.name}
         image={c.image}
    />
   ));

  return (
    <div className = "Deck">
        {deck ? (
            <button className="Deck-gimme" onClick={toogleAutoDraw}>
                {autoDraw ? "Stop" : "Start"} Drawing For Me! 
            </button>
        ) : null }
        <div className="Deck-cardarea"> { cards } </div>
        
    </div>
  );
}

export default Deck