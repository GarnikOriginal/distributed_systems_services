import os
import torch
import logging
from os.path import join, exists
from flask import Flask, request, jsonify
from flask_cors import CORS
from modules.model import load_model


app = Flask(__name__)
CORS(app)
model = load_model()


@app.post("/predict")
def predict():
    pass


if __name__ == '__main__':
    torch.set_grad_enabled(False)
    app.run(port=62245)
