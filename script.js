// Time & Date //

function startTime() {
    const time = new Date()
    let h = time.getHours()
    let m = time.getMinutes()
    h = hours(h)
    m = minutes(m)
    s = session()

    document.querySelector('[data-time]').textContent =  `${h}:${m} ${s}`
    setTimeout(startTime, 1000);
}
startTime()

function minutes(i) {
    if (i < 10) {
        i = "0" + i
    } 
    return i
}

function hours(i) {
    if (i === 0) {
        i = 12
    }

    if (i >= 12 ) {
        i -= 12
    }

    return i
}

function session() {
    let h = new Date().getHours()
    let s = ''
    if (h < 12) {
        s = 'AM'
    }
    else {
        s = 'PM'
    }

    return s
}

function showDate() {
    const date = new Date()
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    const cal = ['Jan', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const www = week[date.getDay()]
    const mm = cal[date.getMonth()]
    const dd = date.getDate()

    document.querySelector('[data-date]').textContent =  `${www}, ${mm} ${dd}`
    setTimeout(showDate, 1000);
  }
  showDate()


// greeting //

const greetingMessage = document.querySelector('[data-greet]')
const fname = document.querySelector('#fname')
const nameButton = document.querySelector('#continue')
const nameSubmit = document.querySelector('[data-name]')
const welcomeModal = document.querySelector('#welcome')
const mainPage = document.querySelector('#main-page')
const today = new Date()

fname.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        nameButton.click()
    }
})

const greet = greetings()
function greetings() {
    if (session() === 'AM') {
        return 'Good Morning, '
    }
    
    else if (session() === 'PM' && today.getHours() < 18) {
        return 'Good Aftenoon, '
    }
    
    else {
        return 'Good Evening, '
    }
}

nameSubmit.addEventListener('submit', function(event) {
    welcomeModal.style.display = 'none'
    mainPage.style.display = 'flex'
    greetingMessage.textContent = greet + fname.value
})


// daily focus

const focusInput = document.querySelector('#daily-focus')
const focusLabel = document.querySelector('[data-focusLabel]')
const todayFocus = document.querySelector('#today-focus')
const editFocus = document.querySelector('#focus .wrapper')

focusInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && focusInput.value != '') {
        event.preventDefault()
        todayFocus.style.display = 'block'
        todayFocus.textContent = focusInput.value
        focusInput.style.display = 'none'
        focusLabel.textContent = 'Today'
    }
})

editFocus.addEventListener('click', function() {
        todayFocus.style.display = 'none'
        focusInput.style.display = 'block'
        focusLabel.textContent = 'What will you focus on today?'
})

// todo list //

const todoInput = document.querySelector('[data-todo-input]')

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && todoInput.value != '') {
        event.preventDefault()
        newTodo(todoInput.value)
        todoInput.value = ''
    }
})

function newTodo (userText) {

    const todoList = document.querySelector('#todo-list')

    const item = document.createElement('li')
    const checkBox = document.createElement('input')
    const label = document.createElement('label')
    const remove = document.createElement('a')

    checkBox.setAttribute('type', 'checkbox')
    remove.setAttribute('href', '#')
    
    todoList.appendChild(item)
    item.appendChild(checkBox)
    item.appendChild(label)
    item.appendChild(remove).textContent = 'x'

    label.textContent = userText

    remove.addEventListener('click', () => {
        item.parentNode.removeChild(item)
    })
}

const todoModal = document.querySelector('[data-modal]')
const openTodo = document.querySelector('#open-todo')
const exitTodo = document.querySelector('#exit-todo')

openTodo.addEventListener('click', () => {
    todoModal.style.display = 'flex'
})

exitTodo.addEventListener('click', () => {
    todoModal.style.display = 'none'
})

// quotes //

const quote = document.querySelector('#quote')
const quoteInput = document.querySelector('#quote-input')
const editQuote = document.querySelector('[data-edit-quote]')

editQuote.addEventListener('click', () => {
    quote.style.display = 'none'
    quoteInput.style.display = 'block'
    quoteInput.focus()
})

quoteInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        
    }  

    if (quoteInput.value != '') {
        quote.style.display = 'block'
        quote.textContent = quoteInput.value
        quoteInput.style.display = 'none'
        localStorage.setItem(`quote${localStorage.length + 1}`, quoteInput.value);
    }
    if (quoteInput.value === '') {
        quote.style.display = 'block'
        quoteInput.style.display = 'none'
        quoteRandom()
    }
})

function quoteRandom () {
    let quoteObj = localStorage
    let quotesArr = Object.values(quoteObj)
    let index = Math.floor(Math.random() * quotesArr.length)
    console.log(index)

    quote.textContent = quotesArr[index]
}

quoteRandom()

