/*
    参考:
    https://qiita.com/twrcd1227/items/d3f8db42235d70d24bf7
    https://www.alta.co.jp/blog/post-9276/
*/
async function loadCSVData() {
    const response = await fetch('result.csv');
    const text = await response.text();
    const data = text.trim().split('\n').map(line => line.split(',').map(x => x.trim()));
    // オプションの設定
    const tableOptions = {
        // テーブルの内身を設定
        "data": data.slice(1),
        "language": {
            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Japanese.json"
        },
        "info": true
    } 
    $("#app").DataTable(tableOptions);
  }
  
  loadCSVData();

