
from web_crawler.crawl import Fetch, preprocessing
#from keyword_extracter import process
from store import Vector_Store, AI_Engine
#from together import AsyncTogether, Together
import ast

class Backend:
    
    def __init__(self):

        #self.client = Together(api_key="f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e")
        self.llm = AI_Engine()
        self.vector_db = Vector_Store()

        self.fetch = Fetch()
        self.processing = preprocessing()
        self.index_manager = None

        self.ai = AI_Engine()
    
    def extraction(self, url):

        self.url = url
        text = self.fetch.get(self.url)

        preprocessed_text = self.processing.clean_text(text)

        # Extract keywords
        #self.keywords = process().extract_keywords(preprocessed_text, num_keywords=10)

        return preprocessed_text
    
    def create_db(self, url, URI):

        try:
            URI = "DB/" + URI
            text_data = self.extraction(url)
            if text_data:
                Vector_Store().store_data(text_data, URI)
                return True
        except: return False

    def retrive(self, query:str, URI: str):

        return self.vector_db.retrive_data(query=query, URI=URI)
    

    def get_titles_prompt(self, URI, phrase):
        
        context = self.retrive(phrase, URI)

        system_message = "You are a Search Engine Optimization(SEO) expert and a professional blogger assistant. Your job is to generate a title for a blog based on the given keyword and the context of keywords"
        
        prompt = f"""
        Generate a concise 3 little different titles as a  python list "[]" where the string in double inverted comma "" for the provided phrase as: '{phrase}' in one line, tailored for blog content.

        ---------------------------------
        Personalized data of the user:
        {context}
        ---------------------------------

        Here are a few random examples of blog titles to help you get an idea of the style:
        ["Unveiling Innovative Marketing Strategies: Navigating Trends and Tactics for Success",
        "Mastering the Stock Market: Strategies and Insights for Successful Investing",
        "JavaScript Mastery: Essential Tips, Tricks, and Best Practices for Web Development Success",
        "Deep Learning Demystified: Harnessing Neural Networks for Cutting-Edge AI Applications",
        "Stable Diffusion Explained: Understanding Its Applications and Impact in Modern Technologies",
        "Revolutionizing Retail: Trends, Strategies, and Innovations Shaping the Future of Shopping",
        "Ayurveda Unveiled: Ancient Wisdom and Modern Applications for Holistic Health"]

        ------------------------------------
        Make sure dont give any other context related to title just only the title thats it as a generated output, 
        Also, I just want the output in a form of python list "[]" format where the string in double inverted comma "" as an output similar to the defined style.
        """
        
        return system_message, prompt
    
    
    def get_blog_prompt(self, URI, title, keywords, custom_prompt):

        context = self.retrive(title, URI)

        system_message = "You are a Search Engine Optimization(SEO) expert and a professional blogger assistant. Your job is to generate a complete blog based om the provided context"

        prompt = f"""
        Below are the details of the blog for you.
        
        Title :  {title}
        --------------------------------
        Keywords :  {keywords}
        --------------------------------
        Context : {context}
        --------------------------------
        Blog writing instructions:  Start with the title provided above which includes the primary keyword. Introduce the topic with a hook, mentioning the keyword within the first 100 words, and clearly state the blog's value. Use subheadings with secondary keywords to structure the content and break it into scannable sections. Write short, concise paragraphs with justified text, maintain keyword density without stuffing, and use bullet points or lists for easy absorption of information. Conclude by summarizing key takeaways, mentioning the primary keyword.
        --------------------------------
        Additional instructions : {custom_prompt}
        """

        return system_message, prompt
    
    def get_enhance_blog_prompt(self, blog, custom_prompt):

        system_message = "You are a Search Engine Optimization(SEO) expert and a professional blogger assistant. Your job is to enhance the already generated prompt"

        prompt = f"""Based on the instructions and the blog given below, do the changes to the blog. Return only the blog content.

        Blog : {blog}
        ---------------------------------
        Instructions : {custom_prompt}
        ---------------------------------
        """

        return system_message, prompt
    

    def generate(self, model: str, task: str, URI= None, title=None, keywords=None, custom_prompt=None, blog=None, phrase=None):
        
        if URI is not None: URI_ = "DB/" + URI

        if task == "titles":
            prompt = "".join(self.get_titles_prompt(URI_, phrase))
            titles = self.ai.generate_gemini(prompt, self.ai.gemini_model_pro)
            rearranged_titles = ast.literal_eval(titles)
            return rearranged_titles

        elif task == "blog":
            prompt = "".join(self.get_blog_prompt(URI_, title, keywords, custom_prompt))
            
            if model == "gemini":
                return self.ai.generate_gemini(prompt, self.ai.gemini_model_text)
            elif model == 'gpt4':
                pass
        
        elif task == "enhance":
            prompt = "".join(self.get_enhance_blog_prompt(blog, custom_prompt))
            return self.ai.generate_gemini(prompt, self.ai.gemini_model_text)

    
    def code_of_blog_prompt(self, blog):

        system_message = "You are a software engineer having a technical skills of writing a beutiful HTML and CSS code. Your job is to create a HTML  and CSS code for the give blog"

        prompt = f"""Wite a code in HTML and CSS code to design a beautiful webpage for a blog:
        --------------------------------
        Add the blog in a webpage:
        {blog}
        ---------------------------------
        Provide only HTML and CSS code without any additional context or irrelevant text.
        """

        return system_message, prompt



