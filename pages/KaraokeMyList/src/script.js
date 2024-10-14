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

async function getData() {
    const response = await fetch('../result.csv');
    const text = await response.text();
    const data = await text.trim().split('\n').map(line => line.split(',').map(x => x.trim()));
    return await data.slice(1);
}
async function loadCSVData() {
    // オプションの設定
    const tableOptions = {
        // テーブルの内身を設定
        "data": await data.slice(1),
        //"data": dummyData,
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
}
  
loadCSVData();