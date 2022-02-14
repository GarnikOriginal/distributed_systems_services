import cv2
import numpy as np


def decode_image(binary):
    array = np.fromstring(binary, np.uint8)
    image = cv2.imdecode(array, cv2.IMREAD_ANYCOLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image
