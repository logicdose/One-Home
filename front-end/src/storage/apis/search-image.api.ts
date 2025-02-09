export default abstract class SearchImageApi {
  static async saveImage(image: string): Promise<boolean> {
    // Save image to storage
    console.log("Saving image", image);

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
}
