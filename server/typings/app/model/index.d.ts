// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Article from '../../../app/model/article';
import ArticleTag from '../../../app/model/article_tag';
import Comment from '../../../app/model/comment';
import Tag from '../../../app/model/tag';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    Article: ReturnType<typeof Article>;
    ArticleTag: ReturnType<typeof ArticleTag>;
    Comment: ReturnType<typeof Comment>;
    Tag: ReturnType<typeof Tag>;
    User: ReturnType<typeof User>;
  }
}
