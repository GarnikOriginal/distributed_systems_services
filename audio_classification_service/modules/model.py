import os
import json
import torch
import librosa
import soundfile
import numpy as np
import torch.nn as nn
from os.path import join
from efficientnet_pytorch import EfficientNet


class MusicNet(nn.Module):
    def __init__(self, input_shape, n_classes, device="cpu"):
        super().__init__()
        self.conv_block = EfficientNet.from_name("efficientnet-b0", include_top=False)
        self.activation1 = nn.LeakyReLU()
        self.fc1 = nn.Linear(in_features=1280 * int(input_shape[2] / 16), out_features=180)
        self.activation2 = nn.LeakyReLU()
        self.fc2 = nn.Linear(in_features=180, out_features=n_classes)
        self.activation3 = nn.Sigmoid()
        self.to(device)

    def forward(self, x):
        x = self.conv_block.extract_features(x)
        x = x.reshape((x.size()[0], -1))
        x = self.activation1(x)
        x = self.activation2(self.fc1(x))
        x = self.fc2(x)
        return self.activation3(x)


class MusicNetWrapper():
    def __init__(self, model_folder=join(".", "data", "models")):
        with open(join(model_folder, "audio_config.json"), "r") as f:
            self.config = json.load(f)
        self.model = MusicNet(self.config["input_shape"], len(self.config["classes"]), device="cpu")
        self.model.eval()
        self.model.load_state_dict(torch.load(join(model_folder, "audio_weights.pth")))
        self.sr = self.config["sample_rate"]

    def forward(self, audio_bytes, sr):
        audio = np.array(audio_bytes)
        audio = librosa.to_mono(audio)
        audio = librosa.resample(audio, sr, self.sr)
        mfcc = librosa.feature.mfcc(audio, sr=self.sr, n_mfcc=128)
        mel = librosa.feature.melspectrogram(audio, sr=self.sr)
        chroma = librosa.feature.chroma_stft(audio, sr=self.sr, n_chroma=128)
        features = np.stack([mfcc, mel, chroma])
        features = torch.tensor([features], dtype=torch.float32)
        prediction = (self.model(features)[0].numpy() > 0.5).tolist()
        return prediction

    def __call__(self, audio_bytes, sr):
        return self.forward(audio_bytes, sr)
