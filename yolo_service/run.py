import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from modules.model import load_model, predict
from modules.decode_utils import decode_image


app = Flask(__name__)
CORS(app, resources=r'/predict')
model = load_model()


@app.route("/predict", methods=['POST'])
def predict_route():
    try:
        if "image" not in request.files or request.files["image"].filename == "":
            logging.error("Empty file passed.")
            return jsonify({"error": "Empty file passed"}), 204
        else:
            file_bytes = request.files["image"].read()
            image = decode_image(file_bytes)
            result = predict(model, image)
            return jsonify({"labels": result})
    except Exception as error:
        logging.error(f"Error: {error}.")
        return jsonify({"Error": "Unsupported file format"}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=62225)
