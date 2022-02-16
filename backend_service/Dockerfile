FROM python:3.8
WORKDIR /backend
COPY requirements.txt .
RUN python -m pip install --upgrade pip && \
    pip install -r requirements.txt --no-cache-dir
EXPOSE 62215
COPY ../backend_service .
CMD [ "python3", "run.py" ]