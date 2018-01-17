import { Contact } from "./contact";

export interface Client{
    id?:string;
    name?:string;
    wechat?: string;
    contacts?: Contact[];
}