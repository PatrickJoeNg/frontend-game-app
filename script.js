const APILINK =
  "http://www.giantbomb.com/api/games/?api_key=dde1f15f713d0e05792b5bd9abea4acf0d8a6e2b&format=json&resources=game&limit=10&sort=field:desc";

const IMG_PATH =
  "http://www.giantbomb.com/api/games/?api_key=dde1f15f713d0e05792b5bd9abea4acf0d8a6e2b&format=json&field_list=image";

const SEARCHAPI =
  "http://www.giantbomb.com/api/search/?api_key=dde1f15f713d0e05792b5bd9abea4acf0d8a6e2b&format=json&resources=game&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const aboutBtn = document.getElementById("aboutBtn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
const homeBtn = document.querySelector(".titleHeader");

returnGames(APILINK);

function returnGames(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      //console.log(data.results);
      data.results.forEach((element) => {
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_row = document.createElement("div");
        div_row.setAttribute("class", "row");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const gameImage = document.createElement("img");
        gameImage.setAttribute("class", "thumbnail");
        gameImage.setAttribute("id", "image");

        const gameName = document.createElement("h3");
        gameName.setAttribute("id", "name");

        const moreInfo = document.createElement("a");
        moreInfo.setAttribute("class", "more-info");

        gameName.innerHTML = `${element.name}`;
        gameImage.src = element.image["super_url"];
        moreInfo.href = `${element["site_detail_url"]}`;
        moreInfo.target = "_blank";
        moreInfo.innerHTML = `More Info`;
        // console.log(gameImage.src);

        div_card.appendChild(gameImage);
        div_card.appendChild(gameName);
        div_card.appendChild(moreInfo);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const searchItem = search.value;

  if (searchItem) {
    returnGames(SEARCHAPI + searchItem);
    search.value = "";
  }
});

function closeModal() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}
function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}
aboutBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  returnGames(APILINK);
  console.log("this is running");
});
