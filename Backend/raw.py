

import random
import string

def generate_random_string(length=12):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits
    # Use random.choices to select `length` characters from the pool
    random_string = ''.join(random.choices(characters, k=length))
    return random_string


print(generate_random_string())