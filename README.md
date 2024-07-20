# blogbotique
Presonalized AI blog generation

## Example usage

```python
from workflow import Backend

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
```
