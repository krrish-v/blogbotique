import os
from flask_cors import CORS
from together import Together
from flask import Flask, jsonify, request
from functools import wraps

app = Flask(__name__)
SECRET_KEY = 'JbkDGvjaDBKJ'
CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST","GET"])

# os.environ['TOGETHER_API_KEY'] = 'f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e'

# client = Together(api_key=os.environ.get('TOGETHER_API_KEY'))
client = Together(api_key="f8c8fa4fd70a01169d90a949a82246470d2d0e5620e80f026b4ea7453764598e")

user_projects = {
    'projects': [
        {'id': 1, 'name': 'Project A', 'description': 'Description for project A', 'company':'CompanyA', 'status':'12:30pm' ,'summary':"This test summary A for project A with company A"},
        {'id': 2, 'name': 'Project B', 'description': 'Description for project B', 'company':'CompanyB', 'status':'12:30pm','summary':"This test summary B for project B with company B"},
        {'id': 3, 'name': 'Project C', 'description': 'Description for project C', 'company':'CompanyC', 'status':'12:30pm','summary':"This test summary C for project C with company C"},
        {'id': 4, 'name': 'Project D', 'description': 'Description for project D', 'company':'CompanyD', 'status':'12:30pm','summary':"This test summary D for project D with company D"},
        {'id': 5, 'name': 'Project E', 'description': 'Description for project E', 'company':'CompanyE', 'status':'12:30pm','summary':"This test summary E for project E with company E"},
        {'id': 6, 'name': 'Project F', 'description': 'Description for project F', 'company':'CompanyF', 'status':'12:30pm','summary':"This test summary F for project F with company F"},
    ]
}

project_blogs = [
  {
    'id': 1,
    'title': "The Future of AI",
    'blog': "Artificial Intelligence is rapidly evolving, influencing industries from healthcare to finance. With advancements in machine learning and natural language processing, AI is poised to transform how we live and work. However, ethical concerns and the need for regulation remain critical as we move forward."
  },
  {
    'id': 2,
    'title': "Sustainable Living",
    'blog': "Sustainable living involves making choices that reduce our environmental impact. From minimizing waste to conserving energy, individuals can contribute to a healthier planet. Adopting renewable energy sources and supporting eco-friendly products are key steps in creating a sustainable future."
  },
  {
    'id': 3,
    'title': "The Power of Meditation",
    'blog': "Meditation is a powerful practice that promotes mental clarity and emotional well-being. By focusing on the present moment, individuals can reduce stress, improve concentration, and enhance overall quality of life. Regular meditation can lead to profound personal growth and inner peace."
  },
  {
    'id': 4,
    'title': "Digital Marketing Trends",
    'blog': "Digital marketing continues to evolve with new trends like AI-driven analytics, personalized content, and social media integration. Businesses must stay ahead by embracing these trends to reach their target audience effectively. Understanding customer behavior and leveraging data are essential for successful campaigns."
  },
  {
    'id': 5,
    'title': "The Importance of Sleep",
    'blog': "Quality sleep is vital for overall health, impacting everything from cognitive function to immune system strength. Establishing a consistent sleep routine and creating a restful environment can improve sleep quality. Prioritizing sleep is essential for maintaining physical and mental well-being."
  },
  {
    'id': 6,
    'title': "The Rise of Remote Work",
    'blog': "Remote work has become increasingly popular, offering flexibility and improved work-life balance. Companies are adapting to this trend by implementing remote-friendly policies and technologies. However, challenges such as maintaining productivity and team cohesion require careful management and innovative solutions."
  },
  {
    'id': 7,
    'title': "Healthy Eating Habits",
    'blog': "Healthy eating habits are crucial for maintaining energy levels, mental clarity, and overall health. Incorporating a balanced diet with plenty of fruits, vegetables, and whole grains can improve well-being. Mindful eating and portion control are also important aspects of a healthy lifestyle."
  },
  {
    'id': 8,
    'title': "The Impact of Social Media",
    'blog': "Social media has revolutionized how we communicate and share information. While it offers opportunities for connection and self-expression, it also presents challenges like misinformation and cyberbullying. Understanding the impact of social media on mental health and society is crucial for responsible usage."
  }
]

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

@app.route('/api/authenticatedata', methods=['POST'])
def LoginInfo ():
    
    return jsonify({'status': 'success', 'phone':7164814671}), 200


@app.route('/api/authenticateotp', methods=['POST'])
def AuthenticateOTP():
    data = request.json
    receivedOTP = data.get('otp')
    sentOTP = "1234"
    print(data)
    print(receivedOTP)
    if( receivedOTP == sentOTP):
        token = "jhbsjb@#*87239DUYb"
        return jsonify({'status': 'success' ,'token': token}), 200

    return jsonify({'status': 'error', 'message': 'Incorrect code'}), 400

@app.route('/api/userprojects')
def ReturnUserProjects():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    projects = user_projects['projects']
    blogs = 12
    return jsonify({'status': 'success', 'projects': projects, 'blogsnumber': blogs}), 200

@app.route('/api/getprojectsblogs')
def ReturnBlogs():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    
    return jsonify({'status': 'success','projectblogs': project_blogs}), 200
    
@app.route('/api/saveblog', methods=['OPTIONS', 'POST'])
def SaveBlogs():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200
    
    if request.method == 'POST':
        data = request.json
        print(data)
        return jsonify({'status': 'success'}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)

