from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/about')
def about():
    return render_template('About.html')

@app.route('/contact')
def contact():
    return render_template('Contact.html')

@app.route('/products')
def products():
    return render_template('Products.html')

@app.route('/register')
def register():
    return render_template('Register.html')

@app.route('/login')
def login():
    return render_template('Login.html')

@app.route('/cart')
def cart():
    return render_template('Cart.html')


if __name__ == '__main__':
    app.run(debug=True)
