# Battleship

This is a simple typescript implementation for the game battleship.

## How to start?

Install dependencies
`npm install`

Run dev server
`npm run dev`

The game will be available on localhost:
[http://localhost:5173/](http://localhost:5173/)

Run unit and integration tests
`npm run test`

## Debug mode

Inside [main.ts](src/main.ts) you can set the config "debug" to true.
This allows you to see the ships for testing purpose.

## Architecture

This implementation is based on a simple MVC architecture pattern.
The goal was to keep the code simple but also based on a separation of concerns.

For a real world scenario I would prefer using react and flux architecture, because it's easier to extend the UI there.

The createShip function inside the getShips.ts file is not ideal when used with smaller grids or more / larger ships.
The problem with this function is, it's based on a random position generation. This can cause some long running loops if no free position will be found.
In fact that the grid is 10x10 (100 cells) and only three ships has to be placed there, the current implementation is fine in my opinion.
