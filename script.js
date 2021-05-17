const warning = document.getElementById("warning");
const toggleButton = document.getElementById("toggle-button");
const toggleLanguage = document.getElementById("toggle-language");

let recognition = {},
  isRecognizing;

try {
  recognition = new webkitSpeechRecognition();
} catch {
  warning.textContent = "Please use a chrome-based browser on laptop/desktop";
}

const initialOptions = {
  lang: "id-ID",
  continuous: true,
  interimResults: true,
  onend: reset(),
};

Object.assign(recognition, initialOptions);

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    //only display the final transcript
    textarea.value = [...event.results].map((result) => result[0].transcript);
  }
};

toggleLanguage.onchange = function (event) {
  const language = event.target.value;

  recognition.lang = language;
  toggleStartStop();
};

function reset() {
  isRecognizing = false;
  toggleButton.textContent = "Click to Speak";
}

function toggleStartStop() {
  if (isRecognizing) {
    toggleButton.classList.remove("is-active");
    recognition.stop();
    reset();
  } else {
    toggleButton.classList.add("is-active");
    recognition.start();
    isRecognizing = true;
    toggleButton.textContent = "Click to Stop";
  }
}
