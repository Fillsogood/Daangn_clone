/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: 전체 지역 목록 조회
 *     tags: [Region]
 *     description: 등록된 모든 지역 정보를 조회합니다.
 *     responses:
 *       200:
 *         description: 지역 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 regions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: 서울특별시 마포구 연남동
 *       500:
 *         description: 서버 오류
 */
