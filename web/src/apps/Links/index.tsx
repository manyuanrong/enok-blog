import * as React from "react";
import AppWindow from "../../components/AppWindow";

import "./style.less";

import data from "./data";

export default class LinksApp extends AppWindow {

    public state = {
        x: 0,
        y: 0,
        width: 600,
        height: 400,
        title: "友情链接"
    };

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="app-links">
            <ul className="links">
                {data.filter(item => item.logo).map((link, index) => <li key={index} className="image">
                    <a href={link.url} target="_blank">
                        <img src={link.logo} alt={link.title} style={{backgroundColor: link.bgColor}}/>
                        <span>{link.title}</span>
                    </a>
                </li>)}
            </ul>
            <ul className="links">
                {data.filter(item => !item.logo).map((link, index) => <li key={index} className="text">
                    <a href={link.url} target="_blank">
                        <span>{link.title}</span>
                    </a>
                </li>)}
            </ul>
        </div>;
    }
}