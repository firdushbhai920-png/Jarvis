const BOSS = "फ़िरदौस भाई";
const speak = (t) => {
    const s = new SpeechSynthesisUtterance(t);
    s.lang = 'hi-IN';
    s.pitch = 0.8; 
    window.speechSynthesis.speak(s);
};

const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
const jarvis = new Rec();
jarvis.continuous = true;
jarvis.lang = 'hi-IN';

jarvis.onresult = (e) => {
    const msg = e.results[e.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(`${BOSS}, अभी समय है ${new Date().toLocaleTimeString()}`);
    } else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak(`नमस्ते ${BOSS}, मार्क 420 आपकी सेवा में हाज़िर है।`);
    } else if (msg.includes("कैसे हो")) {
        speak(`मैं ठीक हूँ ${BOSS}, शुक्रिया। आप कैसे हैं?`);
    }
};

window.onload = () => {
    speak(`एक्सेस ग्रांटेड। स्वागत है ${BOSS}`);
    jarvis.start();
};
