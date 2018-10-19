import "highlight.js/styles/github.css";
import * as React from "react";
import ReactHighlight from "react-highlight";

interface ICodeRenderProps {
    language: string;
    value: string;
}

export default class CodeRender extends React.Component<ICodeRenderProps, any> {
    public componentDidMount() {
        console.log(this.props);
    }

    public render(): JSX.Element | JSX.Element[] {
        return <ReactHighlight language={this.props.language}>{this.props.value}</ReactHighlight>;
    }
}