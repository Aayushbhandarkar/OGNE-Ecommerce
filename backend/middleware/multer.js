import multer from 'multer';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public'); // make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // safer naming
  },
});

let upload = multer({ storage });
export default upload;
