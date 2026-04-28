const BOSS = "फ़िदुस भाई"; 

const speak = (t) => {
    // बोलने से पहले जार्विस को सुनना बंद करना पड़ेगा
    if (jarvis) jarvis.stop(); 
    
    const s = new SpeechSynthesisUtterance(t);
    s.lang = 'hi-IN';
    s.pitch = 1.0;
    s.rate = 1.0;

    s.onend = () => {
        // बोलना खत्म होने के बाद ही जार्विस दोबारा सुनना शुरू करेगा
        jarvis.start(); 
    };

    window.speechSynthesis.speak(s);
};

window.onclick = () => {
    speak("नमस्ते " + BOSS + ", सिस्टम अब पूरी तरह तैयार है।");
};

const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
const jarvis = new Rec();

jarvis.continuous = true;
jarvis.lang = 'hi-IN';

jarvis.onresult = (e) => {
    const msg = e.results[e.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    // अगर जार्विस खुद बोल रहा है तो उसे नज़रअंदाज़ करो
    if (window.speechSynthesis.speaking) return;

    if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(BOSS + ", अभी समय है " + new Date().toLocaleTimeString());
    } 
    else if (msg.includes("नाम") || msg.includes("मालिक")) {
        speak("मेरे मालिक का नाम " + BOSS + " है।");
    } 
    else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak("नमस्ते " + BOSS + "।");
    } 
    else if (msg.includes("कैसे हो")) {
        speak("मैं एकदम ठीक हूँ " + BOSS + "।");
    }
};

// शुरू करें
try {
    jarvis.start();
} catch (error) {
    console.log("माइक पहले से चालू है");
}
