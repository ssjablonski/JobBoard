import express, { Request, Response } from 'express';
import { verifyToken } from './auth';
import prisma from '../lib/db';

const router = express.Router();

// Get all offers
router.get('/all', async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      include: { company: true }
    });
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// Get single offer by id
router.get('/:id', async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: { company: true }
    });
    if (!offer) {
      res.status(404).json({ error: 'Offer not found' });
    } else {
      res.status(200).json(offer);
    }
  } catch (error) {
    console.error('Error fetching offer:', error);
    res.status(500).json({ error: 'Failed to fetch offer' });
  }
});

// Create a new offer
router.post('/create', async (req: Request, res: Response) => {
  const { companyId, title, description, location, salary, employmentType, mode, jobIcon, contactPhoto, contactPhone, contactName, contactEmail } = req.body;

  try {
    const newOffer = await prisma.offer.create({
      data: {
        companyId,
        title,
        description,
        location,
        salary,
        employmentType,
        mode,
        jobIcon,
        contactPhoto,
        contactPhone,
        contactName,
        contactEmail
      },
    });
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ error: 'Failed to create offer' });
  }
});

// Update an offer
router.put('/:id/update', async (req: Request, res: Response) => {
  const offerId = req.params.id;
  const { companyId, title, description, location, salary, employmentType, mode, jobIcon, contactPhoto, contactPhone, contactName, contactEmail } = req.body;
  try {
    const updatedOffer = await prisma.offer.update({
      where: { id: offerId },
      data: {
        companyId,
        title,
        description,
        location,
        salary,
        employmentType,
        mode,
        jobIcon,
        contactPhoto,
        contactPhone,
        contactName,
        contactEmail
      },
    });
    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ error: 'Failed to update offer' });
  }
});

// Delete an offer
router.delete('/:id/delete', async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    await prisma.offer.delete({
      where: { id: offerId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ error: 'Failed to delete offer' });
  }
});

export default router;