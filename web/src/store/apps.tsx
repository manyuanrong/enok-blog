import {action, observable} from "mobx";
import * as React from "react";
import AboutApp from "../apps/About";
import ArticleApp from "../apps/Article";
import ArticleDetail from "../apps/Article/detail";
import ArticleEditor from "../apps/Article/editor";
import ImageApp from "../apps/Image";
import LinksApp from "../apps/Links";
import SettingApp from "../apps/Setting";
import axios from "../common/axios";
import AppWindow from "../components/AppWindow";
import Dialog from "../components/Dialog";
import UserApp from "../components/User";

const allApps = {
    "/about": AboutApp,
    "/user": UserApp,
    "/links": LinksApp,
    "/image": ImageApp,
    "/article": ArticleApp,
    "/setting": SettingApp,
    "/article/detail": ArticleDetail,
    "/article/editor": ArticleEditor,
    "/dialog": Dialog,
};

interface IToast {
    visible: boolean;
    message: string,
    type: "error" | "success" | "info"
}

interface IUser {
    id?: number;
    name?: string;
    avatar?: string;
    role?: string;
    nick_name?: string;
}

class Store {
    @observable
    public apps: any [] = [];

    @observable
    public user: IUser;

    @observable
    public toast: IToast = {
        visible: false,
        message: "",
        type: "success"
    };

    @action
    public run(appName: string, params: any = {}, singleton: boolean = false) {
        console.log("run", appName, params);
        const App = allApps[appName];
        if (App) {
            if (singleton) {
                const found = this.apps.find((app: any) => {
                    return app.props.name === appName;
                });
                if (found) {
                    this.active(found);
                    return;
                }
            }
            const id: string = "app" + Date.now();
            const running = <App key={id} id={id} name={appName} params={params || {}}/>;
            console.log(running);
            this.apps.push(running);
        }
    }

    @action
    public exit(app: AppWindow) {
        const id: string = app.props.id;
        this.apps = this.apps.filter((item: any) => item.props.id !== id);
    }

    @action
    public active(app: AppWindow) {
        const id: string = app.props.id;
        const currentApp = this.apps.find((item: any) => item.props.id === id);
        const apps = this.apps.filter((item: any) => item.props.id !== id);
        this.apps = [...apps, currentApp];
    }

    @action
    public login(username: string, password: string) {
        console.log(username, password);
    }

    @action
    public showToast(message: string, type: "error" | "success" | "info" = "success", time: number = 3000) {
        this.toast = {message, type, visible: true};
        setTimeout(() => this.toast.visible = false, time);
    }

    @action
    public async checkLogin() {
        const user = (await axios.get("/api/user/info")).data;
        if (user) {
            this.user = user;
            return true;
        } else {
            this.user = {};
            return false;
        }
    }
}

const AppStore = new Store();
export default AppStore;
