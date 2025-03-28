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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Auth]
 *     description: 서버에 저장된 Refresh Token을 제거하고, 클라이언트의 인증 쿠키를 삭제합니다.
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: 로그아웃 성공 (토큰 및 쿠키 삭제됨)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그아웃 되었습니다.
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 유효하지 않은 또는 만료된 토큰
 */

/**
 * @swagger
 * /auth/kakao:
 *   get:
 *     summary: 카카오 로그인 시작
 *     tags: [Auth]
 *     description: 카카오 로그인 인증 페이지로 리디렉션합니다.
 *     responses:
 *       302:
 *         description: 카카오 로그인 페이지로 리디렉션
 *
 * /auth/kakao/callback:
 *   get:
 *     summary: 카카오 로그인 콜백
 *     tags: [Auth]
 *     description: 카카오 로그인 후, 사용자 정보를 확인하고 JWT를 발급합니다.
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: 카카오에서 전달한 인가 코드
 *     responses:
 *       200:
 *         description: 로그인 성공 후 프론트로 리디렉션
 *       400:
 *         description: 로그인 실패 또는 토큰 발급 실패
 */
