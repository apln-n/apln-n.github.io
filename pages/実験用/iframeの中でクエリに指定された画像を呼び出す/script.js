//ベースとなるURL
const url = "index2.html";

const buttonPressed = () => {
    const imgURL = document.querySelector(".wrapper > .container > div > p > input.imgURL").value;
    console.log(imgURL);
    const iframe = document.querySelector(".wrapper > .container > div.div2 > iframe");
    iframe.src = url + "?img=" + imgURL;
}

document.querySelector(".wrapper > .container > div > p > input.button").addEventListener("click", ()=>{
    buttonPressed();
});
document.querySelector(".wrapper > .container > div > p > input.imgURL").addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        buttonPressed();
    }
});