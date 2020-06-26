# Etherscan.io Scraper

#### Instructions

1. Install Node.js

2. Clone this repo

3. Navigate into the folder of the project

4. Put in a file.txt your addresses to be scanned, one per line

5. Run `node main.js path filename true`
   
   > `filename`: is the name of the file, like `addresses.txt`
   > 
   > `path`: is the path where the file above is contained, as default is set to the directory of this project
   > 
   > `true`: put true if your file contains private keys instead of public addresses, ***LEAVE BLANK*** otherwise

The script will generate a log with some relevant information concerning the balance of each address and the total amount, both for ETH and tokens in $$
$


