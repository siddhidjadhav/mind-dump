import nltk
nltk.data.path.append('/Users/siddhijadhav/nltk_data')
import sys
import gensim
from gensim import corpora
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import json
import nltk

nltk.download('punkt')
nltk.download('stopwords')

# Get input text from command line
text = sys.argv[1]

# Preprocessing
stop_words = set(stopwords.words('english'))
tokens = word_tokenize(text.lower())
tokens = [word for word in tokens if word.isalpha() and word not in stop_words]

# Handle empty input
if not tokens:
    print(json.dumps({"category": "General", "keywords": []}))
    sys.exit(0)

# Create dictionary and corpus
dictionary = corpora.Dictionary([tokens])
corpus = [dictionary.doc2bow(tokens)]

# LDA model
lda_model = gensim.models.LdaModel(corpus, num_topics=1, id2word=dictionary, passes=15)

# Extract topics
topics = lda_model.print_topics(num_words=5)
keywords = []

for topic in topics:
    parts = topic[1].split('+')
    for part in parts:
        keyword = part.split('*')[1].strip().replace('"', '')
        keywords.append(keyword)

# Basic mapping logic
category = "General"
if any(word in keywords for word in ['array', 'graph', 'algorithm', 'data']):
    category = "Data Structures & Algorithms (DSA)"
elif any(word in keywords for word in ['physics', 'chemistry', 'science']):
    category = "Science"
elif any(word in keywords for word in ['emotion', 'mindset', 'wellbeing']):
    category = "Personal Growth"

# Return as JSON
result = {
    "category": category,
    "keywords": list(set(keywords))
}

print(json.dumps(result))

