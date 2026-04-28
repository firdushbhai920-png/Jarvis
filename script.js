const const BOSS = "फ़िदुस भाई"; 

const speak = (text) => {
    window.speechSynthesis.cancel();
    const s = new SpeechSynthesisUtterance(text);
    s.lang = 'hi-IN'; // हिंदी भाषा
    s.rate = 1.0;
    
    if (recognition) recognition.stop();
    s.onend = () => { try { recognition.start(); } catch(e) {} };
    window.speechSynthesis.speak(s);
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'hi-IN'; // हिंदी में सुनेगा

recognition.onresult = (event) => {
    const msg = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    // सरल हिंदी कमांड्स
    if (msg.includes("कैसे हो")) {
        speak("मैं बहुत बढ़िया हूँ " + BOSS + ", आप कैसे हैं?");
    } 
    else if (msg.includes("नाम") || msg.includes("कौन हूं")) {
        speak("आप मेरे मालिक " + BOSS + " हैं।");
    }
    else if (msg.includes("यूट्यूब")) {
        speak("जी " + BOSS + ", यूट्यूब खोल रहा हूँ।");
        window.open("https://www.youtube.com", "_blank");
    }
    else if (msg.includes("गूगल")) {
        speak("जी, गूगल हाजिर है।");
        window.open("https://www.google.com", "_blank");
    }
    else if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(BOSS + ", अभी समय है " + new Date().toLocaleTimeString());
    }
    else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak("नमस्ते " + BOSS + "। आज का क्या हुक्म है?");
    }
};

function powerUp() {
    document.getElementById('st').innerText = "सिस्टम ऑनलाइन...";
    speak("सिस्टम ऑनलाइन। स्वागत है " + BOSS);
}
