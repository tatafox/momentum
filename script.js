// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  bgChangeBtn = document.querySelector('.bg-change');

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const quoteBtn = document.querySelector('.quote__btn');

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed');


let savedName = '',
    savedFocus = '';

let arrayOfNumberImg = [],
    currentNumberImg;  

// Options
const showAmPm = true;

//date 
const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      monthOfYear = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} `;
  setTimeout(showTime, 1000);
}

// Show day and month
function getMonthDate() {
  let today = new Date();
  console.log(today.getDay())
  date.innerHTML = today.getDate() + ' ' + monthOfYear[today.getMonth()] + '  ' + today.getFullYear() + ' , ' + dayOfWeek[today.getDay()];
}


// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Greeting
function setGreet() {
  let today = new Date(),
      hour = today.getHours();
  if (hour < 6) {
      // Night
      greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    greeting.textContent = 'Good Evening, ';
    //document.body.style.color = 'white';
  }
  let min = today.getMinutes(),
      sec = today.getSeconds(),
      secondTimeout = (3600 - (min*60) - sec) * 1000;
  setTimeout(setGreet, secondTimeout);

}

// Set Background 
function setBg() {
  let today = new Date(),
    hour = today.getHours();
  let urlImg = "";
  if (arrayOfNumberImg.length == 0) {
    setRandomArrayImg(); 
    currentNumberImg = hour; 
  } else {
    if (currentNumberImg < 23) {
      currentNumberImg += 1;
    } else {
      currentNumberImg = 0;
    }  
    hour = currentNumberImg;
  }

    if (hour < 6) {
      // Night
      urlImg += 'assets/images/night/' + arrayOfNumberImg[hour] + '.jpg';
    } else if (hour < 12) {
    // Morning
    urlImg += 'assets/images/morning/' + arrayOfNumberImg[hour] + '.jpg';
  } else if (hour < 18) {
    // Afternoon
    urlImg += 'assets/images/day/' + arrayOfNumberImg[hour] + '.jpg';
  } else {
    // Evening
    urlImg += 'assets/images/evening/' + arrayOfNumberImg[hour] + '.jpg';
 //   document.body.style.color = 'white';
  }
  //urlImg += "')"

  const img = document.createElement('img');
  img.src = urlImg;
  img.onload = () => {
    
    document.body.style.backgroundImage = `url(${urlImg})`;
  }
    

  let min = today.getMinutes(),
      sec = today.getSeconds(),
      secondTimeout = (3600 - (min*60) - sec) * 1000;
  
      setTimeout(setBg, secondTimeout);
    
}

//set random array of img
function randomArray(arr) {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 20) + 1;
    if (!arr.includes(randomNumber)) {
      arr.push(randomNumber);
    }
  } while (arr.length < 6)
}

function setRandomArrayImg() {
  let arr = [],
      i = 0;
  while (i<4) { 
    randomArray(arr);
    arrayOfNumberImg = arrayOfNumberImg.concat(arr);
    arr = [];
    i++;
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'blur') {//} & savedName !== '') {
    if (name.textContent === '') {
      name.textContent = localStorage.getItem('name');//savedName;
      //localStorage.setItem('name', e.target.innerText);
    } else {
      localStorage.setItem('name', e.target.innerText);
    }
    name.blur();
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText === '') {
        if (name.textContent === '') {
          name.textContent = localStorage.getItem('name');//savedName;
          name.blur();
        } else {
          localStorage.setItem('name', '[Enter Name]');
          name.blur();
        }
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
    //name.blur();
  }
}

function clickName() {
  //savedName = name.textContent;
  name.textContent = '';
}





// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
  focus.blur();
}

// Set Focus
function setFocus(e) {
  if (e.type === 'blur') {//} & savedFocus !== '') {
    if (focus.textContent === '') {
      focus.textContent = localStorage.getItem('focus');
      //localStorage.setItem('focus', e.target.innerText);
    } else {
      localStorage.setItem('focus', e.target.innerText);
    }
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        if (e.target.innerText === '') {
          if (focus.textContent === '') {
            focus.textContent = localStorage.getItem('focus');
            focus.blur();
          } else {
            localStorage.setItem('focus', '[Enter Focus]');
            focus.blur();
          }
        } else {
          localStorage.setItem('focus', e.target.innerText);
          focus.blur();
        }
    } else {
      localStorage.setItem('focus', e.target.innerText);
      //focus.blur();
    }
  }
}

function clickFocus() {
  //savedFocus = focus.textContent;
  focus.textContent = '';
}

//Quote

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
   const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;  //https://type.fit/api/quotes много цитат, но вытаскивает все сразу, не рандом
  const res = await fetch(url);
  const data = await res.json(); 
  if (data.quote.length > 240) {
    getQuote();
  } else {
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
  }
  //http://quotes.stormconsultancy.co.uk/random.json
  //blockquote.textContent = data.quote;
  //figcaption.textContent = data.author;
  //https://seinfeld-quotes.herokuapp.com/random
  //blockquote.textContent = data.quote;
  //figcaption.textContent = data.author;
  //https://thesimpsonsquoteapi.glitch.me/quotes
  //blockquote.textContent = data[0].quote;
  //figcaption.textContent = data[0].character;
  //https://quote-garden.herokuapp.com/api/v2/quotes/random
   //blockquote.textContent = data.quote.quoteText;
   //figcaption.textContent = data.quote.quoteAuthor;
}


//weather
  
async function getWeather() {
  if (city.textContent !== '[Enter City]') {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=b0b6bf1b36d72831df141fc582c2c37e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    //alert("Hello");
    if (data.cod == '404') {
      alert("Enter the correct city name");
    } else {
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      windSpeed.textContent = `wind ${data.wind.speed}m/s`;
      humidity.textContent = `humidity ${data.main.humidity}%`;
    }
  }
}


function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
  city.blur();
}

function setCity(e) {
  if (e.type === 'blur') {
    if (city.textContent === '') {
      city.textContent = localStorage.getItem('city');
    } else {
      localStorage.setItem('city', e.target.innerText);
    }
  } else if (e.type === 'keypress') {
    // Make sure enter is pressed
      if (e.which == 13 || e.keyCode == 13) {
        if (e.target.innerText === '') {
          if (city.textContent === '') {
            city.textContent = localStorage.getItem('city');
            city.blur();
          } else {
            localStorage.setItem('city', '[Enter city]');
            city.blur();
          }
        } else {
          localStorage.setItem('city', e.target.innerText);
          city.blur();
        }
        getWeather();
    } else {
      localStorage.setItem('city', e.target.innerText);
    }
  }
}

function clickCity() {
  city.textContent = '';
}


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', clickCity);
city.addEventListener('blur', setCity);


document.addEventListener('DOMContentLoaded', getQuote);
quoteBtn.addEventListener('click', getQuote);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickFocus);

bgChangeBtn.addEventListener('click',setBg);

// Run
//setRandomArrayImg();

showTime();
setBg();
setGreet();
getName();
getFocus();
getCity();
getMonthDate();
