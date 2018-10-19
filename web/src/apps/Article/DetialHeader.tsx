import * as moment from "moment";
import * as React from "react";
import "./detail.less";

interface IArticleDetailHeaderProps {
    title: string;
    created_at: string;
    summary?: string;
    banner?: string;
    tags?: [{
        id: number;
        title: string;
    }]
}

export default class ArticleDetailHeader extends React.Component<IArticleDetailHeaderProps, any> {
    public render(): JSX.Element | JSX.Element[] {
        return <div className="com-article-detail-header">
            <span className="title">{this.props.title}</span>
            <ul className="tags">
                <li>
                    发布时间：
                    {moment(this.props.created_at).format("YYYY-MM-DD HH:mm")}
                </li>
                {this.props.tags && this.props.tags.map((record: any) => {
                    return <li key={record.id}>{record.title}</li>;
                })}
            </ul>
            <img src={this.props.banner} alt=""/>
            {this.props.summary && <blockquote>{this.props.summary}</blockquote>}
        </div>;
    }
}