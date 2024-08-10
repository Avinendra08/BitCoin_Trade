# KoinX_Crypto
KoinX_Crypto is a Node.js-based backend service designed for handling cryptocurrency trading data. It includes APIs for uploading trade data from CSV files, storing it in MongoDB, and querying account balances at specific timestamps.

## Prerequisites
1. MongoDB running locally or on Atlas and its URL
2. Nodejs installed locally ([How to install NodeJS ?](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))


## Setup
### Local Nodejs Instance
1. Clone the repository using ```git clone https://github.com/Avinendra08/KoinX_assignment.git``` and navigate to the folder.
2. Create a ```.env``` file in root folder
   
   ``` bash
   touch .env
   ```
3. Enter the following details in the ```.env``` file

   ``` bash
   DB_URI = YOUR_MONGO_URL
   PORT = 8000
   
4. Open the terminal in the root folder and run the following commands :

   ``` bash
   npm install
   ```
5. Run the server in Dev mode using
    ``` bash
    npm run dev
    ```
    or use command
   ``` bash
    npm start
   ``` 
6. Once this is done, the server is up and runnning at port 8000

   ``` bash
    MongoDB connected !! DB HOST: cluster0-shard-00-02.ebe6f.mongodb.net
    Server is running at port : 8000
   ```
   

## Architecture
### Tech Stack
- Backend - **NodeJS**

  Node.js is used for making the backend as it is developer friendly and allows use to build scalable application at ease.
- Database - **MongoDB**

  MongoDB is as it provides complete flexibility over schema and facilitates faster & accessible development with help of its cloud clusters.
  It can also cater to handle large data and it read/write using various features like indexes.

- File Upload: Multer
- CSV to JSON Conversion: csvtojson

## API Endpoints
## Upload CSV Data
   Endpoint: /api/uploadCrypto
   
   Method: POST
   
   Description: Upload a CSV file containing trade data.
   
   Request: CSV file as form-data with the key as file.

   POST https://koinx-assignment-d8kq.onrender.com/api/uploadCrypto

## Get Asset Balance at a Given Timestamp
   Endpoint: /api/getAssetBalance
   
   Method: GET
   
   Description: Get the asset-wise balance of the account at a specific timestamp.
   
   Request: JSON body with timestamp in the format "YYYY-MM-DD HH:mm:ss".

   GET https://koinx-assignment-d8kq.onrender.com/api/getAssetBalance
   
   BODY:
   {
    "timestamp": "2022-09-28 12:00:00"
   }

