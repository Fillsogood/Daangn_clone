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

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: 게시글 수정
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 *       403:
 *         description: 권한 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       403:
 *         description: 권한 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/region:
 *   get:
 *     summary: 로그인한 유저의 지역 게시글 목록
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 한 페이지당 개수
 *     responses:
 *       200:
 *         description: 지역 게시글 조회 성공
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: 게시글에 관심 등록
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 관심 등록할 게시글 ID
 *     responses:
 *       201:
 *         description: 관심 등록 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{id}/like:
 *   delete:
 *     summary: 게시글 관심 해제
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 관심 해제할 게시글 ID
 *     responses:
 *       200:
 *         description: 관심 해제 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /posts/{id}/status:
 *   patch:
 *     summary: 게시글 상태 변경
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [selling, reserved, sold]
 *     responses:
 *       200:
 *         description: 상태 변경 성공
 *       400:
 *         description: 잘못된 요청
 *       403:
 *         description: 권한 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: 게시글 검색
 *     tags: [Post]
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [recent, price_asc, price_desc]
 *         description: 정렬 조건
 *     responses:
 *       200:
 *         description: 검색 결과 반환
 *       400:
 *         description: 잘못된 요청
 */
