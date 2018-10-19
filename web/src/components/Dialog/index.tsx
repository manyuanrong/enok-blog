import {observer} from "mobx-react";
import * as React from "react";
import AppStore from "../../store/apps";
import AppWindowButtonLess from "../AppWindowButtonLess";
import "./style.less";

@observer
export default class Dialog extends AppWindowButtonLess {

    public static confirm(params: { title?: string, text: string, onConfirm?(): any, onCancel?(): any }) {
        AppStore.run("/dialog", params, false);
    }

    public state = {
        title: "提示",
        width: 400,
        x: 0,
        y: 0,
        height: 150
    };

    public render() {
        return <div className="dialog-mask">
            {super.render()}
        </div>
    }

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="dialog">
            <p>{this.props.params.text}</p>
            <div className="buttons">
                <button onClick={this.onCancel}>取消</button>
                <button onClick={this.onConfirm}>确定</button>
            </div>
        </div>;
    }

    private onCancel = () => {
        if (this.props.params.onCancel) {
            this.props.params.onCancel();
        }
        this.close();
    };

    private onConfirm = () => {
        if (this.props.params.onConfirm) {
            this.props.params.onConfirm();
        }
        this.close();
    };
}
