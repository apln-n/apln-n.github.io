with open("data.txt", "r", encoding='UTF-8') as fd:
    with open("result.json", "w", encoding="utf-8") as fr:
        data = fd.readlines()
        #ここでtabの長さを調節する
        tab = '\t'*5
        fr.write("{\n")
        for row in data:
            li_tmp = row.split("\t")
            if(len(li_tmp)>=2):
                li = [li_tmp[0], *(li_tmp[1].replace("，",",").replace(".",",").replace("、",",").replace("(","").replace(")","").replace("（","").replace("）","").split(",")) ]
                #print(len(li))
                if(len(li)==3):
                    fr.write(tab+'"'+li[0]+'": {"x":'+li[1]+', "y":'+li[2]+'},\n')
        fr.write("}")