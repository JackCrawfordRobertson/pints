import json
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("PINTS_Firebase_Admin.json")  # Replace with the path to your Firebase Admin SDK JSON file
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load the JSON file
with open('pubs.json', 'r') as f:
    pubs = json.load(f)

# Upload each pub record to Firestore
for pub in pubs:
    doc_ref = db.collection('pubs_v2').document()  # Auto-generate document ID
    doc_ref.set(pub)

print("Data upload to Firestore complete!")
