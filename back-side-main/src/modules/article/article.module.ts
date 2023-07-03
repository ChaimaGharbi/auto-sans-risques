import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleCategory, ArticleCategorySchema } from 'src/entities/article.category.entity';
import { Article, ArticleSchema } from 'src/entities/article.entity';
import { ArticleCategoryRepository } from 'src/repositories/article.category.repository';
import { ArticleRepository } from 'src/repositories/article.repository';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleCategory.name, schema: ArticleCategorySchema }
    ])
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleCategoryRepository, ArticleRepository]
})
export class ArticleModule {}
