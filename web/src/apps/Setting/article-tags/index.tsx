import * as React from "react";
import axios from "../../../common/axios";
import "./style.less";

interface ITagState {
    tags: Array<{
        id: number;
        title: string;
        icon: string;
        created_at: string;
    }>
}

export default class ArticleTagsSetting extends React.Component {

    public state: ITagState = {
        tags: []
    };

    public componentWillMount() {
        this.load().then();
    }

    public render() {
        return <div className="app-setting-article-tags">
            <div className="options">
                <button>添加分类</button>
            </div>
            <ul>
                {this.state.tags.map(tag => {
                    return <li key={tag.id}>
                        <div className="info">
                            <img src={tag.icon} alt=""/>
                            <span>{tag.title}</span>
                        </div>
                        <div className="btn-group">
                            <button>修改</button>
                            <button>删除</button>
                        </div>
                    </li>
                })}
            </ul>
        </div>;
    }

    private async load() {
        const tags = (await axios.get("/api/tag/list")).data;
        this.setState({tags});
    }
}