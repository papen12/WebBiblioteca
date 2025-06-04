export interface Cliente{
    ci_cliente:string
    idPersona:number
    usuario :string
    password:string
}
export type ClienteFunc = Omit<Cliente, "id">;