import { fetchData } from './modules/fetch.js';

let avatarImg = document.querySelector("main > article:first-of-type > section:first-of-type img");
let h1Element = document.querySelector("main > div > article:first-of-type > section:first-of-type div h1");


async function fetchFunction() {
    const allData = await fetchData();
    // console.log("allData", allData);
    console.log("allData", allData.name);

    h1Element.textContent = allData.name;
    avatarImg.src = allData.avatar_url;
    avatarImg.alt = allData.name + " avatar foto";

}

fetchFunction();