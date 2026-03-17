import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CS2 Competitive API',
            version: '1.0.0',
            description: 'A REST API for managing players and clubs in the CS2 competitive scene.',
        },
    },
    apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);