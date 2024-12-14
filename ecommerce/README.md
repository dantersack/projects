# Ecommerce built with NextJS, TypeScript, PrismaORM, PotsgreSQL, Docker and AWS

## Docker commands

Setup postgres:latest with a volume

`docker run --name pglatest -e POSTGRES_PASSWORD=admin -d -p 5432:5432 -v pglatest-volume:/var/lib/postgresql/data postgres:latest`

Run psql inside the container

`docker exec -u postgres -it pglatest psql`
