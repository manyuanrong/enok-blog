import {observer} from "mobx-react";
import * as React from "react";
import AppStore from "../../store/apps";
import "./style.less";

const icons = {
    success: require("./success.png"),
    error: require("./error.png"),
    info: require("./info.png"),
};

@observer
export default class Toast extends React.Component {
    public render() {
        return <div className="com-toast">
            <div className="box">
                <img src={icons[AppStore.toast.type]} alt=""/>
                <p>{AppStore.toast.message}</p>
            </div>
        </div>
    }
}