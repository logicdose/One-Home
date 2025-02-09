import { ReactNode } from "react";
import "./dialog.css";
import { CloseRounded } from "@mui/icons-material";

type Props = {
    children: ReactNode;
    title: string;
    showClose?: boolean;
    open: boolean;
    onClose: () => void;
};

export default function Dialog(props: Props) {
    return (
        <>
            <div
                className="dialog-overlay"
                style={{
                    display: props.open ? "flex" : "none"
                }}
            >
                <div className="dialog">
                    <div className="header">
                        <h3>
                            {props.title}
                        </h3>

                        <button
                            className="close"
                            style={{
                                display: (props.showClose ?? true) ? "block" : "none"
                            }}
                            onClick={props.onClose}
                        >
                            <CloseRounded />
                        </button>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}