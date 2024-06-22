import express, { Request, Response } from 'express';
import { verifyToken } from './auth';
import prisma from '../lib/db';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Middleware do weryfikacji JWT
app.use(verifyToken);

// Endpointy API

// Get all offers
app.get('/api/offers', async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany();
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Failed to fetch offers' });
  }
});

// Get single offer by id
app.get('/api/offers/:id', async (req: Request, res: Response) => {
  const offerId = req.params.id;
  try {
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });
    if (!offer) {
      res.status(404).json({ error: 'offer not found' });
    } else {
      res.status(200).json(offer);
    }
  } catch (error) {
    console.error('Error fetching offer:', error);
    res.status(500).json({ error: 'Failed to fetch offer' });
  }
});

// Create a new offers
app.post('/api/offers', async (req: Request, res: Response) => {
  const { title, companyId, company, location, employmentType, mode } = req.body;
  try {
    const newoffer = await prisma.offer.create({
      data: {
        title,
        companyId,
        company: {
          connect: { id: companyId },
        },
        location,
        employmentType,
        mode,
      },
    });
    res.status(201).json(newoffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ error: 'Failed to create offer' });
  }
});

// Update a offers
app.put('/api/offers/:id', async (req: Request, res: Response) => {
  const offerId = req.params.id;
  const { title, companyId, company, location, employmentType, mode } = req.body;
  try {
    const updatedoffer = await prisma.offer.update({
      where: { id: offerId },
        data: {
            title,
            companyId,
            company: {
            connect: { id: companyId },
            },
            location,
            employmentType,
            mode,
        },
    });
    res.status(200).json(updatedoffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ error: 'Failed to update offer' });
  }
});

// Delete a offers
app.delete('/api/offers/:id', async (req: Request, res: Response) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
