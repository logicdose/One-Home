import "./button.css";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
};

export default function Button(props: Props) {
    return (
        <button
            className="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}