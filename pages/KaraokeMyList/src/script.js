/*
    参考:
    https://qiita.com/twrcd1227/items/d3f8db42235d70d24bf7
    https://www.alta.co.jp/blog/post-9276/
*/

const dummyData = [
    [249,"ディナーベル","はるまきごはん feat.初音ミク","J.","D.","-"],
    [248,"テルーの唄","手嶌葵","J.","D.","-"],
    [247,"レイニーブーツ","稲葉曇 feat.歌愛ユキ","","D.","O"],
]

function LinkedData(data) {
    for(let i=0;i<data.length;i++){
        if("J.?".includes(data[i][3]) && data[i][3].includes("J")){
            data[i][3] = '<a href="https://www.joysound.com/web/search/song?cts008=1&match=1&keyword='+data[i][1]+'" target="_blank">'+data[i][3]+'</a>'
        }
        if("D.?".includes(data[i][4]) && data[i][4].includes("D")){
            data[i][4] = '<a href="https://www.clubdam.com/karaokesearch/?type=song&keyword='+data[i][1]+'" target="_blank">'+data[i][4]+'</a>'
        }
    }
    return data;
}

async function getData() {
    const response = await fetch('./result.csv');
    const text = await response.text();
    return await text.trim().split('\n').map(line => line.split(',').map(x => x.trim()));
}
async function loadCSVData() {
    getData().then(data => {
        // オプションの設定
        const tableOptions = {
            // テーブルの内身を設定
            "data": LinkedData(data.slice(1)),
            //"data": LinkedData(dummyData),
            "language": {
                "url": "https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
            },
            "info": true,
            "displayLength": 50,
            "lengthMenu": [10,20,50,100,1000],
            "order":[
                [0, "desc"]
            ],
            "pagingType": "simple_numbers",
            "searching": true,
            "scrollX": true,
        } 
        $("#app").DataTable(tableOptions);
    })
}
  
loadCSVData();