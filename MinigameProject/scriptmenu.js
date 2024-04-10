const game1=document.querySelector(".card1")
const game2=document.querySelector(".card2")
const game3=document.querySelector(".card3")
const texts=document.querySelectorAll(".text")
const h1=document.querySelector("h1")

const games = [game1,game2,game3]

for (let index = 0; index < games.length; index++) {
    games[index].addEventListener("click", (event) =>{
        location.href=`./games/game${index+1}.html`
    })
}
fetch("menu.php")
.then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
})
.then(data => {
    dataelements=[data.jrk, data.hsze, data.cld]
    for (let i = 0; i < texts.length; i++) {
        texts[i].innerHTML+=`<p>Legjobb elért pontszám: ${dataelements[i]}</p>`
    }
    h1.innerHTML=`Üdvözlöm, ${data.username}`
})
.catch(error => console.log(error))
