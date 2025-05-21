export interface Autor{
    nombre :string
    nacionalidad : string
    fechaNac : number
    fechaMuerte : number
    biografia : string
    idAutor : number
}

export type AutorFunc = Omit<Autor, "id">;