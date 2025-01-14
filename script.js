
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;


function startVoiceAssistant() {
  const output = document.getElementById("output");
  output.innerHTML = "Listening... 🎤";

  recognition.start();

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    output.innerHTML = `You said: "${command}"`;
    processCommand(command);
  };

  recognition.onerror = (event) => {
    output.innerHTML = `Error: ${event.error}`;
  };
}


function processCommand(command) {
  if (command.includes("jarvis")) {
    const query = command.replace("jarvis", "").trim();
    if (query) {
      speak(`Searching Google for ${query}`);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else {
      speak("What would you like me to search on Google?");
    }
  } else if (command.includes("time")) {
    const currentTime = new Date().toLocaleTimeString();
    speak(`The current time is ${currentTime}`);
  } else if (command.includes("date")) {
    const currentDate = new Date().toLocaleDateString();
    speak(`Today's date is ${currentDate}`);
  } else {
    speak("I'm sorry, I didn't understand that command.");
  }
}


function speak(message) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  synth.speak(utterance);

  const output = document.getElementById("output");
  output.innerHTML = `Assistant: ${message}`;
}
