const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const startCorrespondOver = () =>

  piano.addEventListener('mousedown', (event) => {
    event.target.classList.add('piano-key-active');
  })
piano.addEventListener('mouseup', (event) => {
  event.target.classList.remove('piano-key-active');
})

