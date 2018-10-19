import {observer} from "mobx-react";
import * as React from "react";
import {FormEvent} from "react";
import axios from "../../common/axios";
import AppStore from "../../store/apps";
import AppWindow from "../AppWindow";
import "./style.less";

@observer
export default class Login extends AppWindow {

    public state = {
        name: "登录",
        username: "",
        password: ""
    };

    public render() {
        return <div className="com-user">
            {!AppStore.user.id && this.renderLogin()}
            {AppStore.user.id && this.renderUserInfo()}
            <button className="cancel" onClick={this.close}>
                <img src={require("../../images/icons/close.png")} alt=""/>
                <span>关闭</span>
            </button>
        </div>;
    }

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div/>;
    }

    private renderLogin() {
        return <form className="box login-box" onSubmit={this.onSubmit}>
            <img src="https://data.manyuanrong.cn/upload/1539778103127.jpeg" alt=""/>
            <input name="username" type="text" onChange={(e) => this.setState({username: e.target.value})}/>
            <input name="password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>
            <button className="login" onClick={this.onSubmit}>→</button>
            <div className="third">
                <img src={require("../../images/icons/github.png")} alt="" onClick={this.onGithubLogin}/>
                <img src={require("../../images/icons/qq-login.png")} onClick={this.onQQLogin} alt=""/>
            </div>
        </form>;
    }

    private renderUserInfo() {
        return <div className="box info-box">
            <img src={AppStore.user.avatar} alt=""/>
            <span className="nickname">{AppStore.user.nick_name}</span>
            <button onClick={this.onLogout}>退出登录</button>
        </div>;
    }

    private onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        AppStore.login(this.state.username, this.state.password);
        const result: any = await axios.post("/api/user/login", {
            username: this.state.username,
            password: this.state.password,
        });
        if (result.success) {
            AppStore.showToast("登录成功", "success");
            await AppStore.checkLogin();
        } else {
            AppStore.showToast(result.msg, "error");
        }
    };

    private onGithubLogin = () => {
        this.thirdLogin("github");
    };

    private onQQLogin = () => {
        this.thirdLogin("qq");
    };

    private thirdLogin = (type: string) => {
        const win = window.open(`/api/user/login/${type}`, "_blank");
        const tid = setInterval(async () => {
            if (win && win.closed) {
                clearInterval(tid);
                console.log("登录成功");
                if (await AppStore.checkLogin()) {
                    AppStore.showToast("登录成功", "success");
                } else {
                    AppStore.showToast("登录失败", "error");
                }
            }
        }, 1000);
    };

    private onLogout = async () => {
        await axios.get("/api/user/logout");
        AppStore.user = {};
    };
}
