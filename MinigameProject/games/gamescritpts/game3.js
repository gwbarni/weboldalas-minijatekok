const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.querySelector('h2');
const startButton = document.getElementById('startButton');

let score = 0;
let timer;

function generateGrid() {
    const newElement = document.createElement("div");
    newElement.innerHTML = `<div><img src="./gameimages/game3content/crosshair.png" width="100 %px"></div>`;
    newElement.classList.add("element");
  
    const randomColumn = Math.floor(Math.random() * 3) + 1;
    const randomrow = Math.floor(Math.random() * 3) + 1;
    newElement.style.gridColumn = `${randomColumn} / span 1`;
    newElement.style.gridRow = `${randomrow} / span 1`;
      
    newElement.addEventListener("click", () => {
    newElement.remove();
    score++;
    scoreDisplay.innerHTML = `Pontszám: ${score}`;
    });
  
    const randomTime = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
    gridContainer.appendChild(newElement);
    setTimeout(() => {
        newElement.remove();
    }, Math.floor(Math.random() * 600) + 500);
    }, randomTime);
}


startButton.addEventListener('click', ()=>{
    const interval = setInterval(() => {
        generateGrid() 
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
                 id:"3"
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
         score = 0;
         scoreboard.innerHTML = `Pontszám: `;
       }, 60000);
});