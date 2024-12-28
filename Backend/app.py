from flask_cors import CORS
from flask import Flask, jsonify, request
from workflow import Backend
import json
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
from Model import models
import secrets
from datetime import datetime
import base64
import random
import string

# load .env file from the directory
load_dotenv()

os.environ['GOOGLE_API_KEY'] = os.getenv('GOOGLE_API_KEY')

app = Flask(__name__)

CORS(app, supports_credentials=True, allow_headers="*", origins="*", methods=["OPTIONS", "POST"])


uri = "mongodb://localhost:27017/"
db_name = "user_database"
collection_name = "users_data"

DB = models.UserDatabase(uri, db_name, collection_name)

backend = Backend()

# Configure Flask-Mail
app.config['MAIL_SERVER'] = "smtps-proxy.fastmail.com"
app.config['MAIL_PORT'] = 443 # Use the appropriate port for your mail server
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail = Mail(app)

class sent_mail:
    def __init__(self, recipients: str, code: int):

        self.sender = "scribz@fastmail.com"
        self.title = 'Scribz: Your One Time Password'

        self.html = '''
        <!DOCTYPE html>
        <html>
        <head>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        /**
            * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
            */
        @media screen {
            @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 400;
            src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
            font-family: 'Source Sans Pro';
            font-style: normal;
            font-weight: 700;
            src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }
        /**
            * Avoid browser level font resizing.
            * 1. Windows Mobile
            * 2. iOS / OSX
            */
        body,
        table,
        td,
        a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
        }
        /**
            * Remove extra space added to tables and cells in Outlook.
            */
        table,
        td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
        }
        /**
            * Better fluid images in Internet Explorer.
            */
        img {
            -ms-interpolation-mode: bicubic;
        }
        /**
            * Remove blue links for iOS devices.
            */
        a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }
        /**
            * Fix centering issues in Android 4.4.
            */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        /**
            * Collapse table borders to avoid space between cells.
            */
        table {
            border-collapse: collapse !important;
        }
        a {
            color: #1a82e2;
        }
        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
        </style>

        </head>
        <body style="background-color: #e9ecef;">

        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">

            <!-- start logo -->
            <tr>
            <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                    <a href="" target="_blank" style="display: inline-block;">
                        <img src="https://media.licdn.com/dms/image/D4D0BAQGvfLyBhgzZZA/company-logo_100_100/0/1698583216538?e=1714608000&v=beta&t=e644dEgqzzbc2ROXydwVGCTpGf9OmHhISkJP4U_SLLU" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                    </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
            </tr>
            <!-- end logo -->

            <!-- start hero -->
            <tr>
            <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
            </tr>
            <!-- end hero -->

            <!-- start copy block -->
            <tr>
            <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <!-- start copy -->
                <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">Thank you for signing up! To complete your registration, please verify your email address by entering this code</p>
                    </td>
                </tr>
                <!-- end copy -->

                <!-- start button -->
                <tr>
                    <td align="left" bgcolor="#ffffff">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td align="center" bgcolor="#1a82e2" style="border-radius: 3px;">
                                <p style=" padding: 0px 40px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 26px; color: #ffffff; text-decoration: none; border-radius: 1px;">Code: <strong>'''+str(code)+'''</strong></p>
                                </td>
                            </tr>
                        </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <!-- end button -->

                <!-- start copy -->
                <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    <p style="margin: 0;">If you didn't request this verification, please contact <a>contact@scribz.in</a></p>
                    </td>
                </tr>
                <!-- end copy -->
                <!-- start copy -->

                <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                    <p style="margin: 0;">Thankyou,<br> Scribz</p>
                    </td>
                </tr>
                <!-- end copy -->
                
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
            </tr>
            <!-- end copy block -->

            <!-- start footer -->
            <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                <!-- start permission -->
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">You received this email because we received a request for resgistration for your account. If you didn't request this verification you can safely delete this email.</p>
                        <a href="https://www.linkedin.com/company/scribz" target="_blank">Linkedin</a>
                        <a href="https://www.instagram.com/scribz" target="_blank">Instagram</a>
                        <a href="https://discord.gg/ervgreg" target="_blank">Discord</a>
                    </td>
                </tr>
                <!-- end permission -->

                <!-- start unsubscribe -->
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                    <p style="margin: 0;">&copy; 2024 Scribz. All rights reserved.</p>
                    </td>
                </tr>
                <!-- end unsubscribe -->

            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
            </td>
            </tr>
            <!-- end footer -->

        </table>
        <!-- end body -->

        </body>
        </html>'''

        self.message = Message(self.title,
                        sender=self.sender,
                        recipients=[recipients],
                        html=f"Your One-Time Password (OTP) is: {code}")

        with app.app_context():
            mail.send(self.message)


def generate_unique_code():
   # Generate a 6-digit unique integer
   unique_code = secrets.randbelow(10**6)
   return unique_code

def get_uri(str1, str2):
    # Combine the strings
    combined = str1 + str2
    
    # Encode the combined string using Base64
    encoded_bytes = base64.b64encode(combined.encode('utf-8'))
    encoded_str = encoded_bytes.decode('utf-8')
    
    return encoded_str


def generate_random_string(length=12):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits
    # Use random.choices to select `length` characters from the pool
    random_string = ''.join(random.choices(characters, k=length))
    return random_string


