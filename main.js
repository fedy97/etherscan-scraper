const dotenv = require('dotenv').config({path: __dirname + '/config.env'});
const eth = require('ethereumjs-util');
const axios = require('axios');
//const sleep = require('sleep');
const moment = require('moment');

let path = process.env.INPUT_PATH || __dirname + "/addresses.txt";
let usePk = process.env.USEPRIVATEKEYS || false;
let output = process.env.OUTPUT_PATH || __dirname + "/";

var fs = require('fs')
    , filename = path;
let addr_list = [];
let total_eth = 0.0;
let total_tokens = 0.0;
let data = null;
//open file with addresses
try {
    data = fs.readFileSync(filename, 'utf8');
} catch (e) {
    console.log("error in opening the file: " + filename);
    return;
}
let pk_list;
if (usePk) {
    pk_list = data.match(/.{64}/g);
    pk_list.forEach(value => {
        const privateKeyBuffer = eth.toBuffer('0x' + value);
        const addr = "0x" + eth.privateToAddress(privateKeyBuffer).toString('hex');
        addr_list.push(addr);
    });
} else {
    //one public address per line
    addr_list = data.match(/.{42}/g);
}

work().then(r => {
    //write a log once finished
    try {
        fs.writeFileSync(output + moment(Date.now()).format('DD-MM-YYYY') + ".txt", JSON.stringify(r));
        console.log("finished!")
    } catch (e) {
        console.log("error in writing the file, maybe you typed the output path incorrectly? -> " + output)
    }
});

//scraper
async function work() {
    let list_map = [];
    let max_eth = 0.0;
    let max_token = 0.0;
    let max_i_eth = 0;
    let max_i_tokens = 0;
    try {
        for (let i = 0; i < addr_list.length; i++) {
            console.log("address number: " + (i + 1) + "/" + addr_list.length);
            let curr_eth = 0.0;
            let curr_token = 0.0;
            let link_etherscan = "https://etherscan.io/address/" + addr_list[i];
            const response2 = await axios.get(link_etherscan);
            //try to scrape eth balance
            try {
                curr_eth = response2.data.split("Balance:</div")[1].split(" Ether</div")[0].split("\"col-md-8\">")[1].replace("<b>", "").replace("</b>", "");
            } catch (e) {
                curr_eth = 0.0;
            }
            //try to scrape tokens value
            try {
                curr_token = response2.data.split("<span class='badge badge-primary mx-1")[0].split("class=\"btn btn-xs btn-custom btn-custom")[1].split("$")[1].replace("\n", "");
            } catch (e) {
                curr_token = 0.0;
            }
            console.log("found eth: " + curr_eth);
            console.log("found tokens: " + curr_token + "$");
            let curr_eth_float = parseFloat(curr_eth);
            let curr_token_float = parseFloat(curr_token);
            total_eth = total_eth + curr_eth_float;
            total_tokens = total_tokens + curr_token_float;
            if (usePk) console.log("pk: " + pk_list[i]);
            console.log("etherscan: " + link_etherscan);
            console.log("------------------------")
            list_map.push({
                "address_number": i + 1,
                "eth": curr_eth,
                "tokens_value": curr_token,
                "etherscan": link_etherscan
            });
            //check if maximum
            if (curr_eth_float > max_eth) {
                max_eth = curr_eth_float;
                max_i_eth = i + 1;
            }
            if (curr_token_float > max_token) {
                max_token = curr_token_float;
                max_i_tokens = i + 1;
            }
            //sleep.msleep(200);
        }
        list_map.push({
            "total_eth": total_eth,
            "total_tokens_value": total_tokens,
            "max_eth_index": max_i_eth,
            "max_eth_value": max_eth,
            "max_token_index": max_i_tokens,
            "max_token_value": max_token,
            "scanned": moment(Date.now()).format('DD/MM/YYYY')
        });
    } catch (error) {
        console.log(error);
    }
    console.log("total eth: " + total_eth);
    console.log("total tokens in $: " + total_tokens);
    console.log("max eth value found in one: " + max_eth + ", index: " + max_i_eth);
    console.log("max token value found in one: " + max_token + ", index: " + max_i_tokens);
    return list_map;
}
