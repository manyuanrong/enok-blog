import * as React from "react";
import AppWindow, {IAppState} from "../../../components/AppWindow";

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/idea.css';
import {observer} from "mobx-react";
import * as CodeMirror from "react-codemirror";
import axios from "../../../common/axios";
import Input from "../../../components/Form/Input";
import MarkdownPreview from "../../../components/MarkdownPreview";
import AppStore from "../../../store/apps";
import ArticleDetailHeader from "../DetialHeader";
import "./style.less";
import TagsChooser from "./TagsChooser";

interface IArticleEditorState extends IAppState {
    article: {
        title: string;
        summary: string;
        banner: string;
        created_at: string;
        id?: string;
    },
    tags: Array<{
        id: string;
        title: string;
        icon: string;
    }>,
    collapse: boolean;
    content: string;
}

@observer
export default class ArticleEditor extends AppWindow {

    public needLogin = true;

    public state: IArticleEditorState = {
        width: 1300,
        height: 800,
        title: "写文章",
        article: {
            title: "文章标题",
            summary: "",
            banner: "",
            created_at: new Date().toUTCString(),
        },
        tags: [],
        collapse: true,
        content: ""
    };

    private codeMirror: any;

    public componentWillMount() {
        super.componentWillMount();
    }

    public componentDidMount() {
        super.componentDidMount();
        const {id} = this.props.params;
        if (id) {
            this.load(id).then();
        }
    }

    public async load(id: number) {
        const article = (await axios.get("/api/article/detail", {params: {id}})).data;
        console.log(article);
        this.setState({
            article,
            title: article.title,
            tags: article.article_tags.map((r: any) => r.tag),
            content: article.content,
            id,
        });
        if (this.codeMirror) {
            this.codeMirror.getCodeMirror().doc.setValue(article.content);
        }
    }

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="app-article-editor">
            <div className="header">
                <div className="base">
                    <Input value={this.state.article.title} label="标题" type="text"
                           onChange={(value) => this.onChangeInfo("title", value)}/>
                    {!this.state.collapse && <div>
                        <Input value={this.state.article.banner} label="封面" type="upload"
                               onChange={(value) => this.onChangeInfo("banner", value)}/>
                        <TagsChooser value={this.state.tags} onChange={(tags) => this.setState({tags})}/>
                        <Input value={this.state.article.summary} label="摘要" type="textarea"
                               onChange={(value) => this.onChangeInfo("summary", value)}/>
                    </div>}
                </div>
            </div>
            <div className="collapse" onClick={this.onCollapse}>{this.state.collapse ? "编辑更多" : "收起"}</div>
            <div className="content">
                <div className="editor">
                    <CodeMirror
                        ref={(i: any) => this.codeMirror = i}
                        onChange={this.onChange}
                        value={this.state.content}
                        options={{
                            mode: {name: "markdown"},
                            theme: "idea",
                            lineNumbers: true,
                        }}/>
                </div>
                <div className="preview">
                    <ArticleDetailHeader title={this.state.article.title} created_at={this.state.article.created_at}
                                         summary={this.state.article.summary}/>
                    <MarkdownPreview content={this.state.content}/>
                </div>
            </div>
        </div>;
    }

    public renderOptions() {
        return [{title: "保存", icon: require("../images/save.png"), onClick: this.onSave}];
    }

    private onChange = (content: string) => {
        this.setState({content});
    };

    private onChangeInfo = (prop: string, content: string) => {
        const article = this.state.article;
        article[prop] = content;
        this.setState({article: {...article}});
    };

    private onCollapse = () => {
        this.setState({collapse: !this.state.collapse});
    };

    private onSave = async () => {
        if (!this.state.article.title.trim()) {
            AppStore.showToast("请填写文章标题", "error", 2000);
            return;
        }
        if (this.state.content.length < 100) {
            AppStore.showToast("文章内容至少100个字符", "error", 2000);
            return;
        }
        if (this.state.article.id) {
            const res: any = await axios.post("/api/article/save", {
                id: this.state.article.id,
                title: this.state.article.title,
                summary: this.state.article.summary,
                banner: this.state.article.banner,
                tags: this.state.tags.map(tag => tag.id),
                content: this.state.content,
            });
            if (res.success) {
                AppStore.showToast("保存成功", "success", 2000);
            } else {
                AppStore.showToast(res.msg, "error", 2000);
            }
        } else {
            const res: any = await axios.post("/api/article/add", {
                title: this.state.article.title,
                summary: this.state.article.summary,
                banner: this.state.article.banner,
                tags: this.state.tags.map(tag => tag.id),
                content: this.state.content,
            });
            if (res.success) {
                AppStore.showToast(res.msg, "success", 2000);
                await this.load(res.data.id);
            } else {
                AppStore.showToast(res.msg, "error", 2000);
            }
        }

    };
}