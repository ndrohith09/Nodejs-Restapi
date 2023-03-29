## Node JS Rest API

This is a simple Node JS Rest API that uses Express and MongoDB.

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd node-rest-api
$ npm install
$ npm start
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
```

### Docker

Node Rest API is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd node-rest-api
docker build -t <youruser>/node-rest-api .
```

This will create the node-rest-api image and pull in the necessary dependencies. Be sure to swap out <youruser> with the name of the user you created in the previous step. Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8080 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):
