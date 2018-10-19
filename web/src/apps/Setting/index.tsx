import * as React from "react";
import AppWindow from "../../components/AppWindow";

import ImageSetting from "./image";
import "./style.less";

const pages = [{
    title: "文章管理",
    component: require("./article").default,
}, {
    title: "照片管理",
    component: ImageSetting,
}];

export default class SettingApp extends AppWindow {

    public state = {
        x: 0,
        y: 0,
        width: 1000,
        height: 400,
        title: "管理",
        page: 0
    };

    public renderContent(): JSX.Element | JSX.Element[] {
        const Page = pages[this.state.page].component;
        return <div className="app-setting">
            <ul className="nav">
                {pages.map((page, index) => {
                    return <li key={index} className={this.state.page === index ? "active" : ""}
                               onClick={() => this.pageChange(index)}>
                        <img src="" alt=""/>
                        <span>{page.title}</span>
                    </li>;
                })}
            </ul>
            <div className="page">
                <Page/>
            </div>
        </div>;
    }

    private pageChange = (page: number) => {
        this.setState({page});
    };
}