# Scribz
Personalized AI blog generation

## Command Usage Guide on Linux
`git clone https://github.com/krrish-v/scribz`
### Install the Requirements

Run the command one by one
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

source ~/.nvm/nvm.sh

nvm install 16.16.0

nvm use 16.16.0

nvm alias default 16.16.0

curl -fsSL https://nodejs.org/dist/v16.16.0/node-v16.16.0-linux-x64.tar.xz -o node-v16.16.0-linux-x64.tar.xz

tar -xf node-v16.16.0-linux-x64.tar.xz

sudo mv node-v16.16.0-linux-x64 /usr/local/node

sudo ln -s /usr/local/node/bin/node /usr/bin/node

sudo ln -s /usr/local/node/bin/npm /usr/bin/npm

node -v

npm -v
```

```
pip install -r requirements.txt
```

### Requirements for Frontend

`cd scribz/Frontend`
Run one by one
```
npm install
npm install vite
npm install file-saver
npm install docx
```

If required
```
npm audit
npm audit fix
```
For details
`npm fund`

### Run Frontend
`sudo npm run dev`

### Requirements for Backend

1. Install MongoDB and run on localhost with this command
`sudo systemctl start mongod`
2. Create a Database named `user_database` and a collection named `users_datausers_data`
3. Create a Gemini API and paste it in a `scribz/Backend/.env` as `GOOGLE_API_KEY=<api_key>`
4. Now, go ahead to https://fastmail.com and create your new email. After that, go to Settings > Privacy & Security > Integrations > New App Password. Then, set the access to SMTP, and save the app password.
5. In your `scribz/Backend/.env` file, enter the following code:
```
MAIL_USERNAME=<name>@fastmail.com
MAIL_PASSWORD=<your_password>
```

### Run Backend
`python3 app.py`

======================================================================================

Visit `http://localhost:5173` on your web browser



## THANK YOU


