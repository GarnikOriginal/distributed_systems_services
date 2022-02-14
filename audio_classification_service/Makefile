build:
	docker build . -t audio_service
update:
	docker service update audio_service_audio_service --force
run:
	docker stack deploy -c swarmfile.yaml audio_service