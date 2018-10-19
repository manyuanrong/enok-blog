import * as React from "react";
import AppStore from "../../store/apps";

interface IAppLinkProps {
    name: string
}

export default class AppLink extends React.Component<IAppLinkProps, any> {
    public render() {
        return <div onClick={this.onClick} style={{cursor: "pointer"}}>{this.props.children}</div>;
    }

    private onClick = () => {
        AppStore.run(this.props.name);
    }
}