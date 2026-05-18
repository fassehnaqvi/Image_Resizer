from flask import Flask, render_template, request, send_file
from PIL import Image
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/resize", methods=["POST"])
def resize_image():
    file = request.files["image"]
    width = int(request.form["width"])
    height = int(request.form["height"])

    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(UPLOAD_FOLDER, "resized_" + file.filename)

    file.save(input_path)

    img = Image.open(input_path)
    resized = img.resize((width, height))
    resized.save(output_path)

    return send_file(output_path, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
