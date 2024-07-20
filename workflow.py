
from web_crawler.crawl import Fetch, preprocessing
from keyword_extracter import process
from store import IndexManager
from together import AsyncTogether, Together
import json

class Backend:
    
    def __init__(self):

        self.client = Together(api_key="f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e")

        self.fetch = Fetch()
        self.processing = preprocessing()
        self.index_manager = None
    
    def extraction(self, url):

        self.url = url
        text = self.fetch.get(self.url)

        preprocessed_text = self.processing.clean_text(text)

        # Extract keywords
        self.keywords = process().extract_keywords(preprocessed_text, num_keywords=10)

        with open("data.txt", "w") as wb:
            wb.write(preprocessed_text)
        
        self.index = self.store_vector()

        return self.keywords
    
    def store_vector(self):
        try:
            self.index_manager = IndexManager("data.txt")
            return True
        except: return False

    def retrive(self, title, index):
        
        self.index_manager = index
        result = self.index_manager.query(title)
        return result
    
    def prompt_for_titles(self, keyword, context):
        system_message = "You are a Search Engine Optimization(SEO) expert and a professional blogger assistant. Your job is to generate a title for a blog based on the given keyword and the context of keywords"
        
        prompt = f"""
        Generate a concise title inspired by the keyword: '{keyword}' in one line, tailored for blog content.

        ---------------------------------
        Personalized data of the user:
        {context}
        ---------------------------------

        Here are a few random examples of blog titles to help you get an idea of the style:

        Keyword - 'Marketing',  Title - 'Unveiling Innovative Marketing Strategies: Navigating Trends and Tactics for Success'
        Keyword - 'Stock market', Title - 'Mastering the Stock Market: Strategies and Insights for Successful Investing.'
        Keyword - 'Javascript', Title - 'JavaScript Mastery: Essential Tips, Tricks, and Best Practices for Web Development Success.'
        Keyword - 'Deep Learning', Title - 'Deep Learning Demystified: Harnessing Neural Networks for Cutting-Edge AI Applications.'
        Keyword - 'Stable Diffusion', Title - 'Stable Diffusion Explained: Understanding Its Applications and Impact in Modern Technologies.'
        Keyword - 'Retail', Title - 'Revolutionizing Retail: Trends, Strategies, and Innovations Shaping the Future of Shopping'
        Keyword - 'Ayurveda', Title - 'Ayurveda Unveiled: Ancient Wisdom and Modern Applications for Holistic Health.'

        ------------------------------------
        Make sure dont give any other context related to title just only the title thats it as a generated output
        """
        
        response = self.client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
        )
        
        # Extract the generated title
        if response:
            generated_title = response.choices[0].message.content.split("\n")[-1]
            return generated_title
        else: return False

    def get_titles(self, keywords, index):

        title = []

        if keywords:
            for keyword_ in keywords:
                self.context = self.retrive(keyword_, index)
                self.title_ = self.prompt_for_titles(keyword_, self.context)
                title.append(self.title_)
        
        return title


    def get_keywords(self, url):
        self.keywords = self.extraction(url)

        if self.index:
            return json.dumps({"keywords": self.keywords})
        else: return "Error in loading a provided URL"

    
    def get_blog(self, title, custom_prompt, keywords, index):

        context = self.retrive(title, index)

        system_message = "You are a Search Engine Optimization(SEO) expert and a professional blogger assistant. Your job is to generate a complete blog based om the provided context"

        prompt = f"""Create a well-researched and engaging blog post more than 1000 words centered around the title: '{title}'. Include the latest trends, insights, and practical tips related to the topic.

        --------------------------------
        Context for genrating a blog:
        {context}
        ---------------------------------

        Also you have to include the keywords in generated blog in the following list:
        {keywords}
        ---------------------------------

        {custom_prompt}
        """

        response = self.client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )
        
        # Extract the generated title
        if response:
            generated_blog = response.choices[0].message.content
            return generated_blog
        else: return False



# Create an instance of the Backend class
backend = Backend()

index = None
# Define the URL you want to crawl
url = "https://focusedunow.com/"  # Replace with the actual URL

# Get keywords from the URL
keywords_json_string = backend.get_keywords(url)

index = backend.index_manager

print(keywords_json_string)  # This will print a JSON string containing the extracted keywords

# Parse the JSON string into a Python dictionary
keywords_json = json.loads(keywords_json_string)

keyword__ = keywords_json['keywords']


# Get blog titles based on the extracted keywords
titles = backend.get_titles(keyword__, index)
print(titles)  # This will print a list of generated blog titles

custom = ''

blog = backend.get_blog(titles[2], custom, ['education', 'studies'], index)
print(blog)
