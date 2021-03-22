const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const keysObj = {
  KeyD: 'c',
  KeyF: 'd',
  KeyG: 'e',
  KeyH: 'f',
  KeyJ: 'g',
  KeyK: 'a',
  KeyL: 'b',
  KeyR: 'c♯',
  KeyT: 'd♯',
  KeyU: 'f♯',
  KeyI: 'g♯',
  KeyO: 'a♯',
}

window.addEventListener('keydown', (event) => {
  if (!event.repeat) {
    if (keysObj[event.code] === undefined) return;
    pianoKeys.forEach((elem) => {
      if (keysObj[event.code] === elem.getAttribute('data-note')) {
        elem.classList.add('piano-key-active');
      }
    })

    playAudio(`assets/audio/` + `${keysObj[event.code]}` + `.mp3`);
  }
});

window.addEventListener('keyup', (event) => {
  pianoKeys.forEach((elem) => {
    if (keysObj[event.code] === elem.getAttribute('data-note')) {
      elem.classList.remove('piano-key-active');
    }
  })
})

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


// const pianoLetter = document.querySelectorAll('[data-letter]')

// const btnContainer = document.querySelector('.btn-container');
// const btn = document.querySelectorAll('.btn');

// btnContainer.addEventListener('click', (elem) => {
//   if (!elem.target.classList.contains('btn-active')) {
//     elem.target.classList.add('btn-active')
//   }
// })