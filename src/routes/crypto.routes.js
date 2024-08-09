import {Router} from "express";
import multer from "multer";
import { getAssetBalance, uploadCrypto } from "../controllers/crypto.controller.js";
import path from "path";


const router = Router();
const uploads = path.resolve('public/uploads');

const storage  = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, uploads);
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

router.post('/uploadCrypto',upload.single('file'),uploadCrypto);
router.get('/getAssetBalance',getAssetBalance);

export default router;