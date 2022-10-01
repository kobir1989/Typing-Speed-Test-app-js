document.onload = displayText;
const startBtn = document.getElementById('startBtn');
const textInput = document.getElementById('text');
const time = document.getElementById('time');
const word = document.getElementById('word');
const cancelBtn = document.getElementById('cancelBtn');
const checkText = document.getElementById('checkText');
const mistake = document.getElementById('mistake');
const accuracy = document.getElementById('accuracy');

let interval;
let timeCount = 1;
let charIndex = 0;
let mistakeTotal = 0;
let accuracyCount = 0;

const text =
  'There are wishes in my hair, constellations of fluff from dandelion ghosts my daughter blows in my direction. She always wishes for the same impossible thing: a dinosaur resurrection. Of course, it hasn’t happened, but to her, it simply hasn’t happened yet. She needs to keep wishing. Meanwhile, my toddler stomps through the yard with a plastic shovel, smashing the head off every dandelion he sees. My daughter is upset, not that he’s destroying them, but that he doesn’t make a wish first. As clouds of pappus bloom in his wake, she watches helplessly; all that unused magic, floating away.';

//
function displayText() {
  const singleChar = text.split('').map((txt) => {
    return `<span class="txtSpan">${txt}</span>`;
  });
  checkText.innerHTML += singleChar.join('');
}
displayText();

//
function getTextInput() {
  const inputValue = textInput.value.split('');
  let textSpan = document.querySelectorAll('.txtSpan');
  textSpan = Array.from(textSpan);
  textSpan.forEach((item, index) => {
    if (item.innerText == inputValue[index]) {
      item.classList.add('success');
    } else if (inputValue[index] == null) {
      if (item.classList.contains('success')) {
        item.classList.remove('sussess');
      } else {
        item.classList.remove('error');
      }
    } else {
      if (!item.classList.contains('error')) {
        mistakeTotal++;
        item.classList.add('error');
      } else {
        mistakeTotal--;
      }
    }
  });
}

let sec = timeCount * 60;
function countDown() {
  const totlaWord = textInput.value;
  const WPM = totlaWord.trim().length / 5 / timeCount;
  if (sec > 0) {
    cancelBtn.classList.remove('hidden');
    getTextInput();
  }
  if (sec <= 0) {
    word.innerText = WPM;
    clearInterval(interval);
    mistake.innerHTML = mistakeTotal;
    accuracy.innerText =
      Math.floor(
        ((textInput.value.length - mistakeTotal) * 100) / textInput.value.length
      ) + '%';
    textInput.value = '';
    time.innerText = '00';
    textInput.disabled = true;
  } else {
    time.innerText = sec--;
  }
}

startBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  textInput.value = '';
  startBtn.classList.add('hidden');
});
cancelBtn.addEventListener('click', () => {
  clearInterval(interval);
  location.reload();
});
