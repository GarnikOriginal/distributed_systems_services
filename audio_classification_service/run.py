import torch
import librosa
from aiohttp import web
from modules.model import MusicNetWrapper


def init_app(app: web.Application):
    torch.set_grad_enabled(False)
    app["model"] = MusicNetWrapper()
    sample, sr = librosa.load("sample.wav")
    sample = sample[0:sr]
    pred = app["model"](sample, sr, mono=True)
    print(pred)
    return app


if __name__ == '__main__':

    app = web.Application()
    app = init_app(app)
    web.run_app(app, host="0.0.0.0", port="62225")
