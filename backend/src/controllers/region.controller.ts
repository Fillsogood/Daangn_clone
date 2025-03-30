import { Request, Response } from 'express';
import { getAllRegionsService } from '../services/region.service';

// 리전 전체 조회
export const getAllRegions = async (req: Request, res: Response): Promise<void> => {
  try {
    const regions = await getAllRegionsService();

    res.status(200).json({ regions });
  } catch (err) {
    res.status(500).json({ error: '지역 목록 조회 실패', message: err });
  }
};
