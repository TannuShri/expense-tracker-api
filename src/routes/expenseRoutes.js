const express = require("express");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getCategoryReport,
  getMonthlyReport,
} = require("../controllers/expenseController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Add a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense added successfully
 */
router.post("/", protect, addExpense);

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses for logged-in user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/", protect, getExpenses);

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */
router.put("/:id", protect, updateExpense);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 */
router.delete("/:id", protect, deleteExpense);

/**
 * @swagger
 * /api/expenses/reports/category:
 *   get:
 *     summary: Get category-wise expense report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category-wise report
 */
router.get("/reports/category", protect, getCategoryReport);

/**
 * @swagger
 * /api/expenses/reports/monthly:
 *   get:
 *     summary: Get monthly expense report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly report
 */
router.get("/reports/monthly", protect, getMonthlyReport);

module.exports = router;
