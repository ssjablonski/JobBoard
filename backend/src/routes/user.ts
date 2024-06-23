import express, { Request, Response } from 'express';
import { verifyToken } from './auth';
import prisma from '../lib/db';

const router = express.Router();

// Get all users
router.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { companies: true, Company: true }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user by id
router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { companies: true, Company: true }
    });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get single user by email
router.get('/email/:email', async (req: Request, res: Response) => {
  const userEmail = req.params.email;
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { companies: true, Company: true }
    });

    // console.log('user', user)
    
    if (user == null) {
      res.json('User not found');
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create a new user
router.post('/create', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update a user
router.put('/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, companyId } = req.body; // Assuming companyId is passed in request body

  try {
    // Check if the company exists (optional, but recommended)
    const companyExists = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!companyExists) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Update user, connecting to a company by its id
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        companyId, // Ensure companyId is passed correctly
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/:id/delete', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;