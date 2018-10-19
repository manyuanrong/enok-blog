import * as React from "react";
import AppWindow from "../../components/AppWindow";

import "./style.less";

export default class ImageApp extends AppWindow {

    public state = {
        x: 0,
        y: 0,
        width: 1000,
        height: 400,
        title: "照片"
    };

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="app-image">
            <ul className="groups">
                <li>
                    <img src="" alt=""/>
                    <span>哈尔滨7日游</span>
                </li>
                <li className="active">
                    <img src="" alt=""/>
                    <span>哈尔滨7日游</span>
                </li>
                <li>
                    <img src="" alt=""/>
                    <span>哈尔滨7日游</span>
                </li>
            </ul>
            <ul className="images">
                <li>
                    <img src="" alt=""/>
                </li>
            </ul>
        </div>;
    }
}