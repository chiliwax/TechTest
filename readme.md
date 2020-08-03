# Text2Speech

## API
### Installation

T2S-API requires [Node.js](https://nodejs.org/) [ReactNative](https://reactnative.dev/) [ngrok](https://ngrok.com/)

Install the dependencies and devDependencies

```sh
$ cd T2S_API
$ npm install
$ node server.js
```

You should have your API server on *http://localhost:8081*
We need to redirect this adresse to a secured https server thanks to ngrok

```sh
$ ./ngrok http 8081
```

You should configure IBM keys in the file *config.json* (T2S_API root folder)

## MOBILE APP
### Installation

```sh
$ cd T2S
$ yarn install
$ yarn start
```

You should configure the ngrok tunnel in *config.json* (T2S root folder)