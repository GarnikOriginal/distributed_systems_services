build:
	docker build ./distributed_systems_server/ -t backend_service && \
	docker build ./audio_classification_service/ -t audio_service && \
	docker build ./yolo_service/ -t yolo_service
update:
	docker service update distr-lab4_audio_service --force && \
	docker service update distr-lab4_backend_service --force && \
	docker service update distr-lab4_yolo_service --force
run:
	docker stack deploy -c ./swarmfile.yaml distr-lab4