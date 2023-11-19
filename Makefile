target: start_electron start_docker

start_electron:
	cd my-app;npm run electron;

start_docker:
	docker-compose up

