export interface Transaction{
    id:number
    walletId:number
    walletName?:string
    amount:number
    categoryId:number
    categoryName?: string
    type:boolean
}