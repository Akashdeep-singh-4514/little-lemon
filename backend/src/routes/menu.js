import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuData = await fs.readFile(
      path.join(__dirname, '../data/menuItems.json'),
      'utf-8'
    );
    const menuItems = JSON.parse(menuData);
    res.json(menuItems);
  } catch (error) {
    console.error('Menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const menuData = await fs.readFile(
      path.join(__dirname, '../data/menuItems.json'),
      'utf-8'
    );
    const menuItems = JSON.parse(menuData);
    const filteredItems = menuItems.filter(item => item.category === category);
    res.json(filteredItems);
  } catch (error) {
    console.error('Menu items by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;