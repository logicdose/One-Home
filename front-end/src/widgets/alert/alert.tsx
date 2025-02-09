import { CodeRounded } from "@mui/icons-material";
import "./alert.css";
import Spacer from "../spacer";

type Props = {
    message: string;
};

export default function Alert(message: Props) {
    return (
        <div className="alert">
            <CodeRounded />
            <Spacer width={8} />
            <div className="alert-message">{message.message}</div>
        </div>
    );
}