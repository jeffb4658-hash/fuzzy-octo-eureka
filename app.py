import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Titan Master Controller: Online"

@app.route('/webhook', methods=['POST'])
def webhook():
    # This handles your incoming YouTube and Lemon Squeezy signals
    return {"status": "success"}, 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
  
