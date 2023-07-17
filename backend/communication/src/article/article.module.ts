import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ArticleCategory, ArticleCategorySchema} from './entities/article.category.entity';
import {Article, ArticleSchema} from './entities/article.entity';
import {ArticleController} from './article.controller';
import {ArticleService} from './article.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Article.name, schema: ArticleSchema},
            {name: ArticleCategory.name, schema: ArticleCategorySchema}
        ])
    ],
    controllers: [ArticleController],
    providers: [ArticleService]
})
export class ArticleModule {
}
