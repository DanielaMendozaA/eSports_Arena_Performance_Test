import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerConfig = (app: INestApplication<any>): void => {
    const versionApp = "1.0"
    const config = new DocumentBuilder()
        .setTitle('Smart Shop')
        .setDescription(`E-commerce software`)
        .setVersion(versionApp)   
        .addServer('/api/v1')   
        .addBearerAuth(
            {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            'access-token'
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/docs`, app, document);
}   