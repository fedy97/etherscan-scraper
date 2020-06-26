# Etherscan.io Scraper

#### What it is

Etherscan is a website that tracks Ethereum wallets, if you register you can add in a watchlist up to 25 addresses and see the total amount of $. I wanted to extend the maximum of watchable wallets, so I did this scraper that iterates through a textual list of addresses of arbitrary length and gets all the relevant information, all in one.

#### Instructions

1. Install Node.js

2. Clone this repo

3. Navigate into the folder of the project

4. Run `npm install i` from the terminal, inside the project folder

5. Put in a file.txt your addresses to be scanned, one per line

6. Run `node main.js path filename true`
   
   > `filename`: is the name of the file, like `addresses.txt`
   > 
   > `path`: is the path where the file above is contained, as default is set to the directory of this project
   > 
   > `true`: put true if your file contains private keys instead of public addresses, ***LEAVE BLANK*** otherwise

The script will generate a log with some relevant information concerning the balance of each address and the total amount, both for ETH and tokens in $


