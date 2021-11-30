console.log("%c HI", "color: firebrick");

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const dropdown = document.querySelector("#breedDropdown");

// Changing the text to blue when clicked
const blueText = (e) => {
  e.addEventListener("click", () => {
    e.style.color !== "blue" ? (e.style.color = "blue") : (e.style.color = "");
  });
};

//Renders images and appends to the div element
const renderImage = (obj, query) => {
  const imgContainer = document.querySelector(query);
  obj.message.forEach((data) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = data;
    div.append(img);
    imgContainer.append(div);
  });
};

//Images of dogs from api
fetch(imgUrl)
  .then((res) => res.json())
  .then((obj) => {
    renderImage(obj, "div#dog-image-container");
  })
  .catch((error) => {
    console.log(error.message);
  });

fetch(breedUrl)
  .then((res) => res.json())
  .then((obj) => {
    let ul = document.querySelector("ul#dog-breeds");
    let breeds = JSON.stringify(obj.message);
    let dogBreedsSplits = breeds.split(",");

    //Creates the empty li adds textContent and appends to the ul
    const dogList = dogBreedsSplits.map((breed) => {
      let li = document.createElement("li");
      li.textContent = breed;
      li.className = li.innerText[1]; //creates classname using their first letter for dropdown filtering
      ul.append(li);
      li.style.display = "none";
      blueText(li);
      return li;
    });

    dropdown.addEventListener("change", () => {
      dogList.forEach((dog) => {
        dog.style.display = "none";
        if (dropdown.value === dog.className) {
          dog.style.display = "";
        }
      });
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

/*
=======================
dropdown menu
=======================

Elements should be initialized to be hidden when page loads

if *option.value* === li.innerText[1] ~~~ Show the element.
*/

//li.className === dropdown[0].value

// if (dropdown.value == li.className) {
//   li.hidden = false;
// }
