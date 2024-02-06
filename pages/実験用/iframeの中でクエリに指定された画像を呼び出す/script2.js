const getImg = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const imgURL = params.get('img')
    if(imgURL){
        document.querySelector(".wrapper > .container > img").src = imgURL;
    }
    return;
}

getImg();