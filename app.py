from flask_cors import CORS
from flask import Flask, jsonify, render_template, request
from workflow import Backend
import json



app = Flask(__name__)

CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST"])


backend = Backend()
index = None

'''
@app.route('/')
def index():
    return render_template('index.html')
'''

@app.route('/upload/url', methods=['POST'])
def upload_url():

    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    
    if request.is_json:

        url = request.json['link']

        keywords_json_string = backend.get_keywords(url)
        keywords_json = json.loads(keywords_json_string)["keywords"]
        print(keywords_json)

        return jsonify({'status': 'success', 'keywords':keywords_json})

    return False

@app.route('/api/generatetitles', methods=['POST'])
def generate_title():

    if request.method == "POST":
        
        json_data = request.json['selectedKeywords']
        print(json_data)
        titles = backend.get_titles(json_data, index)
        
        return jsonify({'status': 'success','titles':titles})

    return False 


@app.route('/api/generateblog', methods=['POST'])
def generate_blog():

    if request.method == "POST":
        title = request.json['title']
        keywords = request.json['tags']
        custom_prompt = request.json['custom_prompt']
        print(title, keywords, custom_prompt)

        blog = backend.get_blog(title, custom_prompt, keywords, index)
        print(blog)

        return jsonify({'status': 'success','blog':blog})

    return False 


@app.route('/api/enhanceblog', methods=['POST'])
def enhance_blog():

    if request.method == "POST":
        custom_prompt = request.json['custom_prompt']
        blog = request.json['blog']
        print(custom_prompt)

        blog = backend.enhance_blog(blog, custom_prompt)
        print(blog)

        return jsonify({'status': 'success','blog':blog})

    return False 


@app.route('/api/getcode', methods=['POST'])
def blog_code():

    if request.method == "POST":
        blog = request.json['blog']

        code = backend.code_of_blog(blog)
        print(code)

        return jsonify({'status': 'success','code':code})

    return False 

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)