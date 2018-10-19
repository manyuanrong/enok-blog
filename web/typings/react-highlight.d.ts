interface IReactHighlightProps {
    language?: string;
}

declare module "react-highlight" {
    export default class ReactHighlight extends React.Component<IReactHighlightProps, any> {
    }
}