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
    const [dragItem, setDragItem] = useState<ShortcutItem | undefined>(undefined);
    const [dragX, setDragX] = useState(0);
    const [dragY, setDragY] = useState(0);
    const [dropIndex, setDropIndex] = useState(-1);
    const [dropX, setDropX] = useState(0);
    const [dropY, setDropY] = useState(0);

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

    const getDropIndex = (x: number, y: number) => {
        const dropIndex = shortcuts.findIndex((shortcut) => {
            const rect = document.getElementById(`shortcut-${shortcut.index}`)?.getBoundingClientRect();
            if (rect) {
                return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
            }
            return false;
        });

        return dropIndex;
    }

    const getDropX = (index: number) => {
        const rect = document.getElementById(`shortcuts`)?.getBoundingClientRect();
        if (rect) {
            return 120 * (index % 5);
        }
        return 0;
    }

    const getDropY = (index: number) => {
        const rect = document.getElementById(`shortcuts`)?.getBoundingClientRect();
        if (rect) {
            return 120 * Math.floor(index / 5);
        }
        return 0;
    }

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
            <div
                id="shortcuts"
                className="shortcuts"
                onPointerMove={(e) => {
                    if (dragItem) {
                        const dx = e.clientX;
                        const dy = e.clientY;

                        // Set new position
                        setDragX(e.clientX);
                        setDragY(e.clientY);

                        // Get drop index
                        const dropIndex = getDropIndex(dx, dy);
                        setDropIndex(dropIndex);

                        // Get drop position
                        const dropX = getDropX(dropIndex);
                        const dropY = getDropY(dropIndex);

                        console.log(`Drop Index: ${dropIndex}`);

                        setDropX(dropX);
                        setDropY(dropY);
                    }
                }}
                onPointerUp={() => {
                    if (dragItem) {
                        // Drop item
                        if (dropIndex !== -1) {
                            // Re-arange shortcuts
                            const newShortcuts = [...shortcuts];
                            newShortcuts.splice(shortcuts.indexOf(dragItem), 1);
                            newShortcuts.splice(dropIndex, 0, dragItem);

                            // Update indexes
                            newShortcuts.forEach((shortcut, index) => {
                                shortcut.index = index + 1;
                            });

                            // Save shortcuts
                            StorageApi.saveShortcuts(newShortcuts);

                            // Update state
                            setShortcuts(newShortcuts);
                        }

                        // Reset drag item
                        setDragItem(undefined);
                        setDropIndex(-1);
                    }
                }}
            >
                {
                    shortcuts.map((shortcut) => {
                        return (
                            <div className="shortcut-container" key={shortcut.title}>
                                <a
                                    id={`shortcut-${shortcut.index}`}
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
                                        onPointerDown={(e) => {
                                            setDragItem(shortcut);

                                            // Set initial position
                                            setDragX(e.clientX);
                                            setDragY(e.clientY);

                                            console.log("Pointer Down");
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

                {/* Drop Item */}
                {dropIndex !== -1 && (
                    <div
                        className="drop-item"
                        style={{
                            top: dropY + 5,
                            left: dropX + 5,
                        }}
                    />
                )}

                {/* Drag Item */}
                {dragItem && (
                    <div
                        className="drag-item"
                        style={{
                            top: dragY - 70,
                            left: dragX - 50,
                        }}
                    >
                        <div className="icon">
                            {dragItem.favIcon && (
                                <img src={dragItem.favIcon} alt={dragItem.title} />
                            )}
                        </div>
                        <Spacer height={6} />
                        <div>
                            {dragItem.title}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}