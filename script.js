const words = [{
  word: 'Apple',
  translation: 'Яблоко',
  description: 'A round fruit with red or green skin and a whitish inside'
}, {
  word: 'Banana',
  translation: 'Банан',
  description: 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe'
}, {
  word: 'Orange',
  translation: 'Апельсин',
  description: 'A round juicy citrus fruit with a tough bright reddish-yellow rind'
}, {
  word: 'Pear',
  translation: 'Груша',
  description: 'A small, round fruit with a yellowish or greenish-yellow skin and a firm white flesh'
}, {
  word: 'Strawberry',
  translation: 'Клубника',
  description: 'A small, round fruit with a red or yellow skin and a firm white flesh'
}];


const card = document.querySelector(".flip-card");
const cardFront = document.querySelector("#card-front");
const cardBack = document.querySelector("#card-back");
const nextBtn = document.querySelector("#next")
const backBtn = document.querySelector("#back")
const shuffleWords = document.querySelector('#shuffle-words');
const backExm = document.querySelector("#exam")

card.addEventListener("click", function () {
  this.classList.toggle("active")
})

const currentWords = [...words];

function makeCard({ word, translation, description }) {
  cardFront.querySelector("h1").textContent = word;
  cardBack.querySelector("h1").textContent = translation;
  cardBack.querySelector("p span").textContent = description;
};

function renderCard(arr) {
  arr.forEach((item) => {
    makeCard(item);
  })
};

renderCard(currentWords);

function getRandomCard(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

shuffleWords.addEventListener('click', () => {
  makeCard(getRandomCard(currentWords));
});

let progress = 0;

function showProgress() {
  const totalWords = currentWords.length;
  const progress = someCalculationBasedOnTotalWords();
  document.querySelector('#words-progress').value = (progress / totalWords) * 100;
  document.querySelector('#current-word').textContent = progress + 1;
  makeCard(currentWords[progress]);
}

nextBtn.addEventListener("click", function () {
  if (progress < currentWords.length - 1) {
    progress++;
    backBtn.disabled = false;
    if (progress === currentWords.length - 1) {
      nextBtn.disabled = true;
    }
    showProgress();
  }
});

backBtn.addEventListener("click", function () {
  if (progress > 0) {
    progress--;
    if (progress === 0) {
      backBtn.disabled = true;
    }
    if (progress < currentWords.length - 1) {
      nextBtn.disabled = false;
    }
    showProgress();
  }
});

const time = document.querySelector("#time");
let timer;
let sec = 0;
let min = 0;
const divExam = document.querySelector('#exam-cards');


let first = null;
let second = null;


function makeExamCard(key) {
  const newCard = document.createElement('div');
  newCard.textContent = key;
  newCard.classList.add('card');
  return newCard;
};


const examWords = [];

function doExamDiv(arr) {
  arr.forEach((item) => {
    examWords.push(makeExamCard(item.word))
    examWords.push(makeExamCard(item.translation))
  });
  examWords.sort(() => Math.random() - 0.5);
  return examWords;
}

const fragment = new DocumentFragment();

function renderExamCard(arr) {
  arr.forEach((item) => {
    fragment.append(item);
  })
  divExam.append(fragment);
};

let examProgress = 0;

function showExamProgress() {
  const totalQuestions = examQuestions.length;
  const progressPercentage = (examProgress / totalQuestions) * 100;
  document.querySelector('#exam-progress').value = progressPercentage;
  document.querySelector('#correct-percent').textContent = progressPercentage + '%';
}

function doTimer() {
  sec++;
  if (sec < 10) {
    sec = `0` + sec;
  };
  if (sec === 60) {
    sec = 0;
    min++;
  }
  if (min < 10) {
    min = `0` + +min;
  };
  time.innerHTML = `${min}:` + `${sec}`;
}

backExm.addEventListener("click", function () {
  card.classList.add('hidden');
  document.querySelector('.slider-controls').classList.add('hidden')
  document.querySelector('#study-mode').classList.add('hidden');
  document.querySelector('#exam-mode').classList.remove('hidden');

  timer = setInterval(doTimer, 1000)

  renderExamCard(doExamDiv(currentWords));

  divExam.addEventListener("click", function (event) {
    if (!first) {
      first = event.target;
      first.classList.add('correct');
    } else {
      second = event.target;
    }

    if (first && second && first !== second) {
      const firstWord = currentWords.findIndex(el => el.word === first.textContent || el.translation === first.textContent);
      const secondWord = currentWords.findIndex(el => el.word === second.textContent || el.translation === second.textContent);

      if (firstWord === secondWord) {
        second.classList.add('correct');
        first.classList.add('fade-out');
        second.classList.add('fade-out');
        first = null;
        second = null;
        examProgress++;
        showExamProgress();
      } else {
        second.classList.add('wrong');
        setTimeout(function () {
          second.classList.remove('wrong');
          first.classList.remove('correct');
          first = null;
          second = null;
        }, 500);
      }
    }

    if (document.querySelector('#correct-percent').textContent === `100%`) {
      const endTime = time.innerHTML;
      setTimeout(function () {
        alert(`Вы успешно прошли тестирование. Время прохождения: ${endTime}`)
      }, 2000);
    }
  });
})