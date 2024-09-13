from flask import Flask
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/create-payment-sessions", methods=['POST'])
def checkout():
    response = requests.post('https://api.sandbox.checkout.com/payment-sessions', json={
    "amount": 1000,
    "currency": "GBP",
    "reference": "ORD-123A",
    "billing": {
        "address": {
        "country": "GB"
        }
    },
    "customer": {
        "name": "Jia Tsang",
        "email": "jia.tsang@example.com"
    },
    "success_url": "https://example.com/payments/success",
    "failure_url": "https://example.com/payments/failure",
    "processing_channel_id": 'pc_djih7fwe2h2endlkxj44dbzidm'
}, headers={'Authorization': 'Bearer sk_sbox_cawu7kvkjmlmtekfkawdhd6nfyh'})
    
    json = response.json()
    return json

if __name__ == 'main':
    app.run()