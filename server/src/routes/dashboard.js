import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/stats (admin)
router.get('/stats', requireAuth, async (req, res) => {
  const [totalGenerators, totalInquiries, pending, contacted, resolved, byBrand] =
    await Promise.all([
      prisma.generator.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'Pending' } }),
      prisma.inquiry.count({ where: { status: 'Contacted' } }),
      prisma.inquiry.count({ where: { status: 'Resolved' } }),
      prisma.generator.groupBy({ by: ['brand'], _count: { brand: true } }),
    ]);

  // Inquiries per month (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentInquiries = await prisma.inquiry.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true, status: true },
    orderBy: { createdAt: 'asc' },
  });

  const monthlyMap = {};
  for (const inq of recentInquiries) {
    const key = inq.createdAt.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (!monthlyMap[key]) monthlyMap[key] = { month: key, inquiries: 0, resolved: 0 };
    monthlyMap[key].inquiries++;
    if (inq.status === 'Resolved') monthlyMap[key].resolved++;
  }

  res.json({
    totalGenerators,
    totalInquiries,
    pending,
    contacted,
    resolved,
    brandDistribution: byBrand.map((b) => ({ brand: b.brand, count: b._count.brand })),
    monthlyInquiries: Object.values(monthlyMap),
  });
});

export default router;
