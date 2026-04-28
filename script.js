const BOSS = "फ़िदुस भाई";

const speak = (text) => {
    window.speechSynthesis.cancel();
    const s = new SpeechSynthesisUtterance(text);
    s.lang = 'hi-IN';
    
    if (window.recognition) window.recognition.stop();
    s.onend = () => { try { window.recognition.start(); } catch(e) {} };
    window.speechSynthesis.speak(s);
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.recognition = new SpeechRecognition();
window.recognition.continuous = true;
window.recognition.lang = 'hi-IN';

window.recognition.onresult = (event) => {
    const msg = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    if (msg.includes("कैसे हो")) {
        speak("मैं बहुत बढ़िया हूँ " + BOSS + ", आप कैसे हैं?");
    } 
    else if (msg.includes("नाम")) {
        speak("आप मेरे मालिक " + BOSS + " हैं।");
    }
    else if (msg.includes("यूट्यूब")) {
        speak("जी " + BOSS + ", यूट्यूब खोल रहा हूँ।");
        window.open("https://www.youtube.com", "_blank");
    }
    else if (msg.includes("गूगल")) {
        speak("जी, गूगल खोल रहा हूँ।");
        window.open("https://www.google.com", "_blank");
    }
    else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak("नमस्ते " + BOSS + "। आज का क्या हुक्म है?");
    }
};

function powerUp() {
    document.getElementById('st').innerText = "सिस्टम ऑनलाइन...";
    speak("सिस्टम ऑनलाइन। स्वागत है " + BOSS);
    try { window.recognition.start(); } catch(e) {}
}
