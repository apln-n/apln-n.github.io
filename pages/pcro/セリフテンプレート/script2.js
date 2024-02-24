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
                // A-Z, a-z, 0-9それぞれを巡回群?としてシーザー暗号的な
                if(str[i].match(/[A-Za-z0-9]/)){
                    const code = str.charCodeAt(i) + ((i%2==0)? +SuperStrongMagicNumber: -SuperStrongMagicNumber);
                    if(str[i].match(/[A-Z]/)){
                        newstr += String.fromCharCode((code - "A".charCodeAt(0) + 26) % 26 + "A".charCodeAt(0))
                    }else if(str[i].match(/[a-z]/)){
                        newstr += String.fromCharCode((code - "a".charCodeAt(0) + 26) % 26 + "a".charCodeAt(0))
                    }else if(str[i].match(/[0-9]/)){
                        newstr += String.fromCharCode((code - "0".charCodeAt(0) + 10) % 10 + "0".charCodeAt(0))
                    }
                }else{
                    newstr += str[i];
                }
            }
        }else{
            for(let i=0;i<str.length;i++){
                // 同様に
                if(str[i].match(/[A-Za-z0-9]/)){
                    const code = str.charCodeAt(i) + ((i%2==0)? -SuperStrongMagicNumber: +SuperStrongMagicNumber);
                    if(str[i].match(/[A-Z]/)){
                        newstr += String.fromCharCode((code - "A".charCodeAt(0) + 26) % 26 + "A".charCodeAt(0))
                    }else if(str[i].match(/[a-z]/)){
                        newstr += String.fromCharCode((code - "a".charCodeAt(0) + 26) % 26 + "a".charCodeAt(0))
                    }else if(str[i].match(/[0-9]/)){
                        newstr += String.fromCharCode((code - "0".charCodeAt(0) + 10) % 10 + "0".charCodeAt(0))
                    }
                }else{
                    newstr += str[i];
                }
            }
        }
        //String.fromCharCode(val.charCodeAt(i) + key);
        console.log("シーザー暗号\n"+ str + "\n->\n" + newstr)
        return newstr;
    }
};

// クエリにパラメータがある場合、それをセリフテンプレートに反映
const getParam = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const imgTmp = params.get('img');
    const name = params.get('name');
    const line = params.get('line');

    const input = document.querySelector(".name > input");
    const textarea = document.querySelector(".line > textarea");

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
