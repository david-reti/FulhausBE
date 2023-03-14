import mongoose from 'mongoose';

// Open database connection - if the database cannot be accessed, exit the program
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI);
    } catch(dbConnectionError) {
        console.error(`Could not establish database connection: ${dbConnectionError}`);
        process.exit(1);
    }
}

export { connectToDatabase };
