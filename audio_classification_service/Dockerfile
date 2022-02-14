FROM python:3.8
WORKDIR /audio_classification
COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    pip3 install torch==1.10.2+cpu torchvision==0.11.3+cpu torchaudio==0.10.2+cpu -f https://download.pytorch.org/whl/cpu/torch_stable.html && \
    pip install -r requirements.txt --no-cache-dir
EXPOSE 62235
COPY . .
CMD [ "python3", "run.py" ]