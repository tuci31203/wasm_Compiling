<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="logo.svg" alt="Project logo"></a>
</p>

<h3 align="center">Wasm Compiling</h3>


---

<p align="center"> I came across the term WebAssembly and I think that it is really cool, I want to experiment with it!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## ✨ About <a name = "about"></a>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The main purpose of the project is to utilize Emscripten toolchains to understand how to get wasm working in browser. Specifically, I used Emscripten `emcc` to compile C++ code to WebAssembly and learn to make use of the 'glue code' in order to execute wasm files on website.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;On the whole, .wasm files are best used in situations where there are demanding-task-processing functions written in high performance languages but not native to browser environment, for example C or C++, and those lines of code are executed frequently. In such cases, we can compile them to webAssembly and achieve near-native performance. For example, Figma is a complex UI/UX designing web tool that performs most of its visual processing in low level language (eg C), in order to yield good user experience, developers can pre-compile functions to web assembly and release great burden on server-side processing. Note that the best scenario is the functions to be compiled have a fixed amount of parameters, so that the input is optimized with Javascript.


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In this project, we are going to build an online C/C++ code editor in which the server handles wasm compilation and all the execution is done on browser.

## 🏁 Getting Started <a name = "getting_started"></a>


These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Check if Node is installed in your device with terminal command

```bash
node --version
```


### Installing

You will need to clone the project to your local remote.

```bash
git clone https://github.com/...
```

Initialize node in root folder
```bash
npm init
```

Inside folder `clients` you will need to create a Vite project

```bash
npm create vite@latest
```

Check for packages needed in all `package.json` and `npm install` them accordingly.


## 🎈 Usage <a name="usage"></a>

Get the server running from the main folder with the following command


```bash
npm start
```

and get the application running in the client folder with

```bash
npm run dev
```

#### Guidelines:

+ **Step 1:** Code some C/C++ lines to the Editor part.

+ **Step 2:** Hit the Compile button.

+ **Step 3:** If your code requires input, type or paste into the `Input` section.

+ **Step 4:** Click run and the output will show up.


## ⛏️ Built Using <a name = "built_using"></a>

- [Emscripten](https://emscripten.org/) - WebAssembly compiler toolchain
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs](https://react.dev/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@tuci31203](https://github.com/tuci31203) - Chien


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

Major thanks to my instructor on this project - Ph.D Tran Vinh Duc.