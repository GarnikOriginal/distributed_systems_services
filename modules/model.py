import torch


def load_model():
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', device="cpu")
    model.eval()
    return model
