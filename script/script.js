// import { fetchData } from './modules/fetch.js';

const navButton = document.querySelector("body > button")
const header = document.querySelector("header")

navButton.addEventListener('click', () => {
    if (header.classList.contains("openNav")) {
        header.classList.remove('openNav');
        header.classList.add('closeNav');
        navButton.classList.remove('openNav');
    } else {
        header.classList.add('openNav');
        header.classList.remove('closeNav');
        navButton.classList.add('openNav');
    }
})

// define the function that runs the countdown
const runCountdown = () => {
    // let clock = document.querySelectorAll(".clock");
    let circle = document.querySelectorAll(".clock svg circle:nth-of-type(2)");
    let clockCounter = 100;
    let countDownInt;

    console.log(circle);
    const countDown = () => {
        for (let i = 0; i < circle.length; i++) {
            circle[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
            if (circle[i] === circle[0]) {
                if (clockCounter === 35) {
                    clearInterval(countDownInt);
                };
                // clockCounter--;
                console.log("33",[i]);
            }

            else if (circle[i] === circle[1]) {
                if (clockCounter === 25) {
                    clearInterval(countDownInt);
                };
                // clockCounter--;
                console.log("41",[i]);
            } 
            
            else {
                if (clockCounter === 70) {
                    clearInterval(countDownInt);
                };
                console.log("49",[i]);
            }
            clockCounter--;
        }
    };
    // handle clicking on the clock
    countDownInt = setInterval(countDown, 50);
}

// call the function when the page is loaded
window.addEventListener("load", runCountdown);




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

const avatarImg = document.querySelector("main > div > article:first-of-type > section:first-of-type img");
const h1Element = document.querySelector("main > div > article:first-of-type > section:first-of-type div h1");
const company = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:first-of-type");
const location = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(2)");
const bio = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(3)");
const email = document.querySelector("main > div > article:first-of-type > section:first-of-type div a");

async function fetchFunction() {
    const allData = await fetchData(API_URL);
    // console.log("allData", allData);

    h1Element.textContent = allData.name;
    location.textContent = allData.location;
    email.href = `mailto: ${allData.email}`;
    email.textContent = allData.email;
    company.textContent = allData.company;

    bio.textContent = allData.bio;
    avatarImg.src = allData.avatar_url;
    avatarImg.alt = allData.name + " avatar foto";

}

fetchFunction();