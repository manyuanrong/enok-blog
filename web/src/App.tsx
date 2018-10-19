import {observer} from "mobx-react";
import * as React from "react";
import {Component} from "react";
import Dock from "./components/Dock";
import Toast from "./components/Toast";
// import TopBar from "./components/TopBar";
import AppStore from "./store/apps";


interface IDesktopApp {
    title: string;
    icon?: string;
    params?: any;
    app?: string;
}

const apps: IDesktopApp[] = [{
    title: "用户",
    icon: require("./images/icons/user.png"),
    app: "/user",
    params: null,
}, {
    title: "文章",
    icon: require("./images/icons/posts.png"),
    app: "/article",
    params: null,
}, {
    title: "友情链接",
    icon: require("./images/icons/links.png"),
    app: "/links",
    params: null,
}];

@observer
export default class App extends Component {
    public render() {
        return <div className="layout-desktop">
            {/*<TopBar/>*/}
            <div className="content">
                <div className="icons">
                    {apps.map((app, index) => {
                        return <div key={index} onDoubleClick={() => this.onAppClick(app)}>
                            <img src={app.icon} alt=""/>
                            <span>{app.title}</span>
                        </div>
                    })}
                </div>
                {AppStore.apps.map((app: any) => app)}
            </div>
            <Dock/>
            {AppStore.toast.visible && <Toast/>}
        </div>;
    }

    public componentDidMount() {
        const path = location.pathname;
        const params: any = {};
        if (location.search) {
            const search: string[] = location.search.substr(1).split("&");
            for (const paramStr of search) {
                const param: string[] = paramStr.split("=");
                params[param[0]] = param[1];
            }
        }
        AppStore.checkLogin().then(() => AppStore.run(path, params));
    }

    private onAppClick(app: IDesktopApp) {
        if (app.app) {
            AppStore.run(app.app, app.params, true)
        }
    }
}