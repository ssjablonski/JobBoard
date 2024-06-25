import express from 'express';
import cors from 'cors';
import { verifyToken } from './routes/auth';
import company from './routes/company';
import offer from './routes/offers';
import user from './routes/user';
import upload from './routes/upload';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(verifyToken);

app.use('/api/companies', company);
app.use('/api/offers', offer);
app.use('/api/users', user);
app.use('/api/upload', upload);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
