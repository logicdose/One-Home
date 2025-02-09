import { AddPhotoAlternateRounded, CheckRounded, EditRounded, HideImageRounded } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setAppBackground, setEditMode } from "../../states/edit-state"
import './edit-mode-overlay.css'
import SearchImageApi from "../../storage/apis/search-image.api"
import Switch from "../../widgets/switch/switch"
import Spacer from "../../widgets/spacer"
import { setShowSearchImage } from "../../states/config-state"

export default function EditModeOverlay() {
    // State
    const editMode = useAppSelector((state) => state.edit.editMode)
    const appBackground = useAppSelector((state) => state.edit.appBackground)
    const showSearchImage = useAppSelector((state) => state.config.showSearchImage)
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

            {/* Background Selection */}
            <div
                className={"edit-mode-background-picker" + (editMode ? ' active' : '')}
            >
                <button
                    onClick={() => {
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
                    <AddPhotoAlternateRounded />
                </button>

                {appBackground && (
                    <button
                        onClick={() => {
                            // Remove image
                            SearchImageApi.removeBackgroundImage()
                            dispatch(setAppBackground(undefined))
                        }}
                    >
                        <HideImageRounded />
                    </button>
                )}
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
                </div>
            </div>
        </>
    )
}