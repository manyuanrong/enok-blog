import * as React from "react";
import AppLink from "../../components/AppLink";
import AppWindow from "../../components/AppWindow";

import "./style.less";

export default class AboutApp extends AppWindow {
    public state = {
        x: 0,
        y: 0,
        width: 600,
        height: 500,
        title: "关于我"
    };

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="app-about">
            <img src={require("./avatar.jpg")} alt=""/>
            <h1>Enok (满远荣)</h1>
            <h3>Email: <a href="mailto:416828041@qq.com">416828041@qq.com</a></h3>
            <h3>Github: <a target="_blank" href="http://github.com/fengmu456">github.com/fengmu456</a></h3>
            <AppLink name="/links">
                <button style={{fontSize: 16, padding: 10, margin: 20}}>
                    友情链接
                </button>
            </AppLink>
        </div>;
    }
}