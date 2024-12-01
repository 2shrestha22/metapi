# Meta-API

## Run

```bash
yarn run start
```

## Develop

```bash
yarn run compile
```

```bash
yarn run start:watch
```

## Usage

```bash
curl "localhost:3000?url=https://sangamshrestha.com"
```


## Build Docker Image

```
docker build -t metapi .
```

## Run Docker Container

```
docker run --rm -p 3000:3000 --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json metapi
```

## Build and Run With Docker Compose

```
docker-compose up
```