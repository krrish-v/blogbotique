import nltk

nltk.download('punkt')
nltk.download('stopwords')

from collections import Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

class process:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))

    def extract_keywords(self, text, num_keywords=5):
        tokens = word_tokenize(text)
        filtered_tokens = [word for word in tokens if word not in self.stop_words]
        word_freq = Counter(filtered_tokens)
        keywords = word_freq.most_common(num_keywords)
        only_keywords = [item[0] for item in keywords]
        return only_keywords
