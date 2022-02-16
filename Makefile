build:
	docker build ./distributed_systems_server/ -t backend_service && \
	docker build ./audio_classification_service/ -t audio_service && \
	docker build ./yolo_service/ -t yolo_service
update:
	docker service update backend_service_backend_service --force && \
	docker service update audio_service_audio_service --force && \
	docker service update yolo_service_yolo_service --force
run:
	docker
	docker stack deploy -c ./audio_classification_service/swarmfile.yaml audio_service && \
	docker stack deploy -c ./yolo_service/swarmfile.yaml yolo_service