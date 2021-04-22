import multer from 'multer';
import path from 'path'; // lidar com paths 
import crypto from 'crypto'; // criptografar

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex'); //gera uma string aleatoria em hex de 6 bytes
            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName);
        }
    })
};