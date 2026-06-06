import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// GET /api/generators
router.get('/', async (req, res) => {
  const generators = await prisma.generator.findMany({ orderBy: { capacityKVA: 'asc' } });
  res.json(generators.map(formatGenerator));
});

// GET /api/generators/:id
router.get('/:id', async (req, res) => {
  const gen = await prisma.generator.findUnique({ where: { id: req.params.id } });
  if (!gen) return res.status(404).json({ error: 'Generator not found' });
  res.json(formatGenerator(gen));
});

// POST /api/generators (admin)
router.post('/', requireAuth, async (req, res) => {
  const data = parseBody(req.body);
  const gen = await prisma.generator.create({ data });
  res.status(201).json(formatGenerator(gen));
});

// PUT /api/generators/:id (admin)
router.put('/:id', requireAuth, async (req, res) => {
  const exists = await prisma.generator.findUnique({ where: { id: req.params.id } });
  if (!exists) return res.status(404).json({ error: 'Generator not found' });

  const data = parseBody(req.body);
  const gen = await prisma.generator.update({ where: { id: req.params.id }, data });
  res.json(formatGenerator(gen));
});

// DELETE /api/generators/:id (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  const exists = await prisma.generator.findUnique({ where: { id: req.params.id } });
  if (!exists) return res.status(404).json({ error: 'Generator not found' });

  // Clean up image files
  for (const imgPath of exists.images) {
    const full = path.join(process.cwd(), imgPath.replace(/^\//, ''));
    if (fs.existsSync(full)) fs.unlinkSync(full);
  }

  await prisma.generator.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// POST /api/generators/:id/images (admin) — upload up to 4 images
router.post('/:id/images', requireAuth, upload.array('images', 4), async (req, res) => {
  const gen = await prisma.generator.findUnique({ where: { id: req.params.id } });
  if (!gen) return res.status(404).json({ error: 'Generator not found' });

  const newPaths = req.files.map((f) => `/uploads/${f.filename}`);
  const combined = [...gen.images, ...newPaths].slice(0, 4);

  const updated = await prisma.generator.update({
    where: { id: req.params.id },
    data: { images: combined },
  });
  res.json(formatGenerator(updated));
});

// DELETE /api/generators/:id/images (admin) — remove a specific image
router.delete('/:id/images', requireAuth, async (req, res) => {
  const { imagePath } = req.body;
  const gen = await prisma.generator.findUnique({ where: { id: req.params.id } });
  if (!gen) return res.status(404).json({ error: 'Generator not found' });

  const full = path.join(process.cwd(), imagePath.replace(/^\//, ''));
  if (fs.existsSync(full)) fs.unlinkSync(full);

  const updated = await prisma.generator.update({
    where: { id: req.params.id },
    data: { images: gen.images.filter((i) => i !== imagePath) },
  });
  res.json(formatGenerator(updated));
});

function parseBody(body) {
  return {
    name: body.name,
    brand: body.brand,
    capacityKVA: parseInt(body.capacityKVA),
    phase: body.phase,
    fuelType: body.fuelType,
    soundproof: body.soundproof === 'true' || body.soundproof === true,
    engineModel: body.engineModel,
    alternatorBrand: body.alternatorBrand,
    status: body.status || 'Available',
    price: parseFloat(body.price),
    description: body.description,
    specModel: body.specModel || null,
    specPowerPrime: body.specPowerPrime || null,
    specPowerStandby: body.specPowerStandby || null,
    specFrequency: body.specFrequency || null,
    specVoltage: body.specVoltage || null,
    specSpeed: body.specSpeed || null,
  };
}

function formatGenerator(gen) {
  return {
    id: gen.id,
    name: gen.name,
    brand: gen.brand,
    capacityKVA: gen.capacityKVA,
    phase: gen.phase,
    fuelType: gen.fuelType,
    soundproof: gen.soundproof,
    engineModel: gen.engineModel,
    alternatorBrand: gen.alternatorBrand,
    status: gen.status,
    price: gen.price,
    description: gen.description,
    images: gen.images,
    specifications: {
      model: gen.specModel,
      powerPrime: gen.specPowerPrime,
      powerStandby: gen.specPowerStandby,
      frequency: gen.specFrequency,
      voltage: gen.specVoltage,
      speed: gen.specSpeed,
    },
    createdAt: gen.createdAt,
    updatedAt: gen.updatedAt,
  };
}

export default router;
