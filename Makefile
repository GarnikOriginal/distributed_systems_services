build:
	docker build . -t yolo_service
update:
	docker service update yolo_service_yolo_service --force
run:
	docker stack deploy -c swarmfile.yaml yolo_service