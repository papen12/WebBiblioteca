export interface Opiniones{
    idOpinion :number
    idLibro:number
    ciCliente : number
    calificacion : number
    comentario : string
    fecha : Date
}
export type OpinionesFunc = Omit<Opiniones, "idOpinion" >;