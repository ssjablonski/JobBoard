import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const s3Client = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadToS3(file: Express.Multer.File) {
  const newFilename = `${uniqid()}-${file.originalname}`;
  const bucketName = 'sebastian-job-board';

  const uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: newFilename,
    ACL: 'public-read',
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return {
    newFilename,
    url: `https://${bucketName}.s3.amazonaws.com/${newFilename}`,
  };
}

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const result = await uploadToS3(file);
    res.json(result);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

export default router;
