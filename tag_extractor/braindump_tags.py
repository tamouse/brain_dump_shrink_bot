# -*- coding: utf-8 -*-
"""
Created on Sat Jan 14 13:09:13 2017

@author: mahan

Authors: Margaret Mahan

Package versions:
    python 3.5.2
    nltk 3.2.2
"""

# imports
import nltk
        
# process content and suggest tags
def process_content(raw, n_words, n_appear, n_pairs):    
    
    # find frequent words
    words = get_frequent_words(raw, n_words)
    
    # find frequent phrases
    phrases = get_frequent_word_pairs(raw, n_appear, n_pairs)
    
    # construct tag list
    tags = list()
    for i in range(n_words):
        tags.append(str(words[i - 1][0]))
        
    if len(phrases) > 2:
        for i in range(n_pairs):
            make_phrase = phrases[i - 1][0] + ' ' + phrases[i - 1][1]
            tags.append(make_phrase)
    
    return tags

        
# find the n most frequent words not including stop words
def get_frequent_words(raw, n_words):
    
    # remove stop words
    stop = set(nltk.corpus.stopwords.words('english'))
    output = [i for i in raw.lower().split() if i not in stop]
    
    for i in range(len(output)):
        if len(output[i]) < 5:
            output[i] = []
            
    output = [x for x in output if x != []]

    # find n most frequent words
    fdist = nltk.FreqDist(output)
    freq_words = fdist.most_common(n_words)
    if freq_words == []:
        freq_words = ['none']
    
    return freq_words

    
# find the n most frequent word pairs; also known as a collocation, which is a sequence of words that occur together unusually often
def get_frequent_word_pairs(raw, n_appear, n_pairs):
    
    # tokenization: break up string into words and ignore punctuation; output is list
    tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(raw)
    
    # remove stop words
    filtered_words = [word for word in tokens if word not in nltk.corpus.stopwords.words('english')]
    
    # convert to text for processing
    text = nltk.Text(filtered_words)

    # get association measures
    bigram_measures = nltk.collocations.BigramAssocMeasures()
    
    # get bigrams
    bigrams = nltk.BigramCollocationFinder.from_words(text)

    # only bigrams that appear n times and sort on frequency
    bigrams.apply_freq_filter(n_appear)
    freq_bigrams = sorted(bigrams.above_score(bigram_measures.raw_freq,1.0 / len(tuple(nltk.bigrams(tokens)))))
    
    # get first n pairs of most frequent bigrams
    freq_words = freq_bigrams[0:n_pairs]
    if freq_words == []:
        freq_words = ['none']
    
    return freq_words    
  
# eof