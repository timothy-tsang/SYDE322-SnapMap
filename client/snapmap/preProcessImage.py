
# Accept an Image as Input and Convert to GrayScale
# Resize to Grayscale at 640 x 480 JPEG
# Post Key to SnapMap Server
import io
import os
import cv2
import base64
import requests
import numpy as np
from PIL import Image
from urllib.request import urlopen

def preProcessImage(imageEncoded):
	# Decode Image
	imgdata = base64.b64decode(imageEncoded)
	img = Image.open(io.BytesIO(imgdata))
	# Preprocess Image
	img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2GRAY)
	size = (640,480)
	img = cv2.resize(img, size)
	# Encode Image
	encoded_img = str(base64.b64encode(img))
	encoded_key = encoded_img[0:100].replace("/","")
	encoded_key = encoded_key.replace("'","")

	# Post Key to Server
	data = {
		"postProcessedImage": [
			{
				"pp_ID": encoded_key, 
				"pp_IMG": encoded_img
			}
		]
	}
	headers = {'Content-Type': 'application/json'}
	response = requests.post('https://snapmap-syde322.herokuapp.com/imgData', json=data, headers=headers)
