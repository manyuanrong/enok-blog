import * as React from "react";
import AppWindow from "../../components/AppWindow";

import {observer} from "mobx-react";
import axios from "../../common/axios";
import wrapResult from "../../common/util";
import Dialog from "../../components/Dialog";
import MarkdownPreview from "../../components/MarkdownPreview";
import AppStore from "../../store/apps";
import "./detail.less";
import ArticleDetailHeader from "./DetialHeader";

@observer
export default class ArticleDetail extends AppWindow {

    public state: any = {
        x: 0,
        y: 0,
        width: 1000,
        height: 800,
        title: "文章",
        article: {},
    };

    public componentWillMount() {
        this.load().then();
    }

    public async load() {
        const {id} = this.props.params;
        const article = (await axios.get("/api/article/detail", {params: {id}})).data;
        console.log(article);
        this.setState({article, title: article.title});
    }

    public renderOptions() {
        return [
            {title: "编辑", icon: require("./images/edit.png"), onClick: this.onEdit},
            {
                title: "删除", icon: require("./images/delete.png"), onClick: () => {
                    Dialog.confirm({
                        text: "是否确定要删除文章？",
                        onConfirm: async () => {
                            if (await wrapResult(axios.delete(`/api/article/${this.props.params.id}`))) {
                                this.close();
                            }
                        }
                    })
                }
            },
        ]
    }

    public renderContent(): JSX.Element | JSX.Element[] {
        return this.state.article.content ?
            <div className="app-article-detail">
                <ArticleDetailHeader
                    title={this.state.article.title} created_at={this.state.article.created_at}
                    summary={this.state.article.summary}
                    banner={this.state.article.banner}
                    tags={this.state.article.article_tags.map((record: any) => record.tag)}/>
                <MarkdownPreview content={this.state.article.content}/>
            </div> :
            <div style={{
                height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 18
            }}>Loading</div>;
    }

    private onEdit = () => {
        AppStore.run("/article/editor", {id: this.props.params.id}, true);
    }
}