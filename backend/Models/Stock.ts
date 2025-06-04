export interface Stock{
    idLibro : number
    idStock : number
    ubicacion : string
    disponibilidad : boolean
    estado : string
}

export type StockFunc = Omit<Stock, "idLibro">;