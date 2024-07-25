import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, firestore
import googlemaps

# Initialize Google Maps client
gmaps = googlemaps.Client(key='AIzaSyACytYc3bKJisNN5wILYgWxVJroMCRO_Io')

# Path to the local HTML file
html_file_path = 'local_pint_prices.html'

try:
    # Load the HTML content from the local file
    with open(html_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the leaderboard by identifying the class of the div containing the rows
    leaderboard = soup.find('div', {'class': 'leaderboard'})

    if leaderboard:
        rows = leaderboard.find_all('div', {'class': 'row'})[1:]  # Skipping the header row

        pubs = []

        for row in rows:
            cols = row.find_all('div', {'class': 'cell'})
            if len(cols) >= 5:  # Ensure there are enough columns
                pub_name = cols[1].text.strip()
                pint_type = cols[2].text.strip()
                pint_price = cols[3].text.strip()

                # Geocode the pub address (here assuming pub_name as address; adjust as needed)
                geocode_result = gmaps.geocode(pub_name)
                if geocode_result:
                    location = geocode_result[0]['geometry']['location']
                    latitude = location['lat']
                    longitude = location['lng']
                else:
                    latitude = None
                    longitude = None

                pubs.append({
                    'pub_name': pub_name,
                    'pint_type': pint_type,
                    'pint_price': pint_price,
                    'latitude': latitude,
                    'longitude': longitude
                })

        # Initialize Firebase Admin SDK
        cred = credentials.Certificate("serviceAccountKey.json")
        firebase_admin.initialize_app(cred)

        db = firestore.client()

        # Add scraped pub data to Firestore
        for pub in pubs:
            doc_ref = db.collection('pubs').document()
            doc_ref.set(pub)

        print("Data added to Firestore successfully!")
    else:
        print("No leaderboard found in the HTML file.")
except Exception as e:
    print(f"An error occurred: {e}")
