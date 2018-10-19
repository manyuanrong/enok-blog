import * as React from "react";
import {ChangeEvent} from "react";
import axios from "../../common/axios";
import "./style.less";

export interface IInputProps {
    label: string;
    type: "text" | "upload" | "textarea";
    value: string;

    onChange(value: string): void;
}

export default class Input extends React.Component<IInputProps, any> {
    public static defaultProps = {
        type: "text",
        onChange(value: string) {
            console.log(value);
        }
    };

    public render() {
        return <div className="com-form-input">
            <span>{this.props.label}</span>
            {(this.props.type === "text" || this.props.type === "upload") &&
            <input value={this.props.value} type="text" onChange={(e) => this.props.onChange(e.target.value)}/>}
            {this.props.type === "textarea" &&
            <textarea rows={3} value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}/>}
            {this.props.type === "upload" &&
            <button className="upload"><input onChange={this.onChangeFile} type="file"/>上传</button>}
        </div>
    }

    private onChangeFile = async (e: ChangeEvent) => {
        const target: any = e.target;
        if (target.files && target.files.length) {
            const file: File = target.files[0];
            const formData: FormData = new FormData();
            formData.append("file", file);
            const result = await axios.post("/api/file/upload", formData);
            this.props.onChange(result.data);
        }
    };
}