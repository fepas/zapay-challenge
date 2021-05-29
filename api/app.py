from flask import Flask
from flask_cors import CORS
from api.api import debts

app = Flask(__name__)
CORS(app)

app.register_blueprint(debts)

PORT = 5000


@app.route('/')
def index():
    return "Zapay debts API"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)
