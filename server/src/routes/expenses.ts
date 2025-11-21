import { Router } from 'express';
import { Expense } from '../models/Expense';
import { auth, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import mongoose from 'mongoose';

const router = Router();

const expenseSchema = z.object({
  description: z.string().min(1),
  category: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().refine(v => !isNaN(Date.parse(v)), 'Invalid date')
});

router.post('/', auth, async (req: AuthRequest, res) => {
  const parse = expenseSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
  const { description, category, amount, date } = parse.data;
  const expense = await Expense.create({
    userId: new mongoose.Types.ObjectId(req.user!.id),
    description,
    category,
    amount,
    date: new Date(date)
  });
  res.status(201).json(expense);
});

router.get('/', auth, async (req: AuthRequest, res) => {
  const { month, category } = req.query; // YYYY-MM optional filter
  const filter: any = { userId: req.user!.id };
  if (typeof month === 'string') {
    const start = new Date(month + '-01T00:00:00.000Z');
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    filter.date = { $gte: start, $lt: end };
  }
  if (typeof category === 'string' && category !== 'all') {
    filter.category = category;
  }
  const expenses = await Expense.find(filter).sort({ date: -1 }).limit(50);
  res.json(expenses);
});

router.get('/recent', auth, async (req: AuthRequest, res) => {
  const expenses = await Expense.find({ userId: req.user!.id }).sort({ date: -1 }).limit(10);
  res.json(expenses.map(e => ({
    id: e._id,
    description: e.description,
    category: e.category,
    amount: e.amount,
    date: e.date.toISOString().split('T')[0]
  })));
});

router.get('/stats/categories', auth, async (req: AuthRequest, res) => {
  const { month } = req.query; // YYYY-MM
  const match: any = { userId: new mongoose.Types.ObjectId(req.user!.id) };
  if (typeof month === 'string') {
    const start = new Date(month + '-01T00:00:00.000Z');
    const end = new Date(start); end.setMonth(end.getMonth() + 1);
    match.date = { $gte: start, $lt: end };
  }
  const results = await Expense.aggregate([
    { $match: match },
    { $group: { _id: '$category', amount: { $sum: '$amount' } } },
    { $project: { category: '$_id', amount: 1, _id: 0 } },
    { $sort: { amount: -1 } }
  ]);
  res.json(results);
});

router.delete('/:id', auth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  await Expense.deleteOne({ _id: id, userId: req.user!.id });
  res.status(204).send();
});

export default router;
