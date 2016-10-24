# TODO list

- better filter editors (form validation!)
- better UX
- fix any remaining TODOs in code
- Unit tests!
- check for deprecated (ES<6) syntax
- simplify arrow functions where possible
- integrate Redux
- replace this with a proper README!

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

Application will be served on http://localhost:3001

### Development mode:
In addition to the standard server, you can start a development server (with live reloading support etc.) on `http://localhost:3000` via `npm start`.
The main node server still needs to be running since it serves as a proxy for negotiating authentication with Twitter API.