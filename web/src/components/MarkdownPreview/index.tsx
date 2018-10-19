import * as React from "react";
import * as Markdown from "react-markdown";
import CodeRender from "./CodeRender";
import "./style.less";

interface IMarkdownPreviewProps {
    content: string;
}

export default class MarkdownPreview extends React.Component<IMarkdownPreviewProps, any> {
    public render(): JSX.Element | JSX.Element[] {
        return <Markdown className="com-markdown-preview" source={this.props.content} renderers={{code: CodeRender}}
                         escapeHtml={false}/>;
    }
}