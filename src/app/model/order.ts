import { Recipient } from "./recipient";
import { Contact } from "./contact";
import { SelectedItem } from "./selectedItem";
import { firestore } from "firebase/app";
import * as firebase from 'firebase/app';

// export class Order{
//     constructor(
//         public client?:string,
//         public items?:any[],
//         public postage?: number,
//         public recipient?:Recipient,
//         public shippingCompany?: string,
//         public shippingCompanyUrl?: string,
//         public trackingNum?: string,
//         public status?: string
//     ){}

// }

export interface Order{
    client?:string;
    items?:SelectedItem[];
    postage?: number;
    recipient?:Contact;
    shippingCompany?: string;
    shippingCompanyUrl?: string;
    trackingNum?: string;
    status?: string;
    time?:firebase.firestore.FieldValue;
}