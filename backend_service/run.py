import json
from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources=r'/')
with open("config.json", "r") as f:
    config = json.load(f)


@app.route("/", methods=['GET'])
def predict_route():
    return render_template("index.html", networks=config["networks"])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=62225)
