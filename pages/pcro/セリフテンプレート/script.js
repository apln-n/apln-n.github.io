/*
     シーザー暗号(雑)
     参考: https://www.du-soleil.com/entry/caesar-crypt
*/
const SuperStrongMagicNumber = 1;
const caesar = (str,flag) => {
    //URLから読み取ったimgが元からhttp(s)形式であった場合
    if(!flag && str.match(/https?/)){
        return str;
    }
    //そうでない場合
    else{
        let newstr = "";
        if(flag){
            for(let i=0;i<str.length;i++){
                newstr += String.fromCharCode(str.charCodeAt(i) + ((i%2==0)? +SuperStrongMagicNumber: -SuperStrongMagicNumber));
            }
        }else{
            for(let i=0;i<str.length;i++){
                newstr += String.fromCharCode(str.charCodeAt(i) + ((i%2==0)? -SuperStrongMagicNumber: +SuperStrongMagicNumber));
            }
        }
        //String.fromCharCode(val.charCodeAt(i) + key);
        console.log("シーザー暗号\n"+ str + "\n->\n" + newstr)
        return newstr;
    }
};

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
    const imgTmp = params.get('img');
    const name = params.get('name');
    const line = params.get('line');
    if(imgTmp){
        const img = caesar(imgTmp,false)
        //上記から流用などから流用
        if(img.match(/https?/)){
            const imgNoQuery = img.split('?')[0];
            const imgElement = document.querySelector(".avatar-display > img.display");
            imgElement.src = imgNoQuery;
            imgElement.onload = () => {
                console.log("img = "+imgNoQuery);
                document.querySelector(".avatar-display > label").textContent = "";
            }
        }
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
    console.log(img)
    if(img.match(/https?/)){
        const imgNoQuery = img.split('?')[0];
        document.querySelector(".avatar-display > img.display").src = imgNoQuery;
    }
})

// 現在のテンプレートをURLとしてクリップボードにコピー
document.querySelector(".container2 > .imgURL > table > tbody > tr > td.class2 > input.noencrypt").addEventListener('click', ()=>{
    //let url = window.location.href.split('?')[0];
    let url = "https://apln-n.github.io/pages/pcro/%E3%82%BB%E3%83%AA%E3%83%95%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88/index2.html"
    const img = document.querySelector(".avatar-display > img.display").src;
    const name = document.querySelector(".name > input").value;
    //なぜかtextContentでは取得できない
    const line = document.querySelector(".container > label.line > textarea").value;

    const newurl = () => {
        url += "?";
        if(img.match(/https?/)){
            console.log("img = " + img);
            console.log("img ok");
            url += "img=" + caesar(img,true);
        }else{
            console.log("img no");
        }
        if(name){
            url += "&name=" + name;
        }
        if(line){
            url += "&line=" + line;
        }
        return url;
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


