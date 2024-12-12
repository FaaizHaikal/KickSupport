
import os
import json
import pickle
import numpy as np
import nltk
import sys
import logging
from nltk.stem import WordNetLemmatizer
import tensorflow as tf
from tensorflow.keras.models import load_model

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

class KickBot:
  def __init__(self):
    start_dir = os.path.dirname(os.path.abspath(__file__))

    self.lemmatizer = WordNetLemmatizer()
    self.intents = json.loads(open(os.path.join(start_dir, '../data/intents.json')).read())
    self.words = pickle.load(open(os.path.join(start_dir, '../model/words.pkl'), 'rb'))
    self.classes = pickle.load(open(os.path.join(start_dir, '../model/classes.pkl'), 'rb'))
    self.model = load_model(os.path.join(start_dir, '../model/chatbot.h5'))
    
    os.system('clear')
    
    
  def clean_up_sentence(self, sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [self.lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    
    return sentence_words

  def bow(self, sentence, words, show_details=True):
    sentence_words = self.clean_up_sentence(sentence)
    bag = [0] * len(words)

    for s in sentence_words:
      for i, w in enumerate(words):
        if w == s:
          bag[i] = 1
          if show_details:
              print(f"found in bag: {w}")
    
    return np.array(bag)

  def predict_class(self, sentence):
    p = self.bow(sentence, self.words, show_details=False)
    res = self.model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []

    for r in results:
      return_list.append({'intent': self.classes[r[0]], 'probability': str(r[1])})

    return return_list
  
  def get_response(self, intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    
    for i in list_of_intents:
      if i['tag'] == tag:
        result = np.random.choice(i['responses'])
        break

    return result

  def chatbot_response(self, msg):
      ints = self.predict_class(msg)
      res = self.get_response(ints, self.intents)
      return res

if __name__ == '__main__':
  bot = KickBot()

  while True:
    message = input('You: ')
    if message == 'exit':
      break
    print('Bot:', bot.chatbot_response(message))
