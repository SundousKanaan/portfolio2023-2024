
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

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

// loading state ===========================================================================

const loadingScreen = document.querySelector("body > div.loading")

setTimeout(() => {
    loadingScreen.classList.remove("loading")
}, 2500);


// skils circels (mobile size) ===========================================================================

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
                if (clockCounter <= 25) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[2]) {
                if (clockCounter <= 30) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[3]) {
                if (clockCounter <= 45) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (clockCounter <= 35) {
                circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                clockCounter++;
            }
            if (clockCounter === 100) {
                clearInterval(countDownInt);
            }
        }
    };
    // // handle clicking on the clock
    // countDownInt = setInterval(countDown, 60);

    // Start de countdown na een vertraging van 2 seconden
    setTimeout(() => {
        countDownInt = setInterval(countDown, 60);
    }, 1600);
};

// call the function when the page is loaded
window.addEventListener("load", runCountdown);

// git my data from gihub ===========================================================================
const API_URL = "https://api.github.com/users/SundousKanaan";
const repos_URL = "https://api.github.com/users/SundousKanaan/repos";


async function fetchData(link) {
    try {
        console.log("hi fetch");
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

    h1Element.textContent = allData.name;
    location.textContent = allData.location;

    company.textContent = allData.company;

    bio.textContent = allData.bio;
    avatarImg.src = allData.avatar_url;
    avatarImg.alt = allData.name + " avatar foto";
}

fetchFunction();


// projects ===========================================================================


const reposData = [];
const projectList = document.querySelector("main>div>article:nth-of-type(2) ul")

async function fetchRepos() {
    const allData = await fetchData(repos_URL);
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

    makeProject(reposData);

    return reposData;
}

const topRepos = ["TiltShift"]
function makeProject(reposData) {
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

                <div class="desktop-version">
                <img src="./projectsimages/${reposData[i].name}.png" alt="project ${reposData[i].name} foto">
                </div>
                <button>${reposData[i].name} </button>
                `
        // <a href="${reposData[i].site}" target="display-repo-frame" > ${reposData[i].name} </a>
        projectList.appendChild(liElement)

        // const projectButtons = document.querySelectorAll("main > div > article:nth-of-type(2) ul li > button")
        // projectsButtons.push(projectButton)

        if (topRepos.includes(reposData[i].name)) {
            liElement.classList.add("GDA");
        }
    }
}

gitProjectsButtons();

async function gitProjectsButtons() {
    await fetchRepos();
    const screen = document.querySelector("main>div>article:nth-of-type(2)>div")
    const projectsButtons = document.querySelectorAll("main > div > article:nth-of-type(2) ul li > button");

    for (let i = 0; i < projectsButtons.length; i++) {
        projectsButtons[i].addEventListener("click", async () => {
            console.log(projectsButtons[i]);
            screen.classList.add("projectOpen");
            let repoName = projectsButtons[i].textContent;
            const repo_URL = `https://api.github.com/repos/SundousKanaan/${repoName}`
            const repoData = await fetchData(repo_URL)
            console.log("reposData", repoData);
            console.log("test", projectsButtons[i].textContent);

            screen.innerHTML = `
            <section>
                <h3>${repoData.name}</h3>
                <a href="${repoData.html_url}">repo ></a>
                <a href="${repoData.homepage}">site ></a>
                <img src="./projectsimages/${repoData.name}.png" alt="project ${reposData.name} foto">
            </section>
            `
        })
    }

}

// UX/UI ===========================================================================

const uxList = document.querySelector("main>div>article:nth-of-type(3) ul")
const uxfiles = [{
    name: "G-Book",
    link: "gbook",
    image: "g-book.png",
    description: "Program for multiple devices to learn how to draw manga characters. An application that can make drawing a Manga character easier for novice artists."
},
{
    name: "MAAS",
    link: "maas",
    image: "maas.png",
    description: "Studying the product (coffee maker from MAS), studying the problems of users, and providing advice to improve the product in the form of an A3 poster."
},
{
    name: "YAE",
    link: "yae",
    image: "yae.png",
    description: "The task was to create an experience for young visitors between the ages of 7 and 12 to Artis Park in Amsterdam. Where they can roam in the park without relying on their parents to guide them."
},
{
    name: "NOTED",
    link: "noted",
    image: "noted.jpg",
    description: "I worked on this project independently and felt nervous at first, but everything went well. It took me a lot of time to write the code properly due to learning it in another subject simultaneously."
}
    ,
{
    name: "Playful-depth",
    link: "playful-depth",
    image: "Playful-depth.png",
    description: "After studying the style and characteristics of a designer, I have to build a conceptual design for him that shows his work, style, and information about him in an interactive way."
}
    ,
{
    name: "Plog de dag",
    link: "plogdedag",
    image: "plogdedag.png",
    description: "Design a responsive one-page website for the Plog de dag campaign in the house style of the Municipality of Rotterdam, incorporating the various functions and the supplied content."
}
]

