// import { fetchData } from './modules/fetch.js';

const API_URL = "https://api.github.com/users/SundousKanaan";
const reposAPI_URL = "https://api.github.com/users/SundousKanaan/repos";
// const titelsAPI_URL = `https://api.github.com/repos/SundousKanaan/${repoTitel}`;

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const navButton = document.querySelector("body > button")
const header = document.querySelector("header")

navButton.addEventListener('click', () => {
    if (header.classList.contains("closeNav")) {
        header.classList.add('openNav');
        header.classList.remove('closeNav');
        navButton.classList.add('openNav');
    } else {
        header.classList.remove('openNav');
        header.classList.add('closeNav');
        navButton.classList.remove('openNav');
    }
})


const avatarImg = document.querySelector("main > div > article:first-of-type > section:first-of-type img");
const h1Element = document.querySelector("main > div > article:first-of-type > section:first-of-type div h1");
const location = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:first-of-type");
// const email = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(2)");
const bio = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(2)");
const email = document.querySelector("main > div > article:first-of-type > section:first-of-type div a");




console.log(avatarImg,h1Element);

async function fetchFunction() {
    const allData = await fetchData(API_URL);
    console.log("allData", allData);

    h1Element.textContent = allData.name;
    location.textContent = `Location: ${allData.location}`;
    // email.textContent = `E-mail: ${allData.email}`;
    email.href = `mailto: ${allData.email}`;
    email.textContent = allData.email;

    bio.textContent = allData.bio;
    avatarImg.src = allData.avatar_url;
    avatarImg.alt = allData.name + " avatar foto";

}

fetchFunction();