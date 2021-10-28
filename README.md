# anyinspect_web

## Run with docker

Build docker image

```sh
docker build -t anyinspect/anyinspect_web:latest .
```

Run

```sh
docker run -d -it -p 3000:3000 anyinspect/anyinspect_web:latest
```

Visit `http://localhost:3000`
