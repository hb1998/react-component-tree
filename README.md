<!-- React Component Tree README -->
<!-- NOTE: this README is the one that shows inside VSCode extension marketplace -->

<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/hb1998/react-component-tree">
    <img src="https://raw.githubusercontent.com/hb1998/react-component-tree/master/extension/media/logo.png" alt="Logo" height="120">
  </a>
</p>

  <h2 align="center">
    React Component Tree
  </h2>

  <h3 align="center">
    Your entire React project — At your fingertips.
  </h3>

  <p align="center">
    <a href="https://github.com/hb1998/react-component-tree/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/hb1998/react-component-tree/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
  
  <br />

  <!-- Badges: Package/Repo Stats -->
  <p align="center">
    <a href="https://marketplace.visualstudio.com/items?itemName=HabeebArul.react-component-tree">
      <img src="https://img.shields.io/visual-studio-marketplace/v/HabeebArul.react-component-tree">
    </a>
    <img src="https://img.shields.io/visual-studio-marketplace/r/HabeebArul.react-component-tree">
    <img src="https://img.shields.io/visual-studio-marketplace/i/HabeebArul.react-component-tree">
    <img src="https://img.shields.io/visual-studio-marketplace/d/HabeebArul.react-component-tree">
    <img src="https://img.shields.io/visual-studio-marketplace/last-updated/HabeebArul.react-component-tree">
    <img src="https://img.shields.io/github/languages/code-size/hb1998/react-component-tree">
    <br />
    <img src="https://img.shields.io/github/stars/hb1998/react-component-tree">
    <img src="https://img.shields.io/github/issues-closed/hb1998/react-component-tree">
    <img src="https://img.shields.io/github/issues-pr-closed/hb1998/react-component-tree">
    <img src="https://img.shields.io/github/last-commit/hb1998/react-component-tree">
    <img src="https://img.shields.io/github/license/hb1998/react-component-tree">
  </p>

