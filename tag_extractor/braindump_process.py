# -*- coding: utf-8 -*-
"""
Created on Sat Jan 14 13:03:13 2017

@author: mahan

Authors: Margaret Mahan

Package versions:
    anaconda 4.3.4 
    spyder 3.0.2
    python 3.5.2
    nltk 3.2.2
        # need to download corpus: python -m nltk.downloader all
    pandas 0.19.2
    numpy 1.11.3
    math standard
    datetime standard
"""

# imports
import nltk
import pandas as pd
import numpy as np
from braindump_tags import process_content
from braindump_analyze import tag_score
from braindump_analyze import content_score







raw = "T2 shine-through refer's to high signal on DWI images that is not due to restricted diffusion, get it, not due to restricted diffusion, on DWI images, but rather to high T2     signal which 'shines through' to the DWI image. T2 shine through occurs because of long T2 decay time in some normal tissue."
tags = process_content(raw, n_words=2, n_appear=2, n_pairs=2)
score_t = tag_score(tags)
score_c = content_score(raw)


    
# eof