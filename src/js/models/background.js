const dog_url = "https://dog.ceo/api/breeds/image/random";
const cat_url = "https://api.thecatapi.com/v1/images/search";
const CAT_API_KEY =
  "live_p5UXl1uwvi9e1bBMg2XIug7CY7f79Ijhbc6x8d5uRzxP7CL8hfK5EtDgl8Pm3xZf";

async function getDog(page = 1) {
  const response = await fetch(`${dog_url}/${page}`);
  const data = await response.json();
  return data.message;
}

async function getCat(page = 1) {
  const response = await fetch(
    `${cat_url}?api_key=${CAT_API_KEY}&limit=${page}`
  );
  const data = await response.json();
  return data;
}

async function setBackground() {
  function drawImage(res) {
    const dogs = res[0];
    const cats = res[1];
    const background = document.querySelector(".background");
    const urls = [];
    for (let i = 0; i < dogs.length + cats.length; i += 1) {
      urls.push(i % 2 ? dogs[Math.floor(i / 2)] : cats[Math.floor(i / 2)].url);
    }

    urls.forEach((url) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      background.appendChild(div);
      img.src = url;
      div.appendChild(img);
    });
  }

  const allData = Promise.all([getDog(3), getCat(3)]).then(drawImage);
}

setBackground();
