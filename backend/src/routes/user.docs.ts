/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [User]
 *     description: 로그인된 사용자의 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: logi@example.com
 *                     nickname:
 *                       type: string
 *                       example: 로기
 *                     region:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 3
 *                         name:
 *                           type: string
 *                           example: 서울특별시 마포구 연남동
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-28T09:30:12.123Z
 *       401:
 *         description: 인증 실패 (토큰 없음 또는 유효하지 않음)
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
