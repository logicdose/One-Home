# <img src="./assets/icons/one-home-icon.png" width="24"> One Home

`One Home` is a simple and modern `New Tab` page for your browser. It is designed to be a minimalistic and distraction-free start page for your browser, but customizable enough to be useful for everyone.

https://github.com/user-attachments/assets/c0f6aefd-4561-44f0-ad30-9a5abe9d707f

### Features 🚀

- **Minimalistic Design**: One Home is designed to be simple and clean, with a focus on usability. 👨‍🎨
- **Customizable**: You can customize the background, colors, links and grid to make it your own. 🎨
- **Responsive**: One Home is designed to work on all devices, from desktops to mobile phones. 📱
- **Open Source**: One Home is open source and free to use. You can contribute to the project on [GitHub](https://github.com/logicdose/One-Home.git)

## Change Log 📝

View the [CHANGELOG.md](CHANGELOG.md) file to see the changes made in each version of `One Home`.

## Direct Installation 🚀

You can download `extension.zip` from the [Releases](https://github.com/logicdose/One-Home/releases) page and install it in your browser.

[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/logicdose/One-Home/total?style=for-the-badge)](https://github.com/logicdose/One-Home/releases)

## Development 🛠️

`One Home` is built using `React` and `TypeScript`. The front-end application is built using `Vite`.
You can follow the instructions below to set up the development environment on your local machine, and start
customizing `One Home` to your liking.

## Directory Structure 📁

- `front-end`: Contains the source code for the front-end `React` application.
  - `src`: Contains the source code for the front-end application.
    - `components`: Bigger components each having a specific purpose.
    - `widgets`: Widgets are smaller components, which are used in the bigger components.
    - `utils`: Contains utility functions used in the application.
- `public`: Static files built by the front-end application, and served to the chrome extension.

### Entry Points 🚪

- `front-end/src/index.ts`: The entry point for the front-end application.

### Development 🛠️

1. Clone the repository.
2. Run `npm install` in the `front-end` directory.
3. Run `npm run dev` to start the development server.

### Building and using the extension 🚀

1. Run `npm run build` in the `front-end` directory.
2. Open `chrome://extensions/` in your browser.
3. Enable `Developer mode`.
4. Click on `Load unpacked` and select the `.` root directory of the repository.

### Voila! 🎉

You have successfully set up `One Home` as your new tab page. Enjoy! 🚀

## Credits 🙏

- [Photo by Tobi](https://www.pexels.com/photo/landscape-photography-of-brown-mountains-surrounding-lake-620337/) by Tobi from Pexels. Used as `Search Engine` placeholder image.
