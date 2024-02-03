/*
    アバター画像の変更
    参考: https://ryjkmr.com/input-typefile-img-display/ 
*/
document.querySelector(".avatar-input > input").addEventListener('change', (e) => {
    const file = e.target.files[0];
    const avatarLabel = document.querySelector(".avatar-display > label");
    const avatarDisplayElement = document.querySelector(".avatar-display > img.display");
    console.log(file)
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        avatarLabel.textContent = ""
        avatarDisplayElement.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
});

// セリフの上の名前を自動的に変更する
document.querySelector(".name > input").addEventListener('input', (e) => {
    document.querySelector(".line > div").textContent = e.target.value;
});
