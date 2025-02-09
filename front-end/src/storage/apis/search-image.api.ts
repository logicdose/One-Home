export default abstract class SearchImageApi {
  static async saveImage(image: string): Promise<boolean> {
    // Save image to storage
    try {
      const localStorage = window.localStorage;
      localStorage.setItem("search-engine-image", image);
    } catch (error) {
      console.error("Error saving image", error);
      return false;
    }

    return true;
  }

  static async loadImage(): Promise<string | null> {
    // Load image from storage
    try {
      const localStorage = window.localStorage;
      const image = localStorage.getItem("search-engine-image");
      return image;
    } catch (error) {
      console.error("Error loading image", error);
      return null;
    }
  }

  static async removeImage(): Promise<boolean> {
    // Remove image from storage
    try {
      const localStorage = window.localStorage;
      localStorage.removeItem("search-engine-image");
    } catch (error) {
      console.error("Error removing image", error);
      return false;
    }

    return true;
  }

  static async saveBackgroundImage(image: string): Promise<boolean> {
    // Save image to storage

    try {
      const localStorage = window.localStorage;
      localStorage.setItem("search-engine-background-image", image);
      return true;
    } catch (error) {
      console.error("Error saving background image", error);
      return false;
    }
  }

  static async loadBackgroundImage(): Promise<string | null> {
    // Load image from storage
    try {
      const localStorage = window.localStorage;
      const image = localStorage.getItem("search-engine-background-image");
      return image;
    } catch (error) {
      console.error("Error loading background image", error);
      return null;
    }
  }

  static async removeBackgroundImage(): Promise<boolean> {
    // Remove image from storage
    try {
      const localStorage = window.localStorage;
      localStorage.removeItem("search-engine-background-image");
    } catch (error) {
      console.error("Error removing background image", error);
      return false;
    }

    return true;
  }
}
