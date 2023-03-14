import mongoose from "mongoose";

const AcronymSchema = new mongoose.Schema({
    acronym: String,
    definition: String
});

const Acronym = mongoose.model('Acronym', AcronymSchema);

export { Acronym };
