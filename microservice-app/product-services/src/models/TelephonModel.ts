import {Schema, model} from 'mongoose';

interface ITelephone {
    marque : string;
    picture : string;
    purchasePrice : string;
    memoieInterne : string;
    memoieRam : string;
    baterie : string;
}

const TelephoneSchema  = new Schema<ITelephone>({
    marque: {type : String , required : true},
    picture: {type : String , required : true},
    purchasePrice: {type : String , required : true},
    memoieInterne: {type : String , required : true},
    memoieRam: {type : String , required : true},
    baterie: {type : String , required : true}
})

const Telephone = model('Telephone', TelephoneSchema)

export {Telephone}