const uName=document.querySelector("#username");
const pWord=document.querySelector("#password");
const email=document.querySelector("#email");
const registBtm=document.querySelector("#regist");
const popup = document.getElementById("popupusername");
const popup2 = document.getElementById("popuppassword")
const popup3 = document.getElementById("popupemail")
const closeBtn = document.querySelectorAll(".closeBtn");

const filledCheck = ()=>{
    if (uName.value==="") {return "username"}
    if (email.value==="") {return "email"}
    if (pWord.value==="") {return "password"}
    return "filled"
}

registBtm.addEventListener("click",()=>{
    if (filledCheck()==="username") {
        popup.style.display = "flex";
        return
    }
    if (filledCheck()==="password") {
        popup2.style.display = "flex";
        return
    }
    else{
    fetch("./regist.php", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(
            {username:uName.value,
            email:email.value,
            password:pWord.value})
        })
    .then(response => {
        if (!response.ok) {throw new Error("Network response was not ok")}
        return response.json();
    })
    .then(data => {
        if(data.errorCode==0)
        {
            location.href="login.html"
        }
        else
        {
            alert(`${data.errorMessage}`)
        }
    })
    }
});
closeBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        popup.style.display = "none";
        popup2.style.display = "none";
        popup3.style.display = "none";
        // console.log("clicked");
    });
});