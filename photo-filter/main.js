// FULLSCREEN 

const bntFullScreen = document.querySelector('.openfullscreen');

const openFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
bntFullScreen.addEventListener('click', openFullScreen)

/* FILTERS */

const labels = document.querySelectorAll('.filters label');

labels.forEach(elem => {
  elem.oninput = function (event) {
    this.querySelector('output').innerHTML = event.target.value;
    const suffix = this.querySelector('input').dataset.sizing;
    document.documentElement.style.setProperty(`--${this.querySelector('input').name}`, this.querySelector('input').value + suffix);
  }
})

/* RESET */

const resetBtn = document.querySelector('.btn-reset');

resetBtn.addEventListener('click', () => {
  document.documentElement.style.removeProperty('--blur');
  document.documentElement.style.removeProperty('--invert');
  document.documentElement.style.removeProperty('--sepia');
  document.documentElement.style.removeProperty('--saturate');
  document.documentElement.style.removeProperty('--hue');

  labels.forEach(elem => {
    if (elem.querySelector('input').name == "saturate") {
      elem.querySelector('input').value = '100';
      elem.querySelector('output').innerHTML = elem.querySelector('input').value;
    } else {
      elem.querySelector('input').value = '0';
      elem.querySelector('output').innerHTML = elem.querySelector('input').value;
    }
  })
});

/* NEXT PICTURE */

const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const periud = ['morning/', 'day/', 'evening/', 'night/'];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

const nextBtn = document.querySelector('.btn-next');
const img = document.querySelector('img');

let time = new Date();
time = time.getHours();
console.log(time);

if (time >= 0 && time <= 5) per = 3;
else if (time >= 6 && time <= 11) per = 0;
else if (time >= 12 && time <= 17) per = 1;
else if (time >= 18 && time <= 23) per = 2;

function viewImage(src) {
  img.src = src;
  img.onload = () => { };
}

function getImage() {
  const index = i % images.length;
  const imageSrc = base + periud[per] + images[index];
  viewImage(imageSrc);
  drawImage(imageSrc);
  i++;
  nextBtn.disabled = true;
  setTimeout(function () { nextBtn.disabled = false }, 1000);
}
nextBtn.addEventListener('click', getImage);

/* ADD IMAGE */

const imageContainer = document.querySelector('.editor');
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', function (e) {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
    console.log(img);
  }
  reader.readAsDataURL(file);
});

/* SAVE PICTURE */

const canvas = document.querySelector('canvas');
const saveBtn = document.querySelector('.btn-save')
const ctx = canvas.getContext('2d');

function drawImage(canvasSrc) {

  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function () {
    canvas.width = img.width * 2;
    canvas.height = img.height * 2;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}
drawImage()