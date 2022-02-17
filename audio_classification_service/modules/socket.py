import json
import numpy as np
from aiohttp import web


async def socket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    async for ms in ws:
        message = json.loads(ms.data)
        sample, sr = np.array(message["data"], dtype=np.float32), message["sr"]
        prediction = request.app["model"](sample, sr)
        await ws.send_json({"prediction": prediction, "timestamp": message["timestamp"]})
    return ws
