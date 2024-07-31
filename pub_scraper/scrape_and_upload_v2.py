import json
import re
import requests
from bs4 import BeautifulSoup

# Function to get latitude and longitude from the Google Geocoding API
def get_lat_long(pub_name):
    api_key = 'AIzaSyACytYc3bKJisNN5wILYgWxVJroMCRO_Io'  # Replace with your actual Google Maps API key
    endpoint = f'https://maps.googleapis.com/maps/api/geocode/json?address={pub_name},London,UK&key={api_key}'
    response = requests.get(endpoint)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
    return None, None

# Load the local HTML file
with open('./pub_v2.html', 'r') as file:
    html_content = file.read()

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Find all instances of pub names and prices in the text using regex
pattern = re.compile(r'\[\["([^"]+?)\s*-\s*£(\d+(\.\d+)?)"\]\]')
matches = pattern.findall(html_content)

pubs = []

# Extract pub names and prices
for match in matches:
    pub_name = match[0]
    pub_price = f"£{match[1]}"
    
    # Clean the pub name and price
    pub_name = pub_name.replace("\\u0026", "&").replace("\\", "")
    pub_price = pub_price.replace("\u00a3", "£")

    pubs.append({
        'pub_name': pub_name,
        'price': pub_price,
        'latitude': None,  # Placeholder for latitude
        'longitude': None  # Placeholder for longitude
    })

# Fetch latitude and longitude for each pub
for pub in pubs:
    latitude, longitude = get_lat_long(pub['pub_name'])
    pub['latitude'] = latitude
    pub['longitude'] = longitude
    print(f"{pub['pub_name']}: {pub['price']} (Lat: {pub['latitude']}, Lng: {pub['longitude']})")

# Save the extracted data to a JSON file
with open('pubs.json', 'w') as f:
    json.dump(pubs, f, indent=4)

print("Data extraction complete and saved to pubs.json")
