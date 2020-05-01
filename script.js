const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillonairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];


//fetch random user and add money

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  const newUser = { 
    name: `${user.name.first}  ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  
  addData(newUser);
}

//function to add new user 

function addData(user) {
  data.push(user);

  updateDOM();
}

// update DOM function

function updateDOM(providedData = data) {
  // Clear Main Div

  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach( obj => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${obj.name}</strong> ${formatMoney(obj.money)} `;
    main.appendChild(element);
  })
}


// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // format as 12,456.23
}

function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money*2}
  })

  updateDOM();
}

// sort by richest
function sortByRichest() {
  data = data.sort((a,b) => b.money - a.money);
  updateDOM();
}

//show millionaires
function showMillonaires() {
  data= data.filter(obj => obj.money > 1000000);

  updateDOM();
}

//calculate wealth

function calculateWealth() {
  const wealth = data.reduce((acc, obj) => (acc += obj.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth :<strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthElement);
}

//Event Listner

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillonairesBtn.addEventListener('click', showMillonaires);
calculateWealthBtn.addEventListener('click', calculateWealth);