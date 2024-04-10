const card1 = document.querySelector('#card1');
const card2 = document.querySelector('#card2');

const hand =  document.querySelector('#currenthand');

const cardvalue1 = document.querySelector(`#cardvalue1`)
const cardvalue2 = document.querySelector(`#cardvalue2`)

let first1 = true ;
let first2 = true ;
let card1value = 0;
let card2value = 0;
let score = 0 ;

const scorediv = document.querySelector(`.score`)
function gameOver() {
    alert('A játék véget ért!')

    fetch("gamehandler.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            score: score,
            id:"2"
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
    
    cardvalue1.classList.remove('valuedcard');
    cardvalue2.classList.remove('valuedcard');

    card1value = 0;
    card2value = 0;
    score = 0 ;

    cardvalue1.innerHTML = 'Kattintson az első lap<br>kéréséhez!' ;
    cardvalue2.innerHTML = 'Kattintson az első lap<br>kéréséhez!' ;
    hand.innerHTML = '10' ;
    scorediv.innerHTML = `Pontszám: ${score}` ;

    first1 = true ;
    first2 = true ;
}
card1.addEventListener('click',()=>{
    handvalue=Number(hand.innerHTML)
    handvalue += card1value;

    card1value = Math.floor(Math.random() * 19) - 9;
    cardvalue1.innerHTML = card1value;
    cardvalue1.classList.add('valuedcard');

    hand.innerHTML = handvalue.toString() ;

    if (!first1) {
        score++
    }

    first1 = false ;

    scorediv.innerHTML = `Pontszám: ${score}` ;

    if (handvalue < 0 || handvalue > 21) {gameOver()}
})
card2.addEventListener('click',()=>{
    handvalue=Number(hand.innerHTML)
    handvalue += card2value;

    card2value = Math.floor(Math.random() * 19) - 9;
    cardvalue2.innerHTML = card2value;
    cardvalue2.classList.add('valuedcard');

    hand.innerHTML = handvalue.toString() ;

    if (!first2) {
        score++
    }

    first2 = false ;

    scorediv.innerHTML = `Pontszám: ${score}` ;

    if (handvalue < 0 || handvalue > 21) {gameOver()}
})

