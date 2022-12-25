import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req: express.Request, file: Express.Multer.File, cb: any) {
    cb(null, 'uploads/')
  },
  filename(req: express.Request, file: Express.Multer.File, cb: any) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file: Express.Multer.File, cb: any) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req: express.Request, file: Express.Multer.File, cb: any) {
    checkFileType(file, cb)
  },
})

router.post(
  '/',
  upload.single('image'),
  (req: express.Request, res: express.Response) => {
    if (req.file) {
      res.send(`/${req.file.path}`)
    } else {
      res.send('No file was uploaded')
    }
  }
)

export default router