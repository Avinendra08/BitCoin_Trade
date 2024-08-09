import { asyncHandler } from "../utils/asyncHandler.js";
import { Crypto } from "../models/crypto.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import csv from "csvtojson";

const uploadCrypto = asyncHandler(async (req, res) => {
  //console.log("working");
  if (!req.file) {
    throw new ApiError(400, "CSV file is required");
  }
  const cryptoData = [];
  csv()
    .fromFile(req.file.path)
    .then(async (response) => {
      console.log(response);

      for (let x = 0; x < response.length; x++) {
        const marketSplit = response[x].Market.split("/"); // base and quote coin different

        cryptoData.push({
          user_id: response[x].User_ID,
          utc_time: new Date(response[x].UTC_Time),
          operation: response[x].Operation,
          market: {
            base_coin: marketSplit[0], //base_coin
            quote_coin: marketSplit[1], //quote_coin
          },
          amount: parseFloat(response[x]["Buy/Sell_Amount"]),
          price: parseFloat(response[x].Price),
        });
      }

      await Crypto.insertMany(cryptoData);
    });

  res.send({ status: 200, success: true, msg: "csv imported" });
});

// const getAssetBalance = asyncHandler(async (req, res) => {
//   const { timestamp } = req.body;
//   if (!timestamp) {
//     throw new ApiError(400, "timestamp is required");
//   }
//   const time = new Date(timestamp);

//   const transactions = await Crypto.find({ utc_time: { $lte: time } });
//   const balances = {};

//   if (transactions.length===0) {
//     throw new ApiError(404,"No matching data found");
//   }

//   transactions.forEach(transaction => {
//     const { operation, market, amount } = transaction;
//     const coin = market.base_coin;

//     if (!balances[coin]) {
//       balances[coin] = 0;
//     }

//     if (operation === "Buy") {
//       balances[coin] += amount;
//     } else if (operation === "Sell") {
//       balances[coin] -= amount;
//     }
//   });

//   Object.keys(balances).forEach((key) => {
//     if (balances[key] === 0) {
//       delete balances[key];
//     }
//   });

//   if (!balances) {
//     throw new ApiError(500, "Something went wrong");
//   }
// //   return res
// //   .status(200)
// //   .json(new ApiResponse(200, balances));
// res.status(200).json(balances);
// });

const getAssetBalance = asyncHandler(async (req, res) => {
  const { timestamp } = req.body;
  if (!timestamp) {
    throw new ApiError(400, "timestamp is required");
  }
  const time = new Date(timestamp);

  const balances = await Crypto.aggregate([
    {
      $match: {
        utc_time: { $lte: new Date(time) }
      }
    },
    {
      $group: {
        _id: "$market.base_coin",
        totalBought: {
          $sum: {
            $cond: [{ $eq: ["$operation", "Buy"] }, "$amount", 0]
          }
        },
        totalSold: {
          $sum: {
            $cond: [{ $eq: ["$operation", "Sell"] }, "$amount", 0]
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        asset: "$_id",
        balance: { $subtract: ["$totalBought", "$totalSold"] }
      }
    },
    {
      $match: {
        balance: { $ne: 0 }
      }
    }
  ]);
  const balanceObj = {};
  balances.forEach((item) => {
    balanceObj[item.asset] = item.balance;
  });

  res.json(balanceObj);
});
export { uploadCrypto, getAssetBalance };
