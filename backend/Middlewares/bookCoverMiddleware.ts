import multer from "multer";
import path from "path";
import { existeDir } from "../src/utils/file";
import { CONFIG } from "../src";


existeDir(CONFIG.SERVER.UPLOAD_DIR)
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,CONFIG.SERVER.UPLOAD_DIR)
    },
    filename:(req,file,cb)=>{
        const nombreImg=file.originalname.replace(/[^a-z0-9.]/gi, '-').toLowerCase()
        cb(null,`cover-${Date.now()}${path.extname(nombreImg)}`)
    }
})

export const subirPortada=multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if(CONFIG.SERVER.ALLOWED_MIME_TYPES.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error(`Solo formatos:${CONFIG.SERVER.ALLOWED_MIME_TYPES.join(', ')}`))
        }
    },
    limits:{fileSize:CONFIG.SERVER.MAX_FILE_SIZE}
})
