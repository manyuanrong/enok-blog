import * as React from "react";
import axios from "../../../common/axios";
import "./TagsChooser.less";

interface ITagsChooserState {
    tags: Array<{
        id: string;
        title: string;
        icon: string;
    }>;
    ids: any
}

interface ITagsChooserProps {
    value: Array<{
        id: string;
        title: string;
        icon: string;
    }>;

    onChange(tags: Array<{
        id: string;
        title: string;
        icon: string;
    }>): any;
}

export default class TagsChooser extends React.Component<ITagsChooserProps, any> {
    public state: ITagsChooserState = {
        tags: [],
        ids: {}
    };

    public componentWillMount() {
        axios.get("/api/tag/list").then(res => {
            this.setState({tags: res.data});
        });
    }

    public render() {
        return <div className="com-tags-chooser com-form-input">
            <span>分类</span>
            <div className="selected">
                {this.props.value.map(
                    (tag) => <span key={tag.id}>{tag.title}</span>
                )}
                <ul className="list">
                    {this.state.tags.map((tag) => <li
                        key={tag.id} className={this.props.value.find(t => t.id === tag.id) ? "active" : ""}
                        onClick={() => this.onClick(tag)}>{tag.title}
                    </li>)}
                </ul>
            </div>

        </div>
    }

    private onClick = (tag: any) => {
        const tags = this.props.value;
        if (tags.find(t => t.id === tag.id)) {
            this.props.onChange(tags.filter(t => t.id !== tag.id));
        } else {
            this.props.onChange([...tags, tag]);
        }
    }
}