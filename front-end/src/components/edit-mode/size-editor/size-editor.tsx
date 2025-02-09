import { useAppSelector } from "../../../app/hooks";
import "./search-editor.css";

// TODO:: Delete Component
type Props = {
    children: React.ReactNode;

    // Optional
    defaultSize?: number;
};

export default function SizeEditor(props: Props) {
    // State
    const editMode = useAppSelector((state) => state.edit.editMode);

    // Render
    return (
        <div
            className={'size-editor' + (editMode ? ' edit-mode' : '')}
        >
            {props.children}

            {/* Controls */}
            {editMode && (
                <>
                    <div className="control left">
                    </div>
                    <div className="control right">
                    </div>
                </>
            )}
        </div>
    )
}