@app.route('/projects/get', methods=['POST'])
def get_projects():

    if request.method == 'POST':
        user_id = request.json["id"]

        all_project = DB.retrive_project(user_id)
        
        return jsonify({'status': 'success', 'projects': all_project})


@app.route('/projects/create', methods=['POST'])
def create_project():

    if request.method == "POST":
        project_name = request.json['project']
        company_name = request.json["company"]
        user_id = request.json["id"]
        project_id = generate_random_string(length=6)

        data = {"project_name": project_name, "company": company_name, "titles":None, "data": None}
        
        DB.store_project(user_id, project_id, data)

        return jsonify({'status': 'success'})


@app.route('/projects/blogs/save', methods=['POST'])
def save_project():

    if request.method == "POST":
        project_id = request.json["project_id"]
        titles = request.json["titles"]
        data = request.json["data"]
        user_id = request.json["user_id"]

        DB.update_project(user_id, project_id, titles, data)

        return jsonify({'status': 'success'})
    

@app.route('/projects/saved/allblogs', methods=['POST'])
def get_saved_all_blogs():
    if request.method == "POST":
        project_id = request.json["project_id"]
        user_id = request.json["user_id"]

        all_data = DB.retrive_data_form_project(user_id, project_id)

        return jsonify({"status": "success", "all_data": all_data})


@app.route('/projects/upload/url', methods=['POST'])
def upload_url():

    #if request.method == 'OPTIONS':
    #    return jsonify({'status': 'success', 'message': 'CORS preflight request handled successfully'}), 200

    if request.method == "POST":
        url = request.json['link']
        project_id = request.json['project_id']

        #keywords_json_string = backend.get_keywords(url)
        #keywords_json = json.loads(keywords_json_string)["keywords"]

        create = backend.create_db(url, project_id)

        return jsonify({'status': 'success', 'imported':create, "summary": ""})

    return False

@app.route('/projects/api/generatetitles', methods=['POST'])
def generate_title():

    if request.method == "POST":
        
        project_id = request.json['project_id']
        phrases = request.json['phrases']
        all_title = []

        for phrase in phrases:
            titles = backend.generate(model="gemini", task="titles", URI=project_id, phrase=phrase)
            all_title.append(titles)

        
        return jsonify({'status': 'success','titles':all_title})

    return False 


@app.route('/projects/api/generateblog', methods=['POST'])
def generate_blog():

    if request.method == "POST":
        title = request.json['title']
        keywords = request.json['keywords']
        custom_prompt = request.json['custom_prompt']
        project_id = request.json['project_id']

        blog =  backend.generate(model="gemini", task="blog", URI=project_id, title=title, custom_prompt=custom_prompt, keywords=", ".join(keywords))

        return jsonify({'status': 'success','blog':blog})

    return False 


@app.route('/projects/api/enhanceblog', methods=['POST'])
def enhance_blog():

    if request.method == "POST":
        custom_prompt = request.json['custom_prompt']
        blog = request.json['blog']

        enhaced_blog = backend.generate(model="gemini", task="enhance", custom_prompt=custom_prompt, blog=blog)

        return jsonify({'status': 'success','blog': enhaced_blog})

    return False 


@app.route('/projects/api/getcode', methods=['POST'])
def blog_code():

    if request.method == "POST":
        blog = request.json['blog']

        code = backend.code_of_blog(blog)\

        return jsonify({'status': 'success','code':code})

    return False 


@app.route('/login', methods=['POST'])
def login():
   
    if request.method == 'POST':
        email = request.json['email']

        user = DB.get_user(email=email)
        if user:
            code = generate_unique_code()
            DB.update_code(email=email, code=code)
            sent_mail(recipients=email, code=code)

            return jsonify({'status': 'success', "User": True, 'code_sent':True, 'message':"check you inbox {email} for verfication"})
      
        else: return jsonify({'status': 'success', "User": False, 'message':"Couldn't find the email, Create a new account"})
        


@app.route('/signup', methods=['POST'])
def singup():

    if request.method == 'POST':
        name = request.json['name']
        email = request.json['email']
        phone_number = request.json['phone_number']

        id = generate_random_string()
        
        existing_user = DB.get_user(email=email)
        if not existing_user:
            code = generate_unique_code()

            user = DB.add_user(
                id = str(id),
                phone_number=phone_number,
                email=email,
                full_name=name,
                verify_code=code,
                timestamp=str(datetime.now()),
                projects={},
                account_details={}
            )
            sent_mail(recipients=email, code=code)

            return jsonify({'status': 'success', "User": True, 'message':f"Account {email} has been created check you inbox for verfication"})
        else:
            return jsonify({'status': 'success', "User": False, 'message':f"Email {email} already exists, Try another email"})
              

@app.route('/otp/verify', methods=['POST'])
def verify():
    
    if request.method == 'POST':
        email = request.json['email']
        code = request.json['code']

        user_id = DB.verify_user(email=email, verify_code=code)
        return jsonify({'status': 'success', "id": user_id})
    


@app.route('/otp/resend', methods=['POST'])
def resend_otp():
    
    if request.method == 'POST':
        email = request.json['email']
    
        code = generate_unique_code()
        DB.update_code(email=email, code=code)

        return jsonify({'status': 'success', 'verification': True})


@app.route('/blog/save', methods=['POST'])
def save_blog():
    if request.method == 'POST':
        id = request.json["id"]
        project = request.json['project']

        DB.store_project(id, dict(project))
        
        return jsonify({'status': 'success', 'saved': True})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000, debug=False)
