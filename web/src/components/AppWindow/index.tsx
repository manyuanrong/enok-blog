import * as React from "react";
import * as ReactDOM from "react-dom";
import AppStore from "../../store/apps";

import "./style.less";

import IconClose from "./close.svg";
import IconHide from "./hide.svg";
import IconMax from "./max.svg";

export interface IAppInfo {
    name: string,
    id: string,
    params?: any,
}

export interface IAppState {
    x?: number;
    y?: number;
    title: string;
    width: number | string;
    height: number | string;
}

export default abstract class AppWindow extends React.Component<IAppInfo, any> {

    public state: IAppState & any = {
        x: 0,
        y: 0,
        title: "",
        width: 400,
        height: 200,
        resizing: "",
    };

    public needLogin = false;

    private dragInfo = {
        moving: false,
        x: 0,
        y: 0
    };

    private oldOptions = {
        isMax: false,
        width: 0,
        height: 0,
        x: 0,
        y: 0
    };

    private center: boolean = true;

    public componentDidMount() {
        if (this.center) {
            this.reCenter();
        }
    }

    public componentWillMount() {
        if (this.needLogin && !(AppStore.user && AppStore.user.id)) {
            AppStore.run("/user", null, true);
            this.close();
        }
    }

    public abstract renderContent(): JSX.Element | JSX.Element[];

    public renderOptions(): Array<{ title: string, icon?: string, onClick?(e: any): any }> {
        return [];
    }

    public render() {
        const {x: left, y: top} = this.state;
        const style = {
            top,
            left,
            width: this.state.width,
            height: this.state.height,
        };
        return <div style={style} className={`window ${this.state.resizing}`} onMouseDown={this.onActive}>
            <div className="title-bar" onMouseDown={this.onMouseDown} onDoubleClick={this.onMax}>
                <h6>{this.state.title}</h6>
                <div className="buttons" onMouseDown={this.onStopMouseDown}>
                    <a className="close" onClick={this.onClose}><IconClose/></a>
                    <a className="hide"><IconHide/></a>
                    <a className="max" onClick={this.onMax}><IconMax/></a>
                </div>
                <div className="options" onMouseDown={this.onStopMouseDown}>
                    {this.renderOptions().map((option, index) => {
                        return <div className="option" key={index} onClick={option.onClick}>
                            <img src={option.icon} alt=""/>
                            <span>{option.title}</span>
                        </div>
                    })}
                </div>
            </div>
            <div className="body">
                {this.renderContent()}
            </div>
        </div>
    }

    public onActive = (event: any) => {
        AppStore.active(this);
    };

    public onStopMouseDown = (event: any) => {
        event.stopPropagation();
    };

    public close = () => {
        AppStore.exit(this);
    };

    public onMouseDown = (event: any) => {
        event.persist();
        const {pageX, pageY} = event;
        this.dragInfo.moving = true;
        this.dragInfo.x = pageX;
        this.dragInfo.y = pageY;
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
    };

    private reCenter() {
        const parent: Element = ReactDOM.findDOMNode(this)!.parentElement!;
        const {clientWidth, clientHeight} = parent;
        this.setState({
            x: (clientWidth - this.state.width) / 2,
            y: (clientHeight - this.state.height) / 2,
        });
    }

    private onClose = (event: any) => {
        AppStore.exit(this);
    };

    private onMax = (event: any) => {
        setTimeout(() => this.setState({resizing: ""}), 600);
        if (this.oldOptions.isMax) {
            this.setState({
                width: this.oldOptions.width,
                height: this.oldOptions.height,
                x: this.oldOptions.x,
                y: this.oldOptions.y,
                resizing: "resizing"
            });
            this.oldOptions.isMax = false;
        } else {
            const parent: Element = ReactDOM.findDOMNode(this)!.parentElement!;
            const {clientWidth, clientHeight} = parent;
            this.setState({
                resizing: "resizing",
                width: clientWidth,
                height: clientHeight - 80,
                x: 0,
                y: 0,
            });
            this.oldOptions.isMax = true;
            this.oldOptions = {
                isMax: true,
                x: this.state.x,
                y: this.state.y,
                width: this.state.width,
                height: this.state.height
            };
        }
    };

    private onMouseMove = (event: MouseEvent) => {
        const {pageX, pageY} = event;
        this.setState({
            x: this.state.x + pageX - this.dragInfo.x,
            y: this.state.y + pageY - this.dragInfo.y
        });
        this.dragInfo.x = pageX;
        this.dragInfo.y = pageY;
    };

    private onMouseUp = () => {
        this.dragInfo.moving = false;
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
    };
}