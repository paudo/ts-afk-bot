# AFK-Bot
This project is derived from [template_node_js](https://github.com/LarsBremen/template_node_ts)

This project is an AFK bot which moves the mouse if there was no user input for 30 sek.

## Build and Run
`npm run build` compiles the app to js.  
`npm run start` executes the compiled code.  
`npm run serve` runs the app with ts-node.  

## Test
Test should be placed in `./spec` and every test file needs to end with `.spec.ts`.  
`npm run test` will run the tests.  
`npm run lint` runs eslint.

## Bundle project to executable
`pkg .` will build a x64 executable Windows  
For more information see [vercel/pkg](https://github.com/vercel/pkg) documentation.
