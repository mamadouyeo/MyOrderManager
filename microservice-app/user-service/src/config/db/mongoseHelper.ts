import mongoose from "mongoose";

class MongooseHelper{
    url: string | null;
    dbname: string | null;
    port: string | null;
    instance: any;

    constructor(
        url: string | null,
        dbname: string | null,
        port: string | null
    ){
        this.url = url;
        this.dbname = dbname;
        this.port = port;
        this.instance = null;
    }

    async getInstance(){
        if (!this.instance) {
            this.instance = await this.connect();
        }
        return this.instance;
    }

    private async connect(){
        try {
            this.instance = await mongoose.connect(
                `${this.url}`,
              
            )
            console.log("Nouvelle instance de la base de donnée crée");
            return this.instance
        } catch (err) {
            console.log(err)
        }
    }
}

export const mongooseHelper = new MongooseHelper(
    'mongodb://127.0.0.1:27017/userService',
    null,
    null
)