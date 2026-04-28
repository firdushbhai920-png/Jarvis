const BOSS = "फ़िरदौस भाई";

const speak = (text) => {
    window.speechSynthesis.cancel();
    const s = new SpeechSynthesisUtterance(text);
    s.lang = 'hi-IN';
    s.rate = 1.0;

    // बोलना खत्म होते ही माइक फिर से चालू होगा
    s.onend = () => {
        setTimeout(() => {
            try { recognition.start(); } catch (e) {}
        }, 500); 
    };
    window.speechSynthesis.speak(s);
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'hi-IN';
recognition.continuous = false;

recognition.onresult = (event) => {
    const msg = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    if (msg.includes("कैसे हो")) {
        speak("मैं बहुत बढ़िया हूँ " + BOSS + ", आप कैसे हैं?");
    } 
    else if (msg.includes("नमस्ते") || msg.includes("हेलो") || msg.includes("इंटेलिजेंट")) {
        speak("शुक्रिया " + BOSS + ", मैं आपकी मदद के लिए तैयार हूँ।");
    }
    else if (msg.includes("यूट्यूब")) {
        speak("जी बॉस, यूट्यूब खोल रहा हूँ।");
        window.open("https://www.youtube.com");
    }
    else if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(BOSS + ", अभी समय है " + new Date().toLocaleTimeString());
    }
    else {
        // अगर समझ न आए, तो भी माइक चालू रखने के लिए
        setTimeout(() => {
            try { recognition.start(); } catch(e) {}
        }, 1000);
    }
};

recognition.onend = () => {
    if (!window.speechSynthesis.speaking) {
        try { recognition.start(); } catch(e) {}
    }
};

function powerUp() {
    document.getElementById('st').innerText = "सिस्टम ऑनलाइन...";
    speak("सिस्टम ऑनलाइन। स्वागत है " + BOSS);
}
