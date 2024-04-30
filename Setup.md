# Steps to setup a TypeScript + Express Project

1. Initialize a node project:
```
npm init
```

2. Install Typescript as a dev depedency:
```
npm install -D typescript
```

3. Initialize a tsconfig file for typescript modiifications:
```
tsc --init
```

4. In the tsconfig file, uncomment the ```outDir``` config and mark its location to **dist**. (So all the typescript compiled code would be converted to javascript and executed from dist.)

5. Create a new parameter ```exclude``` and assign the dist folder to it since we dont want to compile that folder. Also create another new parameter ```include``` and assign all the ts files present in the **src** directory.

6. Add the following scripts to the package.json file:
```
"build": "npx tsc",
"watch": "npx tsc -w",
"prestart": "npm run build",
"start": "npx nodemon dist/index.js",
"dev": "npx concurrently --kill-others \"npm run watch\" \"npm run start\""
```
(Install *nodemon* & *concurrently* npm packages before hand.)