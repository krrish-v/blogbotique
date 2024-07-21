import os
from flask_cors import CORS
from together import Together
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST"])

# os.environ['TOGETHER_API_KEY'] = 'f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e'

# client = Together(api_key=os.environ.get('TOGETHER_API_KEY'))
client = Together(api_key="f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e")

@app.route('/upload/url', methods=['POST'])
def index():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    response_text = ""
    
    if request.is_json:
        data = request.json
        print(data)
        prompt = data.get('link', '')
    
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[{"role": "user", "content": f"{prompt} in 20  words"}],
        )
        
        if response.choices:
            response_text = response.choices[0].message.content
        else:
            response_text = "No response generated"
            
        array = ["AIML", "Launchpad", "Llama3", "BLog generation","image generation"]
        
        print(array)
        print(response_text)
        
        return jsonify({'status': 'success', 'summary': response_text, 'keywords':array}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid JSON input'}), 400

@app.route('/api/generatetitles', methods=['POST'])
def Titles():
    data = request.json
    print(data)
    array = ["A Journey Through India's Regional Delicacies: From North to South","The Secret Spices of Indian Cuisine: What Makes Our Dishes Irresistible","Traditional Indian Festive Foods: A Culinary Celebration","Exploring the Rich History and Origins of Popular Indian Dishes","Health Benefits of Indian Spices and How We Incorporate Them in Our Menu","A Guide to Pairing Indian Foods with the Perfect Drinks","Behind the Scenes: A Day in the Life of Our Indian Restaurant Kitchen","A Journey Through India's Regional Delicacies: From North to South","The Secret Spices of Indian Cuisine: What Makes Our Dishes Irresistible","Traditional Indian Festive Foods: A Culinary Celebration","Exploring the Rich History and Origins of Popular Indian Dishes","Health Benefits of Indian Spices and How We Incorporate Them in Our Menu","A Guide to Pairing Indian Foods with the Perfect Drinks","Behind the Scenes: A Day in the Life of Our Indian Restaurant Kitchen"]

    print(array)
    return jsonify({'status': 'success','titles':array}), 200

@app.route('/api/generateblog', methods=['POST'])
def blog():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    response_text = ""
    
    if request.is_json:
        data = request.json
        print(data)
        prompt = data.get('prompt', '')
    
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[{"role": "user", "content": f"{prompt}"}],
        )
        
        if response.choices:
            response_text = response.choices[0].message.content
        else:
            response_text = "No response generated"
            
        print(response_text)
        
        return jsonify({'status': 'success', 'blog': response_text}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid JSON input'}), 400
    
@app.route('/api/Enchance', methods=['POST'])
def Enchanceblog():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    response_text = ""
    
    if request.is_json:
        data = request.json
        print(data)
        prompt = data.get('blog', '')
    
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[{"role": "user", "content": f"{prompt}"}],
        )
        
        if response.choices:
            response_text = response.choices[0].message.content
        else:
            response_text = "No response generated"
        
        return jsonify({'status': 'success', 'blog': response_text}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid JSON input'}), 400

@app.route('/api/GenerateBlogHtml', methods=['POST'])
def Html():
    data = request.json
    print(data)
    html = """<div className="h-72 w-full flex justify-center items-center">
            <l-bouncy
                size="45"
                speed="1.75"
                color="black"
            ></l-bouncy>
        </div>"""
    return jsonify({'status': 'success','html':html}), 200

@app.route('/api/GenerateBlogJsx', methods=['POST'])
def Jsx():
    data = request.json
    print(data)
    jsx = """<div className="h-72 w-full flex justify-center items-center">
            case 'jsx':
                if (!jsx) {
                    url = 'http://127.0.0.1:8080/api/GenerateBlogJsx'
                    setter = setJsx
                } else {
                    setContent(jsx)
                    return
                }
                break
        </div>"""
    return jsonify({'status': 'success','jsx':jsx}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)

