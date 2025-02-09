import { ReactNode } from "react";
import "./dialog.css";
import Button from "../button/button";

type Props = {
    children: ReactNode;
    title: string;
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

                        <Button
                            onClick={props.onClose}
                        >
                            Close
                        </Button>
                    </div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}