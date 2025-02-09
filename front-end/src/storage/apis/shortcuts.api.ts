import ShortcutItem from "../../models/shortcut-item";

export default abstract class StorageApi {
  static async getShortcuts(): Promise<ShortcutItem[]> {
    const shortcuts: ShortcutItem[] = [];

    // Get shortcuts from storage
    const storageShortcuts = localStorage.getItem("shortcuts");
    if (storageShortcuts) {
      const parsedShortcuts = JSON.parse(storageShortcuts) as ShortcutItem[];
      shortcuts.push(...parsedShortcuts);
    }

    return shortcuts;
  }

  static async addShortcut(shortcut: ShortcutItem): Promise<void> {
    // Get shortcuts from storage
    const storageShortcuts = localStorage.getItem("shortcuts");
    const shortcuts: ShortcutItem[] = storageShortcuts ? JSON.parse(storageShortcuts) : [];

    // Add new shortcut
    shortcuts.push(shortcut);

    // Save shortcuts to storage
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }

  static async removeShortcut(index: number): Promise<void> {
    // Get shortcuts from storage
    const storageShortcuts = localStorage.getItem("shortcuts");
    const shortcuts: ShortcutItem[] = storageShortcuts ? JSON.parse(storageShortcuts) : [];

    // Remove shortcut
    const newShortcuts = shortcuts.filter((shortcut) => shortcut.index !== index);

    // Save shortcuts to storage
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
  }

  static async updateShortcut(shortcut: ShortcutItem): Promise<void> {
    // Get shortcuts from storage
    const storageShortcuts = localStorage.getItem("shortcuts");
    const shortcuts: ShortcutItem[] = storageShortcuts ? JSON.parse(storageShortcuts) : [];

    // Update shortcut
    const newShortcuts = shortcuts.map((s) => {
      if (s.index === shortcut.index) {
        return shortcut;
      }
      return s;
    });

    // Save shortcuts to storage
    localStorage.setItem("shortcuts", JSON.stringify(newShortcuts));
  }

  static async saveShortcuts(shortcuts: ShortcutItem[]): Promise<void> {
    // Save shortcuts to storage
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }
}
