import * as React from "react";
import AppWindow from "../../components/AppWindow";

import {observer} from "mobx-react";
import * as moment from "moment";
import AppStore from "../../store/apps";
import store from "./store";
import "./style.less";

@observer
export default class ArticleApp extends AppWindow {

    public state = {
        x: 0,
        y: 0,
        width: 1000,
        height: 600,
        title: "文章"
    };

    public componentWillMount() {
        store.loadList().then();
        store.showAllArticles().then();
    }

    public renderContent(): JSX.Element | JSX.Element[] {
        return <div className="app-article">
            <div className="nav">

                <button className="btn" onClick={() => store.showAllArticles()}>全部文章</button>
                <button className="btn" onClick={this.showEditor}>写新文章</button>

                {
                    store.list.tag &&
                    <div className="articles category">
                        <h5>分类</h5>
                        <ul className="groups">
                            {store.list.tag.map((record) => {
                                return <li key={record.id}
                                           onClick={() => store.showTagArticles(record.id, record.title)}>
                                    <img src={record.icon} alt=""/>
                                    <span>{record.title}</span>
                                </li>;
                            })}
                        </ul>
                    </div>
                }

                {
                    store.list.date &&
                    <div className="articles date">
                        <h5>归档</h5>
                        <ul className="groups">
                            {store.list.date.map((record) => {
                                return <li key={record.date} onClick={() => store.showDateArticles(record.date)}>
                                    <span>{record.date}</span>
                                </li>;
                            })}
                        </ul>
                    </div>
                }

            </div>

            <div className="list">
                <div className="header">
                    <span>文章 ＞ </span>
                    <span>{store.currentTitle}</span>
                </div>
                <ul>
                    {store.articles && store.articles.map((record) => {
                        return <li key={record.id}>
                            <h3>
                                <span className="title"
                                      onClick={() => store.showDetail(record.id)}>{record.title}</span>
                                <span className="date">{moment(record.created_at).format("YYYY-MM-DD HH:mm")}</span>
                            </h3>
                            {record.banner && <img src={record.banner} alt=""/>}
                            <p>{record.summary}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>;
    }

    private showEditor() {
        AppStore.run("/article/editor", null, true);
    }
}