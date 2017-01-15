# -*- coding: utf-8 -*-
"""
Created on Sat Jan 14 13:09:35 2017

@author: mahan

Authors: Margaret Mahan

Package versions:
    nltk 3.2.2
        # need to download corpus: python -m nltk.downloader all
"""

# imports
import nltk
from nltk.corpus import sentiwordnet as swn

# dictionary converting for sentiment analysis
pos_dict = {'NOUN':'n', 'VERB':'v', 'ADJECTIVE':'a', 'ADJ':'a', 'ADJECTIVE SATELLITE':'s', 'ADV':'r', 'ADVERB':'r'}


def tag_score(tags):

    tagged = nltk.pos_tag(tags, tagset='universal')
    score = calculate_score(tagged)
    return score
    
    
def content_score(raw):
       
    # tokenize
    tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(raw)
     
    # remove stop words
    filtered_words = [word for word in tokens if word not in nltk.corpus.stopwords.words('english')]
    tagged = nltk.pos_tag(filtered_words, tagset='universal')
    score = calculate_score(tagged)
    return score
    
    
def calculate_score(tagged):
    
    n_score = 0.0
    p_score = 0.0
    for i in range(len(tagged)):
        arg1 = str(tagged[i - 1][0]) + '.' + pos_dict[tagged[i - 1][1]] + '.02'
        try:
            sentiment = swn.senti_synset(arg1)
        except:
            sentiment = []
               
        if sentiment == []:
            continue
        else:
            p_score += sentiment.pos_score()
            n_score += sentiment.neg_score()
    
    total_score = p_score - n_score
    return total_score    

# eof