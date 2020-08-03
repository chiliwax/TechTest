# Text2Speech

requirements : 
[Node.js](https://nodejs.org/) 
[ReactNative](https://reactnative.dev/) 
[ngrok](https://ngrok.com/)

Install the dependencies and devDependencies

## API
### Installation



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

## Screenshot

[](https://i.ibb.co/1RChZ7Z/Screenshot-2020-08-03-at-05-12-35.png/)

<a href="https://ibb.co/mhn1JbJ"><img src="https://i.ibb.co/1RChZ7Z/Screenshot-2020-08-03-at-05-12-35.png" alt="Screenshot-2020-08-03-at-05-12-35" border="0"></a>
<a href="https://ibb.co/ryMqnRB"><img src="https://i.ibb.co/dK6XnwN/Screenshot-2020-08-03-at-05-12-29.png" alt="Screenshot-2020-08-03-at-05-12-29" border="0"></a>
<a href="https://ibb.co/Hq7gcv1"><img src="https://i.ibb.co/Rc2HXnZ/Screenshot-2020-08-03-at-05-12-20.png" alt="Screenshot-2020-08-03-at-05-12-20" border="0"></a>
<a href="https://ibb.co/JzDGRYc"><img src="https://i.ibb.co/wK5PNnd/Screenshot-2020-08-03-at-05-09-38.png" alt="Screenshot-2020-08-03-at-05-09-38" border="0"></a>
<a href="https://ibb.co/MMtKCh5"><img src="https://i.ibb.co/wMP8zLr/Screenshot-2020-08-03-at-05-09-17.png" alt="Screenshot-2020-08-03-at-05-09-17" border="0"></a>