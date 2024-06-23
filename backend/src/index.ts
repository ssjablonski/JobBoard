import express from 'express';
import { verifyToken } from './routes/auth';
import company from './routes/company';
import offer from './routes/offers';
import user from './routes/user';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(verifyToken);

app.use('/api/companies', company);
app.use('/api/offers', offer);
app.use('/api/users', user);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
