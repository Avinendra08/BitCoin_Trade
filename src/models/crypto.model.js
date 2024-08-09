import mongoose, { Schema } from "mongoose";

const marketSchema = new Schema({
  base_coin: {
    type: String,
    required: true,
  },
  quote_coin: {
    type: String,
    required: true,
  },
});

const cryptoSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  utc_time: {
    type: Date,
    required: true,
  },
  operation: {
    type: String,
    enum: ["Buy", "Sell"],
    required: true,
  },
  market: {
    type: marketSchema,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Crypto = mongoose.model("Crypto", cryptoSchema);
