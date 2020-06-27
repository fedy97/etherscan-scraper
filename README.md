# Etherscan.io Scraper

#### What it is

Etherscan is a website that tracks Ethereum wallets, if you register you can add in a watchlist up to 25 addresses and see the total amount of $. I wanted to extend the maximum of watchable wallets, so I did this scraper that iterates through a textual list of addresses of arbitrary length and gets all the relevant information, all in one.

#### Instructions

1. Install Node.js

2. Clone this repo

3. Navigate into the folder of the project

4. Run `npm install i` from the terminal, inside the project folder

5. Put in a file.txt your addresses to be scanned, one per line

6. Open the file `config.env`:

   - `USEPRIVATEKEYS`=`true`
   >put false if your txt file contains public addresses, true if it contains private keys
   - `INPUT_PATH`=`/home/user/Scrivania/file.txt`
   >where the file containg addresses is located, default project directory/addresses.txt
   - `OUTPUT_PATH`=`/home/user/Scrivania/`
   >where the log should be written, default is the directory of the project
    
    if you want to use default, use `#` to comment the line
7. Run `node main.js` in the terminal
   
The script will generate a log with some relevant information concerning the balance of each address and the total amount, both for ETH and tokens in $


