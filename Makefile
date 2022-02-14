build:
	docker build ./audio_classification_service/ -t audio_service
	docker duild ./yolo_service/ -t yolo_service
