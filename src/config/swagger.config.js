const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
function swaggerConfig(app) {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.1.0",
            info: {
                title: 'My Application Divar API',
                version: '1.0.0',
                description: 'API documentation for my application Divar',
            },
        },
        apis: [process.cwd() + "/src/modules/**/*.swagger.js"] // Path to the API docs
    });
    const swagger = swaggerUi.setup(swaggerDocument, {});
    // Serve Swagger UI
      app.use("/",swaggerUi.serve, swagger);
}

module.exports = swaggerConfig;