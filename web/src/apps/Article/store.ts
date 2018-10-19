import {action, observable} from "mobx";
import axios from "../../common/axios";
import AppStore from "../../store/apps";

interface IListResult {
    tag?: [any];
    date?: [any];
}

interface IArticle {
    title: string;
    banner?: string
    tags: [any],
    created_at: string,
    updated_at?: string,
    user_id: number,
    summary?: string,
    id: number,
}

class ArticleStore {
    @observable
    public list: IListResult = {};

    @observable
    public articles: [IArticle];

    @observable
    public currentTitle: string = "全部";

    @action
    public async loadList() {
        const result = await axios.get("/api/article/list");
        this.list = result.data;
        console.log(result);
    }

    @action
    public async showTagArticles(tagId: string, title: string) {
        const tagArticles = (await axios.get("/api/article/tag/list", {params: {tag_id: tagId}})).data.rows;
        this.showArticles(title, tagArticles.map((record: any) => record.article));
    }

    @action
    public async showAllArticles() {
        const articles = (await axios.get("/api/article/all")).data.rows;
        this.showArticles("全部", articles);
    }

    @action
    public async showDateArticles(date: string) {
        const articles = (await axios.get("/api/article/date/list", {params: {date}})).data.rows;
        this.showArticles(date, articles);
    }

    @action
    public showArticles(title: string, articles: [IArticle]) {
        this.currentTitle = title;
        this.articles = articles;
    }

    @action
    public showDetail(id: number) {
        AppStore.run("/article/detail", {id}, false);
    }
}

const store = new ArticleStore();
export default store;