function makeUXCards() {
    for (let i = 0; i < uxfiles.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = `
                 <h3>${uxfiles[i].name}</h3>
                 <img src="./UXimages/${uxfiles[i].image}" alt="${uxfiles[i].name} foto">
                 <button></button>
    
                <section>
                    <p>${uxfiles[i].description}</p>
                    <button></button>
                    <a href="./uxprojects/${uxfiles[i].link}.html" target="display-frame" >Details</a>
                </section>
                <a href="./uxprojects/${uxfiles[i].link}.html" target="display-frame" >${uxfiles[i].name}</a>
            `
        uxList.appendChild(li)
    }
}

makeUXCards();

const openCardButtons = document.querySelectorAll("main>div>article:nth-of-type(3) section ul li > button")
const Cards = document.querySelectorAll("main>div>article:nth-of-type(3) section ul li")
const CardsList = document.querySelector("main>div>article:nth-of-type(3) section ul")
const previousCard = document.querySelector("main>div>article:nth-of-type(3) > section > button:nth-of-type(2)");
const nextCard = document.querySelector("main>div>article:nth-of-type(3) > section > button:first-of-type");
const closeCardButtons = document.querySelectorAll("main>div>article:nth-of-type(3) ul li section button")
const detailsButtons = document.querySelectorAll("main>div>article:nth-of-type(3) ul li section a")

const iframeArticle = document.querySelector("main>div>article:nth-of-type(3) > article")
const iframe = document.querySelector("main>div>article:nth-of-type(3) > article iframe")
const closeIframeButton = document.querySelector("main>div>article:nth-of-type(3) > article > button")


for (let i = 0; i < openCardButtons.length; i++) {
    openCardButtons[i].addEventListener("click", () => {
        for (let i = 0; i < openCardButtons.length; i++) {
            if (Cards[i].classList.contains("openCard")) {
                Cards[i].classList.replace("openCard", "closeCard")
            }
        }

        if (Cards[i].classList.contains("closeCard")) {
            Cards[i].classList.replace("closeCard", "openCard")
        } else {

            Cards[i].classList.add("openCard");
        }
    });
}


for (let i = 0; i < closeCardButtons.length; i++) {
    closeCardButtons[i].addEventListener("click", () => {
        Cards[i].classList.remove("openCard");
        Cards[i].classList.add("closeCard");
        for (let i = 0; i < Cards.length; i++) {
            if (!Cards[i].classList.contains("openCard")) {
                iframeArticle.classList.remove("openIframe");
            }
        }
    });
}



for (let i = 0; i < detailsButtons.length; i++) {
    detailsButtons[i].addEventListener("click", () => {
        if (iframe.href !== "") {
            iframeArticle.classList.add("openIframe");
            closeIframeButton.classList.add("openIframe");
        }
        window.scrollTo({
            top: findPosition(iframeArticle),
            behavior: "smooth"
        });
    });
}

function findPosition(element) {
    let currentTop = -30;
    if (element.offsetParent) {
        do {
            currentTop += element.offsetTop;
            element = element.offsetParent;
        } while (element);
    }
    return currentTop;
}

closeIframeButton.addEventListener('click', () => {
    if (iframe.href !== "") {
        iframeArticle.classList.remove("openIframe");
        closeIframeButton.classList.remove("openIframe");

        window.scrollTo({
            top: findPosition(document.getElementById("UX-UI")),
            behavior: "smooth"
        });
    }
})


var currdeg = 0;

previousCard.addEventListener("click", () => {
    rotateCarousel(-60);
});

nextCard.addEventListener("click", () => {
    rotateCarousel(60);
});

function rotateCarousel(degrees) {
    currdeg += degrees;
    CardsList.style.transform = "translateZ(500px) rotateY(" + currdeg + "deg)";
}

