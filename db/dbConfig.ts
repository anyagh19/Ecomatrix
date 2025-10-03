import mongoose from 'mongoose'

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string)
        const connection = mongoose.connection

        connection.on("connected" , () => {
            console.log("connection to db successful")
        })
        connection.on("error", (error) => {
            console.log("error while connecting to db" , error)
        })
    } catch (error: unknown) {
        console.log("coonecting to db error" , error)
    }
}