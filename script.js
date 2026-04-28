const BOSS = "फ़िरदौस भाई";

const speak = (text) => {
    window.speechSynthesis.cancel(); // पुरानी आवाज़ को साफ़ करने के लिए
    const s = new SpeechSynthesisUtterance(text);
    
    // फ़ोन में मौजूद आवाज़ों को चेक करने के लिए
    let voices = window.speechSynthesis.getVoices();
    s.voice = voices.find(v => v.lang.includes('hi')) || voices[0]; 
    
    s.lang = 'hi-IN';
    s.rate = 1.1; // थोड़ी तेज़ आवाज़
    s.pitch = 1.0;

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

recognition.onresult = (event) => {
    const msg = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    if (msg.includes("कैसे हो")) {
        speak("मैं बहुत बढ़िया हूँ " + BOSS);
    } 
    else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak("नमस्ते बॉस, क्या हुक्म है?");
    }
    else if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(BOSS + ", अभी समय है " + new Date().toLocaleTimeString());
    }
    else {
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
    // पहला टच होते ही आवाज़ को जगाने के लिए
    speak("सिस्टम ऑनलाइन। स्वागत है " + BOSS);
}

// आवाज़ों को लोड करने के लिए एक छोटा सा ट्रिक
window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
};

