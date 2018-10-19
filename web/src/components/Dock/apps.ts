export interface IDockApp {
    name: string;
    icon: string;
    app: string;
}

const apps: IDockApp[] = [
    {
        name: "关于",
        app: "/about",
        icon: require("../../images/icons/about.png"),
    },
    {
        name: "QQ",
        app: "/about",
        icon: require("../../images/icons/qq.png"),
    },
    {
        name: "文章",
        app: "/article",
        icon: require("../../images/icons/posts.png"),
    },
    {
        name: "照片",
        app: "/image",
        icon: require("../../images/icons/images.png"),
    },
    {
        name: "友情链接",
        app: "/links",
        icon: require("../../images/icons/links.png"),
    },
    {
        name: "设置",
        app: "/setting",
        icon: require("../../images/icons/setting.png"),
    },
];

export default apps;