import mongoose from "mongoose";

const AcronymSchema = new mongoose.Schema({
    acronym: {
        type: String,
        required: true,
        unique: true
    },
    definition: {
        type: String,
        required: true
    }
});

const Acronym = mongoose.model('Acronym', AcronymSchema);

export { Acronym };
