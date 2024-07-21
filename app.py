from flask_cors import CORS
from flask import Flask, jsonify, render_template, request
from workflow import Backend
import json

# Create an instance of the Backend class

backend = Backend()
index = None


app = Flask(__name__)

CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST"])


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload/url', methods=['POST'])
def upload_url():
    if request.method == "POST":
        url = request.form['url']
        print(url)
        
        keywords_json_string = backend.get_keywords(url)
        index = backend.index_manager

        return jsonify({'status': 'success', 'data':keywords_json_string})

    return False

@app.route('/api/generatetitles', methods=['POST'])
def generate_title():
    if request.method == "POST":
        
        keywords = request.form['keywords']

        print(type(keywords), keywords)

        #keywords_json = json.loads(keywords)
        #keyword__ = keywords_json['keywords']

        #titles = backend.get_titles(keyword__, index)
        titles = None

        return jsonify({'status': 'success','titles':titles})

    return False 


@app.route('/api/generateblog', methods=['POST'])
def generate_blog():
    if request.method == "POST":
        title = request.form['title']
        keywords = request.form['keywords']
        custom_prompt = request.form['custom_prompt']

        blog = backend.get_blog(title, custom_prompt, keywords, index)

        return jsonify({'status': 'success','blog':blog})

    return False 



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
