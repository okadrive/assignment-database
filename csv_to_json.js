const csv=require("csvtojson")
const program=require('commander')
const fs=require('fs')

program
    .version('0.0.1')
    .option(
        '-c, --conv',
        'csv input from <filepath> and outputs output.json'
    )
    .parse(process.argv);

if(program.conv) {
    const csvFilePath = program.args[0];
    (async () => {
        const jsonObj = await csv().fromFile(csvFilePath);
        console.log(jsonObj)
        fs.writeFileSync(
            './output.json',
            JSON.stringify(jsonObj, null, 2)
        );
    })();
}