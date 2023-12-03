import mongoose from "mongoose";
import { DB_URI } from "../config";

mongoose.connect(DB_URI).then(() => {
    console.log("🚀 ~ DB Connected!")
}).catch(e => {
    console.log("🚀 ~ DB Error", e)
});