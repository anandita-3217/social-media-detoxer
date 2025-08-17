import { useState } from "react";
import './ContentFeed.css';
function ContentFeed(){
    const [currentContent, setCurrentContent] = useState("Click the button to get some brain food!");
    const [isLoading,setIsLoading] =useState(false);
    
    const backupContent =[
        "🧠 Fun Fact: Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly edible!",
        "💻 Coding Tip: Always name your variables like you're writing a love letter to your future self.",
        "😂 Dad Joke: Why don't scientists trust atoms? Because they make up everything!",
        "📚 Random Wisdom: The average person checks their phone 96 times per day. You're here instead. Gold star! ⭐",
        "🌟 Motivation: You've saved approximately 3 minutes by not scrolling social media. That's enough time to do 30 jumping jacks!"
    ];
    const getRandomFact = async() =>{
        try{
            const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
            const data = await response.json();
            return `Random Fact: ${data.text}`;
        }
        catch(error){
            console.error('Fact API failed: ',error);
            return backupContent[0];
        }
    };
    const getDadJoke = async() =>{
        try{
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return `Dad Joke: ${data.joke}`
        }
        catch(error){
            console.error('Joke API Failed: ',error);
            return backupContent[2];
        }
    };
    const getRandomContent = async () =>{
        setIsLoading(true);
        const contentTypes = [getRandomFact,getDadJoke];
        const randomType = Math.floor(Math.random() * contentTypes.length);
        try{
            const content = await contentTypes[randomType]();
            setCurrentContent(content);
        }
        catch(error){
            const randomIndex = Math.floor(Math.random() * backupContent.length);
            setCurrentContent(backupContent[randomIndex]);
            console.error(error);
        }
        setIsLoading(false);
    };
    return (
        <div className="content-feed-container">
            <h2>Your Scroll Replacement Feed</h2>
            <div className="replacement-feed">
                <p>{currentContent}</p>
                <button className="content-feed-button" onClick={getRandomContent} >{isLoading ? 'Getting your brain food... 🧠' : 'Give Me Something Better Than Social Media! 🎲'}</button>
            </div>
        </div>
    );
}
export default ContentFeed;