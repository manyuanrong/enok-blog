import {Component} from "react";

import * as React from "react";
import "./style.less";

import AppStore from "../../store/apps";
import apps, {IDockApp} from "./apps";

export default class Dock extends Component {
    public render() {
        return <div className="com-dock">
            <ul>
                {apps.map((app, index) => {
                    return <li key={"app" + index} onClick={this.onClick.bind(this, app)}>
                        <div className="icon" style={{backgroundImage: `url(${app.icon})`}}/>
                        <span>{app.name}</span>
                    </li>
                })}
            </ul>
        </div>;
    }

    private onClick(app: IDockApp) {
        AppStore.run(app.app, null, true);
    }
}