from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index-copy.html')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
