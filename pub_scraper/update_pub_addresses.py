import firebase_admin
from firebase_admin import credentials, firestore
import requests
from urllib.parse import urlencode
import time
from google.api_core.exceptions import DeadlineExceeded

# Initialize Firebase Admin SDK
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Function to get address from latitude and longitude using OpenStreetMap Nominatim API
def get_address_from_coordinates(latitude, longitude):
    base_url = 'https://nominatim.openstreetmap.org/reverse'
    params = {
        'lat': latitude,
        'lon': longitude,
        'format': 'json',
        'addressdetails': 1
    }
    url = f"{base_url}?{urlencode(params)}"

    try:
        headers = {'User-Agent': 'Mozilla/5.0'}  # Nominatim requires a User-Agent header
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()

        if 'address' in data:
            address = data['display_name']  # Get the full formatted address
            return address
        else:
            print(f"Nominatim API error: No address found for coordinates {latitude},{longitude}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Request exception: {e}")
        return None

# Function to query pubs with latitude and longitude using pagination
def get_pubs_with_coordinates(batch_size=10):
    pubs_ref = db.collection('pubs').limit(batch_size)
    docs = pubs_ref.stream()

    while True:
        docs_list = list(docs)
        if len(docs_list) == 0:
            break

        for doc in docs_list:
            yield doc

        # Get the last document and use it as the starting point for the next batch
        last_doc = docs_list[-1]
        docs = pubs_ref.start_after(last_doc).limit(batch_size).stream()

# Function to update pub addresses in Firestore
def update_pub_addresses():
    try:
        pubs = get_pubs_with_coordinates(batch_size=20)  # Adjust batch size as necessary

        for pub_doc in pubs:
            pub_data = pub_doc.to_dict()
            pub_id = pub_doc.id
            latitude = pub_data.get('latitude')
            longitude = pub_data.get('longitude')
            pub_address = pub_data.get('pub_address', None)

            # Skip if pub_address is already filled
            if pub_address:
                print(f"Skipping {pub_data.get('pub_name', 'Unnamed Pub')} - Address already exists.")
                continue

            if latitude is not None and longitude is not None:
                # Get the full address using the coordinates
                address = get_address_from_coordinates(latitude, longitude)

                if address:
                    # Update Firestore with the full address
                    try:
                        pub_doc.reference.update({
                            'pub_address': address
                        })
                        print(f"Updated {pub_data.get('pub_name', 'Unnamed Pub')} with address: {address}")
                    except Exception as e:
                        print(f"Error updating pub {pub_id}: {e}")
                else:
                    print(f"Could not find address for pub {pub_data.get('pub_name', 'Unnamed Pub')}")
            else:
                print(f"Pub {pub_data.get('pub_name', 'Unnamed Pub')} has missing coordinates.")

            # Sleep to respect API rate limits (Nominatim suggests a 1 second delay between requests)
            time.sleep(1)  # Nominatim usage policy recommends 1 second between requests

    except DeadlineExceeded:
        print("Query timed out. Retrying...")
        time.sleep(5)  # Add some delay before retrying
        update_pub_addresses()  # Retry the operation

if __name__ == '__main__':
    update_pub_addresses()