* * *
This project is forked from [Sapling](https://github.com/oslabs-beta/sapling), which is no longer under active development. We've introduced a number of core performance improvements, and will continue to add new and exciting features.
* * *
<!-- Screen capture demo -->

![quizwall_demo](https://user-images.githubusercontent.com/34228073/218852264-5321e6f8-55b4-4b03-9baa-5cd341d4e120.gif)

<!-- Description -->
* * *
**`React Component Tree`** is a VS Code extension for React developers. As your application scales, its file structure tends to become less and less intuitive. Depending on your project architecture, your components might be organized in a completely different configuration to the component hierarchy of your React application.

Wouldn't it be nice to have instant access to a visual representation of the dependency relationships between the components in your application? How about being able to quickly reference your available props and routes with indication of conditional rendering?

With **`React Component Tree`**, you don't have to guess at the parent component of your current file anymore. **`React Component Tree`** is an interactive hierarchical dependency tree that lives directly within your VS Code IDE. Simply select a component file as the project root, and **`React Component Tree`** will build a full component tree and retrieve information about available props at any level. It also provides visual indication of Javascript syntax or import errors in your files, and shows you which components are connected to your Redux store.

Any updates you make to your files will be automatically processed and mirrored in the sidebar view. You can also navigate **`React Component Tree`** using your keyboard, putting your entire project right at your fingertips.

<br />

<!-- Tech stack badges -->
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)[![VSCode Extension API](https://img.shields.io/badge/VSCode_Extension_API-007acc?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/api)[![Babel](https://img.shields.io/badge/Babel_Parser-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)](https://babeljs.io/docs/en/babel-parser)[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)\
[![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)](https://webpack.js.org/)[![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white)](https://mochajs.org/)[![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=Chai&logoColor=white)](https://www.chaijs.com/)[![Github Actions](https://img.shields.io/badge/Github_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)

<br />

# Table of Contents

<ol>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#creators">Creators</a></li>
  <li><a href="#acknowledgements">Acknowledgements</a></li>
  <li><a href="#license">License</a></li>
</ol>

<br />

# Installation

1. If needed, install Visual Studio Code for Windows (7+), macOS (Sierra+), or Linux (details).

2. Install the **`React Component Tree`** extension for Visual Studio Code from the Extension Marketplace. Search for 'React Component Tree' in the VS Code extensions tab, or click [here](https://marketplace.visualstudio.com/items?itemName=HabeebArul.react-component-tree).

3. Once complete, you'll see **`React Component Tree`** appear in your sidebar. You can now begin using **`React Component Tree`**! Check out the Getting Started below for information on how to get started.

* To install **`React Component Tree`** for development, please see the contributing section below.

# Getting Started

* <img src="https://raw.githubusercontent.com/hb1998/react-component-tree/master/extension/media/list-tree.png" height="16" /> After installing, click the **`React Component Tree`** tree icon  in your extension sidebar.

* From there, you can click `Choose a file` to select your root component.

* You can also build your tree from the currently active file in your editor with the `Build Tree` button at the right hand side of the status bar.

* Click the **`〉`** and **`⌄`** buttons to expand and collapse individual nodes.

* Clicking on a node will open the component file in your editor window.

* Use the search bar at the top to filter visible nodes by component name.

* <img src="https://raw.githubusercontent.com/hb1998/react-component-tree/master/extension/media/circle-info-solid.png" height="14" /> Hover over the information icon to get a list of props available to that component.

*  <img height="14" src="https://raw.githubusercontent.com/hb1998/react-component-tree/master/extension/media/store-solid.png" > Components with a Redux store connection will be marked with this icon.

* Components with path or parser errors will be highlighted with the `error color` of your workspace theme.

* If you prefer not to view React Router or other third-party components imported into your app, you can disable these in the VS Code Extension Settings.
  * `rct.view.reactRouter`: show/hide React Router component nodes
  * `rct.view.thirdParty`: show/hide third party component nodes

# Usage

* **`React Component Tree`** can currently display React apps made with JSX/TSX and ES6 import syntax.

* **`React Component Tree`** will detect React components invoked using JSX tag syntax and React-Router component syntax, where React is imported in a file:

  ```JSX
      // Navbar will be detected as a child of the current file
      <Navbar />

      // As above
      <Navbar></Navbar>

      // Route and Navbar will be detected as child components of the current file
      <Route component={Navbar} />

      // Route and App will be detected as child components of the current file
      <Route children={App} />
  ```

* **`React Component Tree`** will detect the names of inline props for JSX components it identifies:

  ```JSX
      // props 'userId' and 'userName' will be listed for Navbar in **`React Component Tree`**
      <Navbar userId={...} userName={...} />
  ```

* **`React Component Tree`** can identify components connected to the Redux store, when 'connect' is imported from 'react-redux', and the component is the export default of the file:

  ```JSX
      // App.jsx
      import React from 'react';
      import { connect } from 'react-redux';

      const mapStateToProps = ...
      const mapDispatchToProps = ...

      const App = (props) => {
        return <h1>This is the App</h1>
      }

      // **`React Component Tree`** will detect App as connected to the Redux store
      export default connect(mapStateToProps, mapDispatchToProps)(App);
  ```

* **`React Component Tree`** prioritizes file dependencies over component dependencies. In the following example, **`React Component Tree`** will display Home and Navbar as siblings:

  ```JSX
      // App.jsx
      import React from 'react';
      import Home from './Home';
      import Navbar from './Navbar';

      class App extends Component {

        render (
          return {
            <Home>
              <Navbar />
            </Home>
          })
      }
  ```

  ![readme-example](https://user-images.githubusercontent.com/34228073/218852279-413c62ac-ecb9-4094-8b35-60013c98d2f4.png)

# Contributing

1. Fork the [project repo](https://github.com/hb1998/react-component-tree).
2. Open the `react-component-tree/extension` folder in your VS Code IDE.
3. Open `extension/src/extension.ts`
4. Run `npm i`
5. With the `extension` folder as your pwd, run this command: `npm run watch`.
6. From the menu, click Run - Start Debugging (or press F5), and select VS Code Extension Development from the command palette dropdown. An extension development host will open in a new window.
7. Click the React Component Tree icon on the extension development host window sidebar. To refresh the extension development host, use `Ctrl+R` (or `Cmd+R` on Mac).

<br />

# Creators

* [Habeeb](https://github.com/hb1998)
* [Arul Valan](https://github.com/ArulValan)
* [Jongsun Suh](https://github.com/MajorLift)
* [Charles Gutwirth](https://github.com/charlesgutwirth)
* [Jordan Hisel](https://github.com/jo-cella)
* [Lindsay Baird](https://github.com/labaird)
* [Paul Coster](https://github.com/PLCoster)

# Acknowledgements

* Forked from [Sapling](https://github.com/oslabs-beta/sapling)
* Parsing strategy inspired by [React Component Hierarchy](https://www.npmjs.com/package/react-component-hierarchy)
* Icons from [Font Awesome](https://fontawesome.com)
* Tooltips with [Tippy](https://www.npmjs.com/package/@tippy.js/react)
* Readme badges from [shields.io](https://shields.io/)

# License

Distributed under the MIT License. See [`LICENSE`](https://github.com/hb1998/react-component-tree/blob/master/LICENSE) for more information.
