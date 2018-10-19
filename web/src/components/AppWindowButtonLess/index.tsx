import * as React from "react";
import AppWindow from "../AppWindow";

export default abstract class AppWindowButtonLess extends AppWindow {

    public render() {
        const {x: left, y: top} = this.state;
        const style = {
            top,
            left,
            width: this.state.width,
            height: this.state.height,
        };
        return <div style={style} className="window" onMouseDown={this.onActive}>
            <div className="title-bar" onMouseDown={this.onMouseDown}>
                <h6>{this.state.title}</h6>
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

    public abstract renderContent(): JSX.Element | JSX.Element[] ;
}
