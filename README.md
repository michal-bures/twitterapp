# Installing, testing and running the app

Requirements:
- `npm`
- `node 6.9.0+`

From root directory run the following:
```
npm install
npm test
npm run server
```

Application will be served on `http://localhost:3001`

### Development mode:

In addition to the standard server, you can start a development server (with live reloading support etc.) on `http://localhost:3000` via `npm start`.
The main node server still needs to be running since it serves as a proxy for negotiating authentication with Twitter API (and avoiding CORS issues).

# Notes on implementation

- I'm sure there are dozens of nice sortable table implementations available out there (such as https://github.com/AllenFang/react-bootstrap-table), but I chose to reinvent the wheel in this case as part of getting comfortable with React

- The App was initially implemented with classic React architecture with state distributed across components. Later I adopted Redux and pulled most of the state out to the global state tree, but I still let some components manage their own internal state (namely SortableTable and FilterEditor) to keep things straightforward. I do realize, that many benefits of using Redux (such as undo or serializing UI state for automated bug reports) would benefit from a more thorough adoption of the Redux philosophy.

- The individual components could be made more resuable by splitting of the presentation and state mapping into two seperate components, but I opted not to do it in order to keep the project compact and more easily digestable.

- Unit test coverage is admitedly poor, made mostly as a demonstration of using enzyme + jest test framework