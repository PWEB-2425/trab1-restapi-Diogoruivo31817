

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão de Alunos',
      version: '1.0.0',
      description: 'CRUD de Alunos e Cursos usando Express + MongoDB Atlas'
    },
    servers: [
      { url: 'http://localhost:3002' }  // Quando em produção, muda para a URL real
    ],
  },
  apis: ['./server.js'],  // lê os comentários JSDoc aí mesmo
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
