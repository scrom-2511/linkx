import mongoose from "mongoose";

const CountSchema = new mongoose.Schema({
    i:{type:Number, default:0},
    j:{type:Number, default:0},
    k:{type:Number, default:0},
    l:{type:Number, default:0},
    m:{type:Number, default:0},
});

export const CountModel = mongoose.model("Count",CountSchema);
