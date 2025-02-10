import { AddPhotoAlternateRounded, CheckRounded, EditRounded, HideImageRounded } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setAppBackground, setEditMode } from "../../states/edit-state"
import './edit-mode-overlay.css'
import SearchImageApi from "../../storage/apis/search-image.api"
import Switch from "../../widgets/switch/switch"
import Spacer from "../../widgets/spacer"
import { setShowSearchImage } from "../../states/config-state"
import { useEffect } from "react"

export default function EditModeOverlay() {
    // State
    const editMode = useAppSelector((state) => state.edit.editMode)
    const appBackground = useAppSelector((state) => state.edit.appBackground)
    const showSearchImage = useAppSelector((state) => state.config.showSearchImage)
    const dispatch = useAppDispatch()

    // Listen key events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore shortcuts if an input or textarea is focused
            if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === 'e') {
                dispatch(setEditMode(!editMode))
                e.preventDefault()
            }

            if (e.key === 'Escape') {
                dispatch(setEditMode(false))
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [editMode])



    // Render
    return (
        <>
            {/* Edit Mode Overlay */}
            <div
                className={"edit-mode-overlay"}
                style={{
                    display: editMode ? 'block' : 'none'
                }}
            />

            {/* Edit Button */}
            <div
                className={'edit-mode-button' + (editMode ? ' active' : '')}
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
                    <label>Show Search Image</label>
                    <Spacer width={16} />
                    <Switch checked={showSearchImage} onChange={(checked) => {
                        dispatch(setShowSearchImage(checked))
                    }} />

                    {/* Background Selection */}
                    <Spacer width={24} />
                    <div className="background-picker">
                        <button
                            onClick={() => {
                                if (appBackground) {
                                    // Remove image
                                    SearchImageApi.removeBackgroundImage()
                                    dispatch(setAppBackground(undefined))
                                    return;
                                }

                                // Pick background image
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'

                                input.onchange = async () => {
                                    const file = input.files?.item(0)
                                    if (!file) {
                                        return
                                    }

                                    const reader = new FileReader()
                                    reader.onload = async () => {
                                        const image = reader.result as string
                                        console.log("Selected image", image)

                                        // Save image
                                        await SearchImageApi.saveBackgroundImage(image)

                                        // Set Image
                                        dispatch(setAppBackground(image))
                                    }

                                    reader.readAsDataURL(file)
                                }

                                input.click()
                            }}
                        >
                            {appBackground ? <HideImageRounded /> : <AddPhotoAlternateRounded />}
                            <Spacer width={6} />
                            {appBackground ? 'Remove Background' : 'Pick Background'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}