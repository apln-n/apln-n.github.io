// クエリにパラメータがある場合、それをセリフテンプレートに反映
const getParam = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const img = params.get('img');
    const name = params.get('name');
    const line = params.get('line');

    const input = document.querySelector(".name > input");
    const textarea = document.querySelector(".line > textarea");

    if(img){
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
        input.value = name;
        document.querySelector(".line > div").textContent = name;
    }
    if(line){
        textarea.textContent = line;
    }
    input.disabled = true;
    textarea.disabled = true;
    return;
}
getParam();
