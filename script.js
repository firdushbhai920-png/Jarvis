const BOSS = "फ़िदुस भाई"; 

const speak = (t) => {
    const s = new SpeechSynthesisUtterance(t);
    s.lang = 'hi-IN';
    s.pitch = 1.0;
    s.rate = 1.0;
    window.speechSynthesis.speak(s);
};

// स्क्रीन टच करते ही जार्विस बोलेगा
window.onclick = () => {
    speak("एक्सेस ग्रांटेड। स्वागत है, " + BOSS + "। आज का क्या हुक्म है?");
};

const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
const jarvis = new Rec();

jarvis.continuous = true;
jarvis.lang = 'hi-IN';

jarvis.onresult = (e) => {
    const msg = e.results[e.results.length - 1][0].transcript.toLowerCase();
    document.getElementById('st').innerText = "सुना: " + msg;

    if (msg.includes("तुम्हारा मालिक कौन है") || msg.includes("मेरा नाम जानते हो")) {
        speak("जी हाँ, मेरे मालिक का नाम " + BOSS + " है।");
    } 
    else if (msg.includes("समय") || msg.includes("टाइम")) {
        speak(BOSS + ", अभी समय है " + new Date().toLocaleTimeString());
    } 
    else if (msg.includes("नमस्ते") || msg.includes("हेलो")) {
        speak("नमस्ते " + BOSS + ", मैं आपकी क्या सेवा कर सकता हूँ?");
    } 
    else if (msg.includes("कैसे हो")) {
        speak("मैं बहुत बढ़िया हूँ " + BOSS + ", आप कैसे हैं?");
    }
};

jarvis.start();
