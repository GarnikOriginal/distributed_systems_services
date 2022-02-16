build:
	docker build ./nginx_balancer/ -t cr.yandex/crp47mcttv0eg7au1nmh/nginx_balancer && \
	docker build ./distributed_systems_server/ -t cr.yandex/crp47mcttv0eg7au1nmh/backend_service && \
	docker build ./audio_classification_service/ -t cr.yandex/crp47mcttv0eg7au1nmh/audio_service && \
	docker build ./yolo_service/ -t cr.yandex/crp47mcttv0eg7au1nmh/yolo_service
	docker push cr.yandex/crp47mcttv0eg7au1nmh/nginx_balancer && \
	docker push cr.yandex/crp47mcttv0eg7au1nmh/backend_service && \
	docker push cr.yandex/crp47mcttv0eg7au1nmh/audio_service && \
	docker push cr.yandex/crp47mcttv0eg7au1nmh/yolo_service
update:
	docker service update distr-lab4_audio_service --force && \
	docker service update distr-lab4_backend_service --force && \
	docker service update distr-lab4_yolo_service --force
run:
	docker stack deploy -c ./swarmfile.yaml distr-lab4