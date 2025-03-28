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

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     summary: 내 정보 수정
 *     tags: [User]
 *     description: 사용자 정보를 수정합니다. (닉네임, 이메일, 지역, 프로필 이미지)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: 새로운 닉네임
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *               regionId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: 수정 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
