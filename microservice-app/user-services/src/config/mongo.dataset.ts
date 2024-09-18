// // import { cdg } from "../../utils";
// import { Model } from "mongoose";
// import {resolve} from 'path';

// export class MongoDataSet{
//     static defaultModel: typeof Model

//     static async save(newData: Object): Promise<{ error: boolean, data: any, message: string, status: number }>{
//         return new Promise((resolve, reject)=>{
//             try {
//                 const newSave = new this.defaultModel(newData);

//                 newSave.save(function(err: any){
//                     if(err)
//                         return resolve({
//                             error: true,
//                             data: err,
//                             message: "impossible de sauvegarder la donnée",
//                             status: 1
//                         });

//                     return resolve({error:false, status: 200, message: 'Donnée enregistrée avec succès!', data: null})
//                 })
//             } catch (error) {
//                 console.warn(error)
//                 reject({
//                     error: true,
//                     data: error,
//                     message: "Impossible de sauvegarder la donnée",
//                     status: 1
//                 })
//             }
//         })
//     }

//     static insert(key: object, data: object){
//         return new Promise((resolve, reject)=>{
//             try {
//                 let Q = this.defaultModel.findByIdAndUpdate
//             } catch (error) {
//                 console.warn(error)
//                 reject({
//                     error: true,
//                     data: error,
//                     message: "impossible de sauvegarder la donnée", 
//                     status: 1
//                 })
//             }
//         })
//     }

//     static update(key: object, data: object) {
//         return new Promise((resolve,reject) => {
//             try{
//                 let Q = this.defaultModel.findOneAndUpdate(key, data, { upsert: false });
//                 Q.exec();
//                 resolve({ status: 0, data: "Data edited successfully" });
//             }catch(e){
//                 console.log("erreur", e)
//                 reject(e)
//             }
    
            
//           }).catch ((e: any) => {
//             if (e) {
//                 cdg.konsole(e, 1);
//                 return { error: true, data: e };
//             }
//         });
//     }

//     static remove(params: any) {
//         return new Promise((resolve) => {
//           this.defaultModel.deleteOne(params, function (err: any) {
//             if (err) resolve({ error: true, data: err, msg: '' });

//             resolve({
//               status: 0,
//               data: "Data removed successfully",
//             });
//           }).catch ((e: any) => {
//                 if (e) {
//                     cdg.konsole(e, 1);
//                     return { error: true, data: e };
//                 }
//             });
//         });
//     }

//     static async select(query: { params: any, excludes: any }) {
//         query.params = (cdg.string.is_empty(query.params) ? {} : query.params);
//         query.excludes = (cdg.string.is_empty(query.excludes) ? {} : query.excludes);

//         try {
//             return await new Promise(async (resolve) => {
//                 let Q = await this.defaultModel.find(query.params, query.excludes).lean().sort({ createdAt: -1 });

//                 resolve(Q);
//             });
//         } catch (e) {
//             if (e) {
//                 cdg.konsole(e, 1);
//                 return { error: true, data: e };
//             }
//         };
//     }

//     static async selectOne(params: Object) {
//         try {
//             return new Promise(async (resolve) => {
//                 resolve(await this.defaultModel.findOne(params).select("-__v").lean());
//             });
//         } catch (e) {
//             if (e) {
//                 cdg.konsole(e, 1);
//                 return { error: true, data: e };
//             }
//         }
//     }

//     static async exist(params: Object): Promise<boolean> {
//         return new Promise(async (resolve, reject) => {
//             try{
//                 let Q = await this.defaultModel.findOne(params).select("-__v").lean();
//                 if (Q == null) {
//                     return resolve(false);
//                 } 
//                 return resolve(true);
//             }catch(e){
//                 cdg.konsole( "error exist")
//                 console.log(e)
//                 reject(false)
//             }
//         });
//     }

//     static rollbackSave(slug: string) {
//         return new Promise((resolve, _reject) => {
//             this.remove(slug).then((remove: any) => {
//                 if(remove.status === 1 ) {
//                     cdg.konsole(remove, 1);
//                     resolve(false);
//                 }

//                 resolve(true)
//             })
//         }).catch ((e: any) => {
//             if (e) {
//                 cdg.konsole(e, 1);
//                 return { error: true, data: e };
//             }
//         });
//     }

//     static async ownData(params: object) {
//         let Q = await this.defaultModel.findOne(params);
//         return !!Q;
//     }

//     static async isContact(contact: any) {
//         let tmp = {};
//         let number = contact.numero;

//         let xx = await this.checkNumberExist(number);
//         if(xx === true) {
//             tmp = {status: 1, data: "Ce numéro " + number + " est déjà enregistré"};
//         } else {
//             tmp = {status: 0};
//         }
//         return tmp
//     }

//     static async checkNumberExist (number:any) {
//         let Q:any = await this.select({params: {status: 'active'}, excludes: {}
//         });
//         let res = false;
//         Q.forEach((numero:any) => {
//             let uContacts = numero.contacts;
//             for(let c in uContacts) {
//                 res = uContacts[c] === number;
//                 if(res === true) break;
//             }
//         });

//         return res;
//     }
// }