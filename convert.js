const fs = require('fs');
const jsonObj = JSON.parse(fs.readFileSync('./pokemon.json', 'utf8'));
const jsonObj2 = JSON.parse(fs.readFileSync('./poke_move.json', 'utf8'));
//const jsonObj = require("./pokemon.json")
//const jsonObj2 = require("./poke_move.json")
for (let i = 0; i < jsonObj.length; i++) {
    let name = jsonObj[i].name
    let addList = []
    for (let j = 0; j < jsonObj2.length; j++){
        let p_name = jsonObj2[j].p_name
        if (name === p_name) {
            (async () => {
                await addmove(jsonObj2[j], addList)
            })();
        }
    }
    jsonObj[i].move = addList
    console.log(JSON.stringify(jsonObj[i],null,2))
}

async function addmove(jsonObj, array) {
    delete jsonObj.p_name
    jsonObj.m_power = parseInt(jsonObj.m_power)
    jsonObj.m_acc = parseInt(jsonObj.m_acc)
    jsonObj.m_pp = parseInt(jsonObj.m_pp)
    array.push(jsonObj)
    return array
}