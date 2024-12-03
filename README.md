# MetaPi

Web page meta extractor API. This is a simple express app that use [Playwright](https://playwright.dev/) as a headless browser and [Metascraper](https://metascraper.js.org) to demonstrate extraction of meta tags from a web page. You can use this to create a link preview or extend the functionality to your need.


```bash
curl "localhost:3000?url=https://www.youtube.com/watch?v=IwYut9qF-jM"
```

```json
{
  "title": "Why does hitting your funny bone feel so horrible? - Cella Wright",
  "author": "TED-Ed",
  "publisher": "YouTube",
  "image": "https://img.youtube.com/vi/IwYut9qF-jM/maxresdefault.jpg",
  "url": "https://www.youtube.com/watch?v=IwYut9qF-jM",
  "description": "Explore the complex anatomy of the elbow, and find out why hitting your funny bone causes such an odd and painful sensation."
}
```


## Feature

- Runs a headless browser to properly load web pages.
- Set custom browser user agent.
- Runs as non root user (for chromium sandbox).
- Uses recommended seccomp profile.
- Lightweight docker image.


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


## Build Docker Image

```
docker build -t metapi .
```

## Run Docker Container

```
docker run -p 3000:3000 --ipc=host --user pwuser --security-opt seccomp=seccomp_profile.json metapi
```

## Build and Run With Docker Compose

```
docker-compose up -d
```