# Instructions to start project:

Go to project folder where package.json stay


### Install node and npm:

verify you have stable version of node and npm installed. 


### Project Setup:

- Install all project dependencies, which are required for our project.

```
npm install
```

### Start development server:

```
npm run start.
```

### Make final build:

For production (live) ``[Base Url: '/']``:

```
npm run build
```

Above build commands create a new folder ``dist``.


### Run and build Docker image locally

- Build Image

```
docker build -t paypal .
```

- Run container
```
docker run -p 8080:80 paypal
```

### Pulling from docker hub
- Pull
```
docker pull sjametwala/paypal
```
- Run
```
docker run -p 8080:80 sjametwala/paypal
```
- Open Browser
```
localhost:8080/
```