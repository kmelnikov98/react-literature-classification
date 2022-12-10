from python_speech_features import mfcc
import scipy.io.wavfile as wav
import numpy as np
from tempfile import TemporaryFile
import os
import pickle
import random 
import operator
from io import BytesIO
import json
import sys
from dotenv import load_dotenv
import math
import numpy as np
import boto3
from collections import defaultdict
from boto3.session import Session
dataset = []

def lambda_handler(dataset, wavfile):
    results = {
        1: 'blues',
        2: 'classical',
        3: 'country',
        4: 'disco',
        5: 'hiphop',
        6: 'jazz',
        7: 'metal',
        8: 'pop',
        9: 'reggae',
        10: 'rock'
    }

    wrapper = BytesIO(wavfile)
    (rate, sig) = wav.read(wrapper)
    mfcc_feat=mfcc(sig, rate ,winlen=0.020, appendEnergy=False, nfft=960)
    covariance = np.cov(np.matrix.transpose(mfcc_feat))
    mean_matrix = mfcc_feat.mean(0)
    feature=(mean_matrix,covariance,0)
    pred = nearestClass(getNeighbors(dataset, feature, 5))
    print(results[pred])
    sys.stdout.flush()

def loadDataset(filename):
    with filename as f:
        while True:
            try:
                dataset.append(pickle.load(f))
            except EOFError:
                break

    return dataset

def distance(instance1 , instance2 , k ):
    distance =0 
    mm1 = instance1[0] 
    cm1 = instance1[1]
    mm2 = instance2[0]
    cm2 = instance2[1]
    distance = np.trace(np.dot(np.linalg.inv(cm2), cm1)) 
    distance+=(np.dot(np.dot((mm2-mm1).transpose() , np.linalg.inv(cm2)) , mm2-mm1 )) 
    distance+= np.log(np.linalg.det(cm2)) - np.log(np.linalg.det(cm1))
    distance-= k
    return distance

def getNeighbors(trainingSet , instance , k):
    distances =[]
    for x in range (len(trainingSet)):
        dist = distance(trainingSet[x], instance, k )+ distance(instance, trainingSet[x], k)
        distances.append((trainingSet[x][2], dist))
    distances.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(k):
        neighbors.append(distances[x][0])
    return neighbors  

def nearestClass(neighbors):
    classVote ={}
    for x in range(len(neighbors)):
        response = neighbors[x]
        if response in classVote:
            classVote[response]+=1 
        else:
            classVote[response]=1
    sorter = sorted(classVote.items(), key = operator.itemgetter(1), reverse=True)
    print(sorter)
    return sorter[0][0]

if __name__ == '__main__':
    # args_list = json.loads(sys.argv[1])
    # print(args_list)
    load_dotenv()
    ACCESS_KEY = os.getenv('AWS_ACCESS_KEY_ID')
    SECRET_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    BUCKET_NAME = os.getenv('WAV_FILE_UPLOADS_BUCKET')

    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    datafile_key, test_wavfile = "dataset.dat", "sstest.wav"  # replace object key
    datafile = s3.get_object(Bucket=BUCKET_NAME, Key=datafile_key)["Body"].read()
    wavfile = s3.get_object(Bucket=BUCKET_NAME, Key=test_wavfile)["Body"].read()
    dataset_wrapper = BytesIO(datafile)
    dataset = loadDataset(dataset_wrapper)
    lambda_handler(dataset, wavfile)