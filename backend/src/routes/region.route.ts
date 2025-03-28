// src/routes/region.route.ts
import express from 'express';
import * as region from '../controllers/region.controller';

const router = express.Router();

router.get('/', region.getAllRegions);

export default router;
