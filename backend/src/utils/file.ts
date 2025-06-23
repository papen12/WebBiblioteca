import fs from 'fs/promises'

export const existeDir = async (direccion:string)=>{
    try{
        await fs.access(direccion)
    }catch(error){
        await fs.mkdir(direccion,{recursive:true})
    }
}

export const deleteFile=async(direccion:string)=>{
    try{
        await fs.unlink(direccion)
    }catch(error){
        console.error(error)
    }
}