'''
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()
#os.environ["GOOGLE_API_KEY"] = os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

URI = "milvus_demo.db"

q = Backend().generate(model="gemini", task="blog", URI=URI, title="How to deal with work related stress")
print(q)

blog = """
## Langchain: How to Split Text Based on Semantic Similarity

**Introduction**

Langchain is a powerful open-source library for building and deploying natural language processing (NLP) applications. One of the key features of Langchain is its ability to split text into semantically similar chunks. This can be useful for a variety of tasks, such as:

* Summarizing long documents
* Identifying key themes in a text
* Extracting specific information from a text
* Generating new text that is similar to a given input

In this blog post, we will show you how to use Langchain to split text based on semantic similarity. We will also provide some tips and tricks for getting the best results from this technique.

**Installing Langchain**

The first step is to install Langchain. You can do this using the following command:

```
pip install langchain
```

**Loading a Text Document**

Once you have installed Langchain, you can load a text document into it. You can do this using the `load_document()` function. The following code shows how to load the text of the State of the Union address from a file:

```
import langchain

# Load the text of the State of the Union address
with open("state_of_the_union.txt", "r") as f:
    text = f.read()

# Create a Langchain document object
doc = langchain.Document(text)
```

**Splitting Text into Chunks**

Once you have loaded a text document into Langchain, you can split it into chunks using the `split_text()` function. The `split_text()` function takes a number of arguments, including:

* `breakpoint_threshold_type`: The type of breakpoint threshold to use. This can be one of the following:
    * `percentile`: The breakpoint threshold is the nth percentile of the distances between all pairs of sentences in the text.
    * `standard_deviation`: The breakpoint threshold is the nth standard deviation of the distances between all pairs of sentences in the text.
    * `interquartile`: The breakpoint threshold is the interquartile range of the distances between all pairs of sentences in the text.
    * `gradient`: The breakpoint threshold is the gradient of the distances between all pairs of sentences in the text.
* `breakpoint_threshold`: The value of the breakpoint threshold.
* `min_chunk_size`: The minimum size of a chunk, in sentences.
* `max_chunk_size`: The maximum size of a chunk, in sentences.

The following code shows how to split the text of the State of the Union address into chunks using the percentile breakpoint threshold type:

```
chunks = doc.split_text(breakpoint_threshold_type="percentile", breakpoint_threshold=90, min_chunk_size=3, max_chunk_size=10)
```

**Printing the Chunks**

Once you have split the text into chunks, you can print them out using the `print()` function. The following code shows how to print the chunks of the State of the Union address:

```
for chunk in chunks:
    print(chunk)
```

**Tips and Tricks**

Here are a few tips and tricks for getting the best results from Langchain's text splitting functionality:

* Use the `breakpoint_threshold_type` argument to control the granularity of the chunks. The higher the breakpoint threshold, the smaller the chunks will be.
* Use the `min_chunk_size` and `max_chunk_size` arguments to control the minimum and maximum size of the chunks. This can be useful for ensuring that the chunks are a manageable size.
* Experiment with different values for the `breakpoint_threshold` argument to find the value that produces the best results for your task.

**Conclusion**

Langchain is a powerful tool for splitting text into semantically similar chunks. This can be useful for a variety of NLP tasks, such as summarizing long documents, identifying key themes in a text, extracting specific information from a text, and generating new text that is similar to a given input.

In this blog post, we have shown you how to use Langchain to split text based on semantic similarity. We have also provided some tips and tricks for getting the best results from this technique.

We encourage you to experiment with Langchain's text splitting functionality to see how it can help you with your NLP tasks.
init@init-VivoBook-ASUSLa
"""

#print("\n\n")
#w = Backend().generate(model="gemini", task="enhance", blog=blog)
#print(w)
#'''