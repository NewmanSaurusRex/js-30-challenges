const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint) //fetch doesn't know what to do with this data...yet//
  .then((siftThrough) => siftThrough.json())
  .then((data) => cities.push(...data));

function findMatch(wordMatch, cities) {
  //need to find out if city/state matches search//
  return cities.filter((place) => {
    const regex = new RegExp(wordMatch, "gi"); //g means global and i means not case sensitive!//
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatch() {
  let matchArray = findMatch(this.value, cities);
  let html = matchArray
    .map((place) => {
      let regex = new RegExp(this.value, "gi");
      let cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      let stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li> <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
    })
    .join(""); //get data first!
  suggestions.innerHTML = html;
}

let searchInput = document.querySelector(".search");
let suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", findMatch);
searchInput.addEventListener("keyup", displayMatch);
