import express, { Request, Response } from 'express';
import { verifyToken } from './auth';
import prisma from '../lib/db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Middleware do weryfikacji JWT
app.use(verifyToken);

// Endpointy API

// Get all companies
app.get('/api/companies', async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get single company by id
app.get('/api/companies/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.status(200).json(company);
    }
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// Create a new companies
app.post('/api/companies', async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCompany = await prisma.company.create({
      data: {
        name,
      },
    });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// Update a companies
app.put('/api/companies/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  const { name, offers, employees } = req.body;
  try {
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        name,
        offers,
        employees,
      },
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// Delete a companies
app.delete('/api/companies/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    await prisma.user.delete({
      where: { id: companyId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
