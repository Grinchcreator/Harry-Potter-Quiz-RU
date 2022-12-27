const question = document.querySelector ('#question');
const choices = Array.from(document.querySelectorAll ('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector ('#progressText');
const progressBarFull = document.querySelector ('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
question: "Какое имя получил Клювокрыл после того, как его спасли от казни Гарри и Гермиона??",
choice1: "Крылатус",
choice2: "Махаон",
choice3: "Уайт",
choice4: "Грей Уингз",
answer: 2,
},
 
{
question: "Сколько лестниц в Хогвартсе?",
choice1: "142",
choice2: "177",
choice3: "147",
choice4: "163",
answer: 1,
},

{
question: "На 17-летие Гарри в какой цвет Гермиона окрасила листья яблони Уизли?",
choice1: "Зелёный",
choice2: "Красный",
choice3: "Голубой",
choice4: "Золотой",
answer: 4,
},

{
question: "Как назывался приют, в котором вырос Лорд Волан-де-Морт?",
choice1: "Приют Эллингтона",
choice2: "Приют Мэйхью",
choice3: "Приют Святого Георга",
choice4: "Приют Вула",
answer: 4,
},
 
{
question: "Девичья фамилия матери Гарри?",
choice1: "Питерс",
choice2: "Смит",
choice3: "Эванс",
choice4: "Коллинз",
answer: 3,
},

{
question: "Какую из этих книг НЕ написал Златопуст Локонс?",
choice1: "Увеселение с Упырями",
choice2: "Йоркширские Йети",
choice3: "Мародёрство с Мантикорой",
choice4: "Каникулы с Каргой",
answer: 3,
},

{
question: "В каком году родился Гарри?",
choice1: '1991',
choice2: '2000',
choice3: '1976',
choice4: '1980',
answer: 4,
},

{
question: "На каком курсе Гарри научился «Манящим чарам»?",
choice1: 'На первом',
choice2: 'На втором',
choice3: 'На третьем',
choice4: 'На четвертом',
answer: 4,
},

{
question: "Любимое варенье Дамблдора?",
choice1: 'Малиновое',
choice2: 'Клунибчное',
choice3: 'Клюквенное',
choice4: 'Черничное',
answer: 1,
},

{
question: "Как зовут профессора Трелони?",
choice1: 'Помона',
choice2: 'Минерва',
choice3: 'Андромеда',
choice4: 'Сивилла',
answer: 4,
},

{
question: "С какого факультета Ханна Аббот?",
choice1: 'Гриффиндор',
choice2: 'Пуффендуй',
choice3: 'Когтевран',
choice4: 'Слизерин',
answer: 2,
},

{
question: "В «Гарри Поттере и Кубке огня» Волан-де-Морт убивает магла в Доме Риддлов. Кто это был?",
choice1: 'Деннис Бишоп',
choice2: 'Пирс Полкисс',
choice3: 'Фрэнк Брайс',
choice4: 'Билли Стаббс',
answer: 3,
},

{
question: "День рождения Северуса Снегга?",
choice1: '9 января 1960 года',
choice2: '19 января 1960 года',
choice3: '29 января 1960 года',
choice4: '13 января 1960 года',
answer: 1,
},
                    

{
question: "Кто средний из братьев Певереллов?",
choice1: 'Игнотус',
choice2: 'Кадм',
choice3: 'Антиох',
choice4: 'Корли',
answer: 2,
},

{
question: "Какой марки была летающая машина семьи Уизли?",
choice1: "Форд Англия",
choice2: "Мини Купер",
choice3: "Шевроле",
choice4: "Шкода",
answer: 1,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startQuiz = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {
if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign ('end.html')
}

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor (Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice (questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach (choice =>{
    choice.addEventListener('click', e =>{
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() =>{
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
    }, 1000)
    })
})

incrementScore = num => {
    score+= num
    scoreText.innerText = score
}

startQuiz()