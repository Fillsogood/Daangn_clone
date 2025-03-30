/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 게시글 등록
 *     tags: [Post]
 *     description: 인증된 사용자가 게시글을 등록합니다. 다수의 이미지 URL도 함께 저장됩니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - price
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *                 example: 맥북 에어 M2 판매합니다
 *               content:
 *                 type: string
 *                 example: 박스 보관 중이고 상태 아주 좋아요!
 *               price:
 *                 type: number
 *                 example: 1200000
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://cdn.example.com/m2-1.jpg
 *                   - https://cdn.example.com/m2-2.jpg
 *     responses:
 *       201:
 *         description: 게시글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시글 등록 성공
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     price:
 *                       type: number
 *                     status:
 *                       type: string
 *                       example: selling
 *                     userId:
 *                       type: integer
 *                     images:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           url:
 *                             type: string
 *       401:
 *         description: 인증되지 않은 사용자
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [Post]
 *     description: 전체 게시글 목록을 최신순으로 조회합니다.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호 (기본값 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 한 페이지당 게시글 수 (기본값 10)
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: 게시글 상세 조회
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 게시글 없음
 *       500:
 *         description: 서버 오류
 */
