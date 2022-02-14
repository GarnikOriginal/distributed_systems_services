import torch


def load_model():
    torch.set_grad_enabled(False)
    model = torch.hub.load('ultralytics/yolov5', 'yolov5m', device="cpu", force_reload=True)
    model.eval()
    return model


def predict(model, image):
    result = model([image]).pandas().xyxy[0]
    list_result = []
    for i, row in result.iterrows():
        row = {column: int(row[column]) if column not in ["name", "confidence"] else row[column] for column in result}
        list_result.append(row)
    return list_result
