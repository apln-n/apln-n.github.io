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

// クエリにパラメータがある場合、それをセリフテンプレートに反映
const getParam = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const img = params.get('img');
    const name = params.get('name');
    const line = params.get('line');
    if(img){
        //上記から流用
        document.querySelector(".avatar-display > img.display").src = img;
        document.querySelector(".avatar-display > label").textContent = "";
    }
    if(name){
        document.querySelector(".name > input").value = name;
        document.querySelector(".line > div").textContent = name;
    }
    if(line){
        document.querySelector(".line > textarea").textContent = line;
    }
    return;
}
getParam();

// 画像URLをテンプレートの画像として設定
document.querySelector(".container2 > .imgURL > table > tbody > tr > td.class1 > input.button1").addEventListener('click', ()=>{
    const img = document.querySelector(".container2 > .imgURL > table > tbody > tr > td.class1 > input.imgURLInput").value;
    const imgNoQuery = img.split('?')[0];
    document.querySelector(".avatar-display > img.display").src = imgNoQuery;
})

// 現在のテンプレートをURLとしてクリップボードにコピー
document.querySelector(".container2 > .imgURL > table > tbody > tr > td.class2 > input.button2").addEventListener('click', ()=>{
    const url = window.location.href.split('?')[0];
    const img = document.querySelector(".avatar-display > img.display").src;
    const name = document.querySelector(".name > input").value;
    //なぜかtextareaでは取得できない
    const line = document.querySelector(".container > label.line > textarea").value;

    const newurl = () => {
        if(img.match(/https?/)){
            console.log("img = " + img);
            console.log("img ok");
            return url + "?img=" + img + "&name=" + name + "&line=" + line;           
        }else{
            console.log("img no");
            return url + "?name=" + name + "&line=" + line;
        }
    }
    /*
        クリップボードにコピー
        参考: https://tech.arms-soft.co.jp/entry/2022/07/27/090000
    */
    if (navigator.clipboard) {
        navigator.clipboard.writeText(newurl());
    }else{
        const hidden = document.getElementById("hidden");
        hidden.value = newurl();
        hidden.select();
        document.execCommand('copy')
    }
})