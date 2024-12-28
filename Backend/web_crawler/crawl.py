import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re


class Fetch:
    def __init__(self) -> None:
        self.turn = 0

        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }
        self.text = ""


    def fetch_page(self, url):
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.content
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None


    def parse_links_and_text(self, content, url):
        try:
            soup = BeautifulSoup(content, "html.parser")
            text = soup.get_text(separator=' ')
            sub_links = [urljoin(url, link.get('href')) for link in soup.find_all('a', href=True)]
            return text, sub_links
        except:
            return None, None


    def get(self, base_url):
        self.base_url = base_url
        text = None
        html = self.fetch_page(self.base_url)
        if html is not None:

            # Process the HTML content as needed
            text, links = self.parse_links_and_text(html, self.base_url)

        return text

class preprocessing:
    
    def clean_text(self, text):
        # Remove newline characters, extra spaces, and tabs
        cleaned_text = re.sub(r'[\n\t]', ' ', text)
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text)  # Remove extra spaces
        cleaned_text = cleaned_text.strip()  # Remove leading and trailing spaces
        cleaned_text = self.refined_text(cleaned_text)
        return cleaned_text
    
    def refined_text(self, text):
        text = text.lower()  # Convert to lowercase
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove non-alphanumeric characters
        return text