// room size

const uxWorks = document.querySelectorAll("main>div>article:nth-of-type(3)>section ul li > a")

for (let i = 0; i < uxWorks.length; i++) {
    uxWorks[i].addEventListener("click", () => {
        iframeArticle.classList.add("projectingStart")
        iframeArticle.classList.add("projecting")

        setTimeout(() => {
            iframeArticle.classList.remove("projecting")
        }, 1500);
    })
}

// the room (larg screens) ===========================================================================

const doorButton = document.querySelector("main>div>article:first-of-type>button:first-of-type")
const lightButton = document.querySelector("main>div>article:first-of-type>button:nth-of-type(2)")
const body = document.querySelector("body")
const lamp = document.querySelector("body > div:last-of-type")

const fore = document.querySelector("body > button:nth-last-of-type(3)")
const back = document.querySelector("body > button:nth-last-of-type(4)")
const leftWall = document.querySelector("body > button:nth-last-of-type(2)")
const rightWall = document.querySelector("body > button:last-of-type")
const roomBox = document.querySelector("main>div")

let translateZ = 80;
let currDegrees = 0;
let currRoomdeg = 0;

fore.addEventListener("click", () => {
    goFore();
});

back.addEventListener("click", () => {
    goBack();
});

const mediaQuery = window.matchMedia('(min-width: 1250px)');
if (mediaQuery.matches) {
    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    if (event.key === "w" || event.key === "W" || event.keyCode == '38') {
        if (translateZ < 100 && translateZ >= 80) {
            goFore();
        }
    }

    if (event.key === "s" || event.key === "S" || event.keyCode == '40') {
        if (translateZ <= 100 && translateZ > 80) {
            goBack();
        }
    }

    if (event.key === "a" || event.key === "A" || event.keyCode == '37') {
        currRoomdeg += -.25;
        rotateRoom(currRoomdeg, translateZ);
    }

    if (event.key === "d" || event.key === "D" || event.keyCode == '39') {
        currRoomdeg += .25;
        rotateRoom(currRoomdeg, translateZ);
    }
}

function goFore() {
    back.classList.remove("hiddenButton")
    lamp.classList.add("hidden")

    translateZ += 5;
    rotateRoom(currDegrees, translateZ);

    if (translateZ >= 100) {
        fore.classList.add("hiddenButton")
    }
}

function goBack() {
    fore.classList.remove("hiddenButton")

    translateZ -= 5;
    rotateRoom(currDegrees, translateZ);

    if (translateZ === 80) {
        back.classList.add("hiddenButton")
        lamp.classList.remove("hidden")
    }
}

rightWall.addEventListener("click", () => {
    currRoomdeg += .25;
    rotateRoom(currRoomdeg, translateZ);
});

leftWall.addEventListener("click", () => {
    currRoomdeg += -.25;
    rotateRoom(currRoomdeg, translateZ);
});

function rotateRoom(currRoomdeg, translateZ) {
    currDegrees = currRoomdeg;
    roomBox.style.transform = `translateZ(${translateZ}vmin) rotateY(${currRoomdeg}turn)`;
}

doorButton.addEventListener('click', (e) => {
    if (confirm("Do you want to close the window and go to the repo?")) {
        close();
        window.location = 'https://github.com/SundousKanaan/portfolio2023';
    }
});

lightButton.addEventListener("click", () => {
    if (body.classList.contains("darkmode")) {
        lightButton.classList.remove("darkmode");
        body.classList.remove("darkmode");
        localStorage.setItem("siteMode", "light");
    } else {
        lightButton.classList.add("darkmode");
        body.classList.add("darkmode");
        localStorage.setItem("siteMode", "dark");
    }
});

function modeCheck() {
    if (localStorage.getItem("siteMode") === "dark") {
        lightButton.classList.add("darkmode");
        body.classList.add("darkmode");
    } else {
        lightButton.classList.remove("darkmode");
        body.classList.remove("darkmode");
    }
}

window.addEventListener("DOMContentLoaded", modeCheck);



// OBSERVER

const allAnimationItems = document.querySelectorAll('main > div > article')
console.log(allAnimationItems);

const options = {
    threshold: .1
}

function callbackFunction(entries) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            entry.target.classList.add('appear');
        }
    })
}
const observer = new IntersectionObserver(callbackFunction, options)
allAnimationItems.forEach(item => {
    observer.observe(item)
})
