export interface Libro{
    idLibro:number
    isbn:String
    titulo:string
    portada:string
    sinopsis: string
    genero:string
    editorial:string
    fechaPublicacion:Date
}
export type LibroFunc = Omit<Libro, "id">;