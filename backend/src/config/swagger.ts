import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '당근마켓 클론 API',
      version: '1.0.0',
      description: '자동 생성되는 Swagger API 문서입니다.',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts'], // 하위 폴더까지 자동 인식
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;