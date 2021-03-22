const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const playAudio = (src) => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();

}

const startSound = (event) => {
  event.target.classList.add('piano-key-active');
  const note = event.target.dataset.note;
  const src = `assets/audio/${note}.mp3`;
  playAudio(src);
}

const stopSound = (event) => {
  event.target.classList.remove('piano-key-active');
}

const startCorrespondOver = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
  };
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', startSound)
    elem.addEventListener('mouseout', stopSound)
  });

}

const stopCorrespondOver = (elem) => {
  elem.target.classList.remove('piano-key-active')
  pianoKeys.forEach((elem) => {
    elem.removeEventListener('mouseover', startSound)
    elem.removeEventListener('mouseout', stopSound)
  });
}

pianoKeys.forEach((elem) => {
  elem.addEventListener('mousedown', startSound)
});

piano.addEventListener('mousedown', startCorrespondOver);
piano.addEventListener('mouseup', stopCorrespondOver);