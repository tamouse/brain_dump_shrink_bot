# -*- coding: utf-8 -*-
"""
Created on Sat Jan 14 13:03:13 2017

@author: mahan

Authors: Margaret Mahan

Package versions:
    python 3.5.2
    nltk 3.2.2
        # need to download corpus: python -m nltk.downloader all
    pandas 0.19.2
    numpy 1.11.3
    pymongo 3.3.0
"""

# imports
import pandas as pd
from braindump_tags import process_content
from braindump_analyze import tag_score
from braindump_analyze import content_score
from pymongo import MongoClient

# run brain dump process, which calls braindump_tags.py and braindump_analyze.py
def main():
    
    # connect to MongoDB and load db into pandas dataframe
    client = MongoClient('mongodb://localhost/brain_dump_shrink_bot_development')
    db = client.brain_dump_shrink_bot_development
    cursor = db['diaryentries'].find()
    df = pd.DataFrame(list(cursor))
    
    # convert tags to list
    df['tags'] = df.reset_index()[['tags']].values.tolist()
    
    # process, add tags, score content, and push to mongo db
    for row in df.itertuples():
        
        # process content and add tags
        raw = str(row.body)
        get_tags = list(row.tags)
        new_tags = process_content(raw, n_words=2, n_appear=2, n_pairs=2)    
        get_tags.extend(new_tags)
        
        # process content and create score
        # score_t = float('{:03.2f}'.format(tag_score(new_tags))) # unused
        score_c = content_score(raw)
        
        # push tags to mongo              
        cursor.collection.update_one({"_id":df._id[row.Index]}, {"$set": {"tags":get_tags}, "$currentDate":{"lastModified":True}}, True, False)
    
        # push score to mongo
        cursor.collection.update_one({"_id":df._id[row.Index]}, {"$set": {"score":score_c}, "$currentDate":{"lastModified":True}}, True, False)

# call main
main()
# eof