const button = document.querySelector("button");
const container = document.querySelector(".container");
const scoreboard = document.querySelector("#score");
let score = 0;


const spawner = ()=>{
    let randomNumber = Math.floor(Math.random() * 3) + 1;
  
    for (let index = 0; index < randomNumber; index++) {
  
      const newElement = document.createElement("div");
      newElement.innerHTML = `<div><img src="./gameimages/game1content/treasure.png" width="100 %px"></div>`;
      newElement.classList.add("element");
  
      const randomColumn = Math.floor(Math.random() * 6) + 1;
      newElement.style.gridColumn = `${randomColumn} / span 1`;
      newElement.style.gridRow = "1";
      
      newElement.addEventListener("click", () => {
        newElement.remove();
        score++;
        scoreboard.innerHTML = `Pontszám: ${score}`;
      });
  
      const randomTime = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(() => {
        container.appendChild(newElement);
        setTimeout(() => {
          newElement.remove();
        }, 9000);
      }, randomTime);
    }
  }
const reset = ()=>{
    score = 0;
    button.classList.toggle("disappear");
    scoreboard.classList.toggle("disappear");
    scoreboard.innerHTML = `Pontszám: ${score}`;
  }
  
button.addEventListener("click", () => {
    button.classList.toggle("disappear");
    scoreboard.classList.toggle("disappear");
  
    const interval = setInterval(() => {
     spawner() 
    }, 1000)
    setTimeout(() => {
        clearInterval(interval);
        alert(`A játék véget ért. \n Pontszáma: ${score}`)
        fetch("gamehandler.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              score: score,
              id:"1"
          })
         })
      .then(response => {
         if (!response.ok) {
             throw new Error("Hiba a válaszban!");
         }
         return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
        reset()
        container.innerHTML=""
      }, 60000);
  });