import { CheckRounded, EditRounded } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setEditMode } from "../../states/edit-state"
import './edit-mode-overlay.css'

export default function EditModeOverlay() {
    // State
    const editMode = useAppSelector((state) => state.edit.editMode)
    const dispatch = useAppDispatch()

    // Render
    return (
        <>
            {/* Edit Button */}
            <div
                className={'edit-mode-overlay' + (editMode ? ' active' : '')}
            >
                <button
                    onClick={() => {
                        dispatch(setEditMode(!editMode))
                    }}
                >
                    {editMode ? <CheckRounded /> : <EditRounded />}
                </button>
            </div>

            {/* Toolbar */}
            <div
                className={"edit-mode-toolbar-container" + (editMode ? ' active' : '')}
            >
                <div className="toolbar">

                </div>
            </div>
        </>
    )
}