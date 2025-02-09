import { useEffect, useState } from "react";
import "./shortcuts.css";
import ShortcutItem from "../../models/shortcut-item";
import Spacer from "../../widgets/spacer";
import { AddRounded, CloseRounded } from "@mui/icons-material";
import Dialog from "../../widgets/dialog/dialog";
import AddShortcutDialog from "./add-shortcut-dialog/add-shortcut-dialog";
import { useAppSelector } from "../../app/hooks";
import StorageApi from "../../storage/apis/shortcuts.api";

export default function Shortcuts() {
    // State
    const editMode = useAppSelector((state) => state.edit.editMode);

    // Add Shortcut Dialog
    const [addShortcutDialogOpen, setAddShortcutDialogOpen] = useState(false);

    // State
    const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([]);

    // Drag State
    // const [dragItem, setDragItem] = useState<ShortcutItem | undefined>(undefined);

    // Methods
    const addShortcut = async (icon: string, title: string, url: string) => {
        const newShortcut: ShortcutItem = {
            index: shortcuts.length + 1,
            favIcon: icon,
            title: title,
            url: url,
        };

        // Add shortcut
        await StorageApi.addShortcut(newShortcut);

        // Update state
        setShortcuts([...shortcuts, newShortcut]);
    };

    const loadShortcuts = async () => {
        const shortcuts = await StorageApi.getShortcuts();
        setShortcuts(shortcuts);
    };

    const removeShortcut = async (index: number) => {
        // Remove shortcut
        await StorageApi.removeShortcut(index);

        // Update state
        setShortcuts(shortcuts.filter((shortcut) => shortcut.index !== index
        ));
    };

    // Effects
    useEffect(() => {
        loadShortcuts();
    }, []);

    // Render
    return (
        <>
            {/* Add Shortcut Dialog */}
            <Dialog
                title="Add Shortcut"
                open={addShortcutDialogOpen}
                onClose={() => setAddShortcutDialogOpen(false)}
            >
                <AddShortcutDialog
                    onCreate={(icon, title, url) => {
                        addShortcut(icon, title, url);
                        setAddShortcutDialogOpen(false);
                    }}
                />
            </Dialog>

            {/* Shortcuts */}
            <div className="shortcuts">
                {
                    shortcuts.map((shortcut) => {
                        return (
                            <div className="shortcut-container" key={shortcut.index}>
                                <a
                                    className="shortcut"
                                    href={shortcut.url}
                                >
                                    <div className="icon">
                                        {shortcut.favIcon && (
                                            <img src={shortcut.favIcon} alt={shortcut.title} />
                                        )}
                                    </div>
                                    <Spacer height={6} />
                                    <div>
                                        {shortcut.title}
                                    </div>
                                </a>

                                {/* Edit Mode Overlay */}
                                {editMode && (
                                    <div
                                        className="edit-mode-overlay"
                                        onDrag={(e) => {
                                            // setDragItem(shortcut);

                                            console.log("Drag", e);
                                        }}
                                    >
                                        <div className="content">
                                            {/* <button>
                                                    <EditRounded />
                                                </button> */}
                                            <Spacer width={4} />
                                            <button
                                                onClick={() => removeShortcut(shortcut.index)}
                                            >
                                                <CloseRounded />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                }

                {/* Add button */}
                {!editMode && (
                    <div className="shortcut-container">
                        <button
                            className="shortcut"
                            onClick={() => setAddShortcutDialogOpen(true)}
                        >
                            <div className="icon">
                                <AddRounded />
                            </div>
                            <Spacer height={6} />
                            <div>
                                Add
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}