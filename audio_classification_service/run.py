import torch
from aiohttp import web
from modules.model import MusicNetWrapper
from modules.socket import socket_handler


def init_app(app: web.Application):
    torch.set_grad_enabled(False)
    app["model"] = MusicNetWrapper()
    app.add_routes([web.get("/classify", socket_handler)])
    return app


if __name__ == '__main__':
    app = web.Application()
    app = init_app(app)
    web.run_app(app, host="0.0.0.0",  port="62225")
