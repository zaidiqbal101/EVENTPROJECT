import multer from 'multer';

// Configure multer's storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Generate a unique filename
  },
});

// Create the upload middleware
const upload = multer({ storage: storage });

export default upload;
