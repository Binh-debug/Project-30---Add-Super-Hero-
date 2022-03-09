const formSuperHero = document.querySelector(".form-superhero");
const listContainSuperHero = document.querySelector(".list-superhero__contain");

// ------------------------------------- Class -------------------------------------
class SuperHero {
  constructor(superHeroName, superHeroUniverse, superHeroPower) {
    this.superheroName = superHeroName;
    this.superheroUniverse = superHeroUniverse;
    this.superheroPower = superHeroPower;
  }
}

class methodSuperHero {
  // ------------------------------------- Add super hero error-------------------------------------
  addSuperHeroError() {
    const validator = document.querySelector(".validator__error");
    validator.classList.add("show");
    setTimeout(() => {
      validator.classList.remove("show");
    }, 1500);
  }
  //   ------------------------------------- Add super Hero Success-------------------------------------
  addSuperHeroSuccess() {
    const validator = document.querySelector(".validator__success");
    validator.classList.add("show");
    setTimeout(() => {
      validator.classList.remove("show");
    }, 1500);
  }
  // -------------------------------------Clear Input-------------------------------------
  clearInput() {
    [
      document.querySelector("#name").value,
      document.querySelector("#universe").value,
      document.querySelector("#power").value,
    ] = ["", "", ""];
  }
  // -------------------------------------Add super hero to list-------------------------------------
  addSuperHeroToList(superHeros) {
    const listContainSuperHero = document.querySelector(
      ".list-superhero__contain"
    );
    const ul = document.createElement("ul");
    ul.setAttribute("id", "list");
    ul.innerHTML = `
    <li>${superHeros.superheroName}</li>
    <li>${superHeros.superheroUniverse}</li>
    <li>${superHeros.superheroPower}</li>
    <li><i class="fa-solid fa-trash"></i></li>
    `;
    listContainSuperHero.appendChild(ul);
  }
}

class StoreSuperHero {
  static getSuperHero() {
    let getData;
    if (localStorage.getItem("super-heros") == null) {
      getData = [];
    } else {
      getData = JSON.parse(localStorage.getItem("super-heros"));
    }

    return getData;
  }
  static setSuperHero(entry) {
    let listData = StoreSuperHero.getSuperHero();
    listData.push(entry);
    localStorage.setItem("super-heros", JSON.stringify(listData));
  }
  static displaySuperHero() {
    let listData = StoreSuperHero.getSuperHero();
    listData.forEach((superhero) => {
      const list = new methodSuperHero();
      list.addSuperHeroToList(superhero);
    });
  }
  static removeSuperHero(item) {
    let listData = StoreSuperHero.getSuperHero();
    listData.forEach((superhero, index) => {
      if (item === superhero.superheroName) {
        listData.splice(index, 1);
      }
    });
    localStorage.setItem("super-heros", JSON.stringify(listData));
  }
}

// -------------------------------------Event -------------------------------------
document.addEventListener(
  "DOMContentLoaded",
  StoreSuperHero.displaySuperHero()
);
formSuperHero.addEventListener("submit", function (e) {
  e.preventDefault();
  let [superHeroName, superHeroUniverse, superHeroPower] = [
    document.querySelector("#name").value,
    document.querySelector("#universe").value,
    document.querySelector("#power").value,
  ];
  // -------------------------------------Create obj super hero -------------------------------------

  let superHeros = new SuperHero(
    superHeroName,
    superHeroUniverse,
    superHeroPower
  );
  // -------------------------------------create method super hero -------------------------------------

  let action = new methodSuperHero();

  if (
    superHeroName === "" ||
    superHeroUniverse === "" ||
    superHeroPower === ""
  ) {
    action.addSuperHeroError();
  } else {
    action.addSuperHeroSuccess();
    action.addSuperHeroToList(superHeros);
    action.clearInput();

    StoreSuperHero.setSuperHero(superHeros);
  }
});

listContainSuperHero.addEventListener("click", (e) => {
  if (e.target.className === "fa-solid fa-trash") {
    let trash = e.target.parentNode.parentNode;

    let clicked =
      e.target.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.innerText;

    StoreSuperHero.removeSuperHero(clicked);

    trash.remove();
  }
});
