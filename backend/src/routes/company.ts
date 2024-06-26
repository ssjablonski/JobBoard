import express, { Request, Response } from 'express';
import { verifyToken } from './auth';
import prisma from '../lib/db';

const router = express.Router();

// Get all companies
router.get('/all', async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany({
      include: { offers: true, employees: true }
    });
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Get single company by id
router.get('/:id', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: { offers: true, employees: true }
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

// Get companies from user by id
router.get('/user/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const companies = await prisma.userCompany.findMany({
      where: { userId: userId },
      include: { company: true }
    });
    if (!companies) {
      res.status(404).json({ error: 'Companies not found' });
    } else {
      res.status(200).json(companies);
    }
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// Create a new company
router.post('/create', async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  try {
    // Utwórz nową firmę
    const newCompany = await prisma.company.create({
      data: {
        name,
      },
    });

    // Utwórz powiązanie UserCompany dla nowo utworzonej firmy i użytkownika
    const newUserCompany = await prisma.userCompany.create({
      data: {
        userId,
        companyId: newCompany.id,
      },
    });

    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// Update a company
router.put('/:id/update', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  const { name } = req.body;
  try {
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { name },
    });
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// Delete a company
router.delete('/:id/delete', async (req: Request, res: Response) => {
  const companyId = req.params.id;
  try {
    await prisma.company.delete({
      where: { id: companyId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

export default router;