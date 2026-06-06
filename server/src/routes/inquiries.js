import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// POST /api/inquiries (public — quote form submission)
router.post('/', async (req, res) => {
  const { name, company, email, phone, capacityNeeded, generatorInterest, message } = req.body;

  if (!name || !email || !phone || !capacityNeeded || !generatorInterest || !message) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  const inquiry = await prisma.inquiry.create({
    data: { name, company: company || null, email, phone, capacityNeeded, generatorInterest, message },
  });
  res.status(201).json(inquiry);
});

// GET /api/inquiries (admin)
router.get('/', requireAuth, async (req, res) => {
  const { status } = req.query;
  const inquiries = await prisma.inquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  });
  res.json(inquiries);
});

// GET /api/inquiries/:id (admin)
router.get('/:id', requireAuth, async (req, res) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' });
  res.json(inquiry);
});

// PATCH /api/inquiries/:id/status (admin)
router.patch('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body;
  const valid = ['Pending', 'Contacted', 'Resolved'];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${valid.join(', ')}` });
  }

  const inquiry = await prisma.inquiry.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(inquiry);
});

// DELETE /api/inquiries/:id (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  const exists = await prisma.inquiry.findUnique({ where: { id: req.params.id } });
  if (!exists) return res.status(404).json({ error: 'Inquiry not found' });

  await prisma.inquiry.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;
