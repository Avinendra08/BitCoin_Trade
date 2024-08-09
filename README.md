This project is a Node.js-based backend service designed to handle cryptocurrency trading data. 
It includes APIs for uploading trade data from CSV files, storing it in MongoDB, and querying account balances at specific timestamps.

Tech Stack:
Node.js,Express,MongoDB
Multer: Middleware for handling file uploads.
csvtojson: Library to convert CSV data to JSON format.

I have deployed teh backend on render.
Url:https://koinx-assignment-d8kq.onrender.com/
for posting csv file : https://koinx-assignment-d8kq.onrender.com/api/uploadCrypto (POST Method , csv file as input)
for getting assets at given timestamp : https://koinx-assignment-d8kq.onrender.com/api/getAssetBalance (GET Method , timestamp as body input)
These will work at postman, please provide the required file and inputs for respected apis.
