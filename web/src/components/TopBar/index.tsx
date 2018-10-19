import * as React from "react";
import "./style.less";

export default class TopBar extends React.Component {
    public render() {
        return <div className="com-top-bar">
            {this.renderIcons()}
        </div>
    }

    public renderIcons() {
        return <div className="icons">icons</div>
    }
}