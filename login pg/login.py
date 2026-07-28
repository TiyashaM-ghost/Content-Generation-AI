from flask import Flask, request, jsonify

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('main.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify(error='Request body must be JSON.'), 400

    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not email or not password:
        return jsonify(error='Email and password are required.'), 400

    # Example validation logic. Replace with database lookup in production.
    if email == 'admin@example.com' and password == 'password':
        return jsonify(message='Login successful.')

    return jsonify(error='Invalid email or password.'), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data:
        return jsonify(error='Request body must be JSON.'), 400

    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not username or not email or not password:
        return jsonify(error='Username, email, and password are required.'), 400

    if len(password) < 6:
        return jsonify(error='Password must be at least 6 characters long.'), 400

    # Example signup response. Add persistence for real accounts.
    return jsonify(message='Account created successfully. Please log in.'), 201

if __name__ == '__main__':
    app.run(debug=True)
