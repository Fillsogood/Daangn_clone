/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickname
 *               - regionId
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *               regionId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 회원가입 실패
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 로그인 실패
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 로그인된 사용자 정보 반환
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
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     regionId:
 *                       type: integer
 *       401:
 *         description: 인증 실패 (토큰 없음 또는 유효하지 않음)
 */

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Access Token 재발급
 *     tags: [Auth]
 *     description: 클라이언트는 쿠키에 담긴 Refresh Token을 전송하여 새로운 Access Token을 발급받습니다.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: 토큰 재발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 토큰이 재발급되었습니다.
 *       401:
 *         description: 유효하지 않은 Refresh Token
 *       403:
 *         description: Refresh Token이 유효하지 않음 (DB 불일치 등)
 */
