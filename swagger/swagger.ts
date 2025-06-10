import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TS Project',
      version: '1.0.0',
      description: 'Meeting - Members API',
    },
    servers: [
      {
        url: 'http://localhost:3001',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../controllers/*.ts'),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;




// // swagger/swagger.ts
// import swaggerJsdoc from 'swagger-jsdoc';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // ✅ ES module-compatible __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const swaggerOptions: swaggerJsdoc.Options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'TS Project',
//       version: '1.0.0',
//       description: 'Meeting - Members API',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3001',
//       },
//     ],
//   },
//   apis: [
//     path.join(__dirname, '../routes/*.ts'),
//     path.join(__dirname, '../controllers/*.ts'),
//   ],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// export default swaggerSpec;
