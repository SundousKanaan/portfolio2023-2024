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
    let circles = document.querySelectorAll(".clock svg circle:nth-of-type(2)");
    let clockCounter = 0;
    let countDownInt;

    const countDown = () => {
        for (let i = 0; i < circles.length; i++) {
            if (circles[i] === circles[0]) {
                if (clockCounter <= 40) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[1]) {
                if (clockCounter <= 15) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[2]) {
                if (clockCounter <= 20) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[3]) {
                if (clockCounter <= 45) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (clockCounter <= 25) {
                circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                clockCounter++;
            }
            if (clockCounter === 100) {
                clearInterval(countDownInt);
            }
        }
    };
    // handle clicking on the clock
    countDownInt = setInterval(countDown, 60);
};

// call the function when the page is loaded
window.addEventListener("load", runCountdown);


const API_URL = "https://api.github.com/users/SundousKanaan";
const repos_URL = "https://api.github.com/users/SundousKanaan/repos";
// const titelsAPI_URL = `https://api.github.com/repos/SundousKanaan/${repoTitel}`;

async function fetchData(link) {
    try {
        const response = await fetch(link);
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


// projects


const reposData = [];
const projectList = document.querySelector("main>div>article:nth-of-type(2) ul")

async function fetchRepos() {
    const allData = await fetchData(repos_URL);
    // console.log(allData);

    for (let i = 0; i < allData.length; i++) {
        if (allData[i].stargazers_count === 1) {
            const languages_URL = `https://api.github.com/repos/SundousKanaan/${allData[i].name}/languages`;
            const languagesData = await fetchData(languages_URL);
            reposData.push({
                name: allData[i].name,
                repo: allData[i].html_url,
                languages: Object.keys(languagesData),
                site: allData[i].homepage,
                description: allData[i].description
            });
        }
    }
    // console.log(reposData);

    makeProject(reposData);
}

fetchRepos();

const topRepos = ["TiltShift"]
async function makeProject(reposData) {

    for (let i = 0; i < reposData.length; i++) {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
            <div>
                <h3>${reposData[i].name}</h3>
                <img src="./projectsimages/${reposData[i].name}.png" alt="project ${reposData[i].name} foto">
            </div>
            <section>
                <p>${reposData[i].description}</p>
                <p>Project languages: ${reposData[i].languages}</p>
                <div>
                <a href="${reposData[i].repo}" target="_blank">To repo</a>
                <a href="${reposData[i].site}" target="_blank">To site</a>
                </div>
            </section>
        `

        liElement.tabIndex = 6;
        projectList.appendChild(liElement)

        if (topRepos.includes(reposData[i].name)) {
            liElement.classList.add("GDA");
        }
    }

}


// UX/UI

const uxList = document.querySelector("main>div>article:nth-of-type(3) ul")

function none() {
    for (let i = 0; i < 3; i++) {
        const li = document.createElement("li")
        li.innerHTML = `
             <h3>work name</h3>
             <img src="./projectsimages/BusinessCard.png" alt="">
        
            <section>
                <p>Description</p>
                <button>Details</button>
                <a href="">prototype</a>
            </section>
        `
        uxList.appendChild(li)
    }
    console.log("hi", uxList);
}

none();

const uxListEtems = document.querySelectorAll("main>div>article:nth-of-type(3) ul li")
console.log("NN", uxListEtems[0]);


for (let i = 0; i < uxListEtems.length; i++) {
    uxListEtems[i].addEventListener("click", () => {
        if (uxListEtems[i].classList.contains("closeCard")) {
            uxListEtems[i].classList.remove("closeCard");
            uxListEtems[i].classList.add("openCard");
        }
        else if (uxListEtems[i].classList.contains("openCard")) {
            uxListEtems[i].classList.remove("openCard");
            uxListEtems[i].classList.add("closeCard");
        }
        else {
            uxListEtems[i].classList.add("openCard");
        }
    });
}


const Gbook =
{
    name: "G-Book",
    image: "logo.jpg",
    project: "The present study is focused on the design of a multi-device experience for a specific activity. The approach involves setting user goals before, during, and after the activity, and selecting the most appropriate device for each stage. The aim of the study is to create a seamless and intuitive multi-device experience for users. In order to achieve this goal, a topic related to multi-device experiences will be chosen within the next three weeks, and the necessary functionalities and interactions will be developed gradually to create a detailed screen flow. The study is expected to contribute to the field of multi-device experiences by presenting a comprehensive approach that addresses the user's needs at each stage of the activity, and by providing a practical example of how to design a seamless and intuitive multi-device experience.",
    idee: "Program to learn how to draw manga characters. An app that can make drawing a Manga character easier for the beginner artists, who want to learn but also create their own positions for their original characters. My focus is on the beginner artists to learn how to draw a manga character, because it is a different style from the other styles.",
    ideeSketch_img: "gbook-storyboard.jpg",
    Scenario_imgs: [
        "gbook-scenario.jpg",
        "gbook-user-requirements.jpg"
    ],
    screenflows_imgs: [
        "gbook-jobstory1.jpg",
        "gbook-jobstory2.jpg",
        "gbook-jobstory3.jpg"
    ],
    Wireflow_img: "gbook-wireflow.jpg",
    fullScreenflow_img: "gbook-screenflow.jpg",
    site: "https://miro.com/app/board/uXjVOT0ccLU=/?invite_link_id=762314940213"
}


const MAAS = {
    name: "MAAS ",
    project: "A UX Designer is responsible for the development of a product's design, usability, and function, with a focus on the user's experience. They oversee the entire user journey and identify new opportunities for the product and the company, while also potentially contributing to branding and marketing efforts.",
    idee: "The goal of this mission was to improve the user experience with MAAS coffee machines by doing research on the machine, but also the different coffee or tea moments and alternatives and to make a final poster for the main points of the research.",
    study: [
        "After some user testing, watching interviews and doing some research I found ten solutions to our user problems and made lo-fi sketches for them.",
        "uxdesign-schetsen.jpg"
    ],
    advice_imgs: [
        "uxdesign-oplossing0.jpg",
        "uxdesign-oplossing1.jpg",
        "uxdesign-oplossing2.jpg",
        "uxdesign-oplossing3.jpg",
        "uxdesign-oplossing4.jpg",
        "uxdesign-oplossing5.jpg"
    ],
    post: "uxdesign-Poster.jpg"
}