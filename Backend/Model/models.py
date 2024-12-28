import hashlib
from pymongo import MongoClient
from typing import Dict


class UserDatabase:

    def __init__(self, uri: str, db_name: str, collection_name: str):

        # Initialize MongoDB client and database
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def hash_verify_code(self, verify_code: int) -> str:
        # Hash the verify_code using SHA-256
        return hashlib.sha256(str(verify_code).encode('utf-8')).hexdigest()

    def add_user(self, id: str, phone_number: str, email: str, full_name: str,
                 verify_code: int, timestamp: str, projects: dict, 
                 account_details: dict):
        # Create a new user document
        user = {
            "id": id,
            "phone_number": phone_number,
            "email": email,
            "full_name": full_name,
            "verify_code": self.hash_verify_code(verify_code),
            "timestamp": timestamp,
            "projects": projects,
            "account_details": account_details,
        }
        
        # Insert the document into the collection
        result = self.collection.insert_one(user)

    def get_user(self, email: str) -> Dict:
        # Retrieve a user document by phone number
        user = self.collection.find_one({"email": email})
        return user
    
    def find_user(self, id):
        user = self.collection.find_one({"id": id})
        return user

    def verify_user(self, email: str, verify_code: int) -> bool:
        # Verify if the provided verify_code matches the hashed code in the database
        user = self.get_user(email)
        if user:        
            hashed_code = self.hash_verify_code(verify_code)

            if user["verify_code"] == hashed_code:
                return user["id"]
    
    def update_code(self, email:str, code:int):
        updated_data = {"verify_code": self.hash_verify_code(code)}

        self.collection.update_one(
            {"email": email},
            {"$set":  updated_data}
        )
    
    def delete_user(self, email: str):
        # Delete a user document by phone number
        self.collection.delete_one({"email": email})

    def store_project(self, user_id: str, project_id, data):
        
        user = self.collection.find_one({"id": user_id})
        user["projects"][project_id] = data
        changed_data = {"projects": user["projects"]}

        self.collection.update_one(
            {"id": user_id},
            {"$set":  changed_data}
        )

    def retrive_project(self, user_id: str):
        
        user = self.collection.find_one({"id": user_id})
        
        if user:
            all_projects = user["projects"]
            for key in all_projects:
                all_projects[key].pop("data", None)
                all_projects[key].pop("titles", None)

            return all_projects
        
    def retrive_data_form_project(self, user_id: str, project_id: str):
        user = self.collection.find_one({"id": user_id})

        if user:
            data = {}
            all_projects = user["projects"][project_id]
            data["data"] = all_projects["data"]
            data["titles"] = all_projects["titles"]

            return data
        
    def update_project(self, user_id, project_id, titles, data):
        user = self.collection.find_one({"id": user_id})
        if user:
            pj = user["projects"][project_id]
            pj["titles"] = titles
            pj["data"] = data

            updated_data = {"projects": user["projects"]}
            
            
            self.collection.update_one(
                {"id": user_id},
                {"$set":  updated_data}
            )

        return True


'''
uri = "mongodb://localhost:27017/"
db_name = "user_database"
collection_name = "users_data"

DB = UserDatabase(uri, db_name, collection_name)

#DB.add_user('fjbewkrbfkewfn', '3294834324', "ffier@gmail.com", 'harsh kumar', '32423', '23:23:1212', {}, {})
#print(DB.update_code("ffier@gmail.com", 657567))
#print(DB.verify_user("ffier@gmail.com", 657567))

#data = {"project": "vve", "company": "ewfwe", "id": "bmFnZXNo", "project_id": "efwfw"}

#DB.store_project("bmFnZXNo", "efwfw", data)

#DB.update_project(user_id="1csPMtYgJKXD", project_id="4cbL4n", titles=s["O1B6nN"]["titles"], data=s["O1B6nN"]["data"])
#DB.retrive_data_form_project(user_id="1csPMtYgJKXD", project_id="4cbL4n")
DB.retrive_project(user_id="1csPMtYgJKXD")
#'''