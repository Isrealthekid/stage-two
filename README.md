##
start the app by typing 'npm start in the terminal' after opening the directory 


replace the  script object   in the package .json file  with this

"scripts": {
    "start":"vite",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },