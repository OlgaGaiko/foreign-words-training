
const wordsToStudy = [
    {
        originalWord: 'Apple',
        translation: 'Яблоко',
        description: 'A round fruit with red or green skin and a whitish inside'
    },
    {
        originalWord: 'Banana',
        translation: 'Банан',
        description: 'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe'
    },
    {
        originalWord: 'Orange',
        translation: 'Апельсин',
        description: 'A round juicy citrus fruit with a tough bright reddish-yellow rind'
    },
    {
        originalWord: 'Pear',
        translation: 'Груша',
        description: 'A small, round fruit with a yellowish or greenish-yellow skin and a firm white flesh'
    },
    {
        originalWord: 'Strawberry',
        translation: 'Клубника',
        description: 'A small, round fruit with a red or yellow skin and a firm white flesh'
    }
];


const cards = document.querySelectorAll('.flip-card');
let currentCardIndex = 0;
const totalCards = cards.length;

cards.forEach((card, index) => {
    const wordData = wordsToStudy[index];
    const originalWordElement = card.querySelector('.card-front .foreign-word');
    const translationElement = card.querySelector('.card-back .translation');
    const descriptionElement = card.querySelector('.card-back .description');

    if (originalWordElement) {
        originalWordElement.textContent = wordData.originalWord;
    }

    if (translationElement) {
        translationElement.textContent = wordData.translation;
    }

    if (descriptionElement) {
        descriptionElement.textContent = wordData.description;
    }
    card.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});


const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentWordNumber = document.getElementById('current-word-number');

function showCurrentCard() {
    cards.forEach(card => card.classList.add('hidden'));
    cards[currentCardIndex].classList.remove('hidden');
    currentWordNumber.textContent = currentCardIndex + 1;
    updateNavigationButtons();
}

function updateNavigationButtons() {
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === totalCards - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        showCurrentCard();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentCardIndex < totalCards - 1) {
        currentCardIndex++;
        showCurrentCard();
    }
});


const examButton = document.getElementById('exam');
const examModeElements = document.querySelectorAll('.exam-mode');

let currentIndex = 0;
const totalWords = wordsToStudy.length;

function showCurrentWord(index) {
    cards.forEach((card, i) => {
        const wordData = wordsToStudy[i];
        const originalWordElement = card.querySelector('.card-front .foreign-word');
        const translationElement = card.querySelector('.card-back .translation');
        const descriptionElement = card.querySelector('.card-back .description');

        if (originalWordElement) {
            originalWordElement.textContent = wordData.originalWord;
        }

        if (translationElement) {
            translationElement.textContent = wordData.translation;
        }

        if (descriptionElement) {
            descriptionElement.textContent = wordData.description;
        }
    });

    document.getElementById('current-word').textContent = index + 1;
}

function shuffleWords() {
    currentIndex = 0;
    wordsToStudy.sort(() => Math.random() - 0.5);
    showCurrentWord(currentIndex);
}

function transitionToExamMode() {
    document.getElementById('study-mode').classList.add('hidden');
    document.getElementById('exam-mode').classList.remove('hidden');
    shuffleWords();
}

examButton.addEventListener('click', transitionToExamMode);