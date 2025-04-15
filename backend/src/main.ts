import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Activation CORS (ESSENTIEL pour les requêtes frontend)
app.enableCors({
  origin: 'http://localhost:3000', // Adresse de votre frontend React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Important pour les cookies/sessions
  allowedHeaders: 'Content-Type,Authorization'
});
  // Ajouter le ValidationPipe pour activer la validation globale
  app.useGlobalPipes(new ValidationPipe({
    transform: true,    // Transforme les données pour qu'elles correspondent au type attendu dans le DTO
    whitelist: true,    // Supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // Lève une erreur si une propriété non définie est présente
    disableErrorMessages: false, // Permet d'afficher des messages d'erreur détaillés
  }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
