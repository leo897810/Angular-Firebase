// export class SelectedItem{
//     constructor(
//         public title:string,
//         public price?:number,
//         public quantity?: number
//     ){}
// }


export interface SelectedItem {
    title?: string;
    price?: number;
    quantity?: number;
}