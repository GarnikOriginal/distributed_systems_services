build:
	docker build . -t backend_service
update:
	docker service update backend_service_backend_service --force
run:
	docker stack deploy -c swarmfile.yaml backend_service