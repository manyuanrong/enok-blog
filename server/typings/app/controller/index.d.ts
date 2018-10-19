// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Article from '../../../app/controller/article';
import File from '../../../app/controller/file';
import Home from '../../../app/controller/home';
import Tag from '../../../app/controller/tag';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    article: Article;
    file: File;
    home: Home;
    tag: Tag;
    user: User;
  }
}
