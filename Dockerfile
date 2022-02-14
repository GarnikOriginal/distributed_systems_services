FROM python:3.8
WORKDIR /yolo
COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    apt-get update && \
    apt-get install ffmpeg libsm6 libxext6 -y && \
    pip3 install torch==1.10.2+cpu torchvision==0.11.3+cpu torchaudio==0.10.2+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html && \
    pip install -r requirements.txt --no-cache-dir
EXPOSE 62225
COPY . .
CMD [ "python3", "run.py" ]