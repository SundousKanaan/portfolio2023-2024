const API_URL = "https://api.github.com/users/SundousKanaan";

export async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log("data", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData(API_URL);

export async function fetchreposData() {
  const API_URL = "https://api.github.com/users/SundousKanaan/repos";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function fetchRepo(repoTitel) {
  const API_URL = `https://api.github.com/repos/SundousKanaan/${repoTitel}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    //   console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function fetchRepoContents(repoTitel, path) {
  const API_URL = `https://api.github.com/repos/SundousKanaan/${repoTitel}/contents/${path}`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}