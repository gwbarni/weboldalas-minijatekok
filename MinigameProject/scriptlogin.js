const uName=document.querySelector("#username");
const pWord=document.querySelector("#password");
const loginBtn=document.querySelector("#loginBtn");
const popup = document.getElementById("popupusername");
const popup2 = document.getElementById("popuppassword")
const closeBtn = document.querySelectorAll(".closeBtn");
const h2 = document.querySelector("h2");

const filledCheck = ()=>{
    if (uName.value==="") {return "username"}
    if (pWord.value==="") {return "password"}
    return "filled"
}

loginBtn.addEventListener("click",()=>{
    if (filledCheck()==="username") {
        popup.style.display = "flex";
        return
    }
    if (filledCheck()==="password") {
        popup2.style.display = "flex";
        return
    }
    else{
    fetch("./login.php", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(
            {username:uName.value,
            password:pWord.value})
        })
    .then(response => {
        if (!response.ok) {throw new Error("Network response was not ok")}
        return response.json();
    })
    .then(data => {
        if(data.errorCode==0){
            location.href="./menu.html";
        }
        else{
            h2.innerHTML="Sikertelen bejelentkezés";
        }
    })
    }
});
closeBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        popup.style.display = "none";
        popup2.style.display = "none";
    });
});