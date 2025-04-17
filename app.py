
from flask import Flask, render_template, request, jsonify
import json
from urllib.parse import unquote

app = Flask(__name__)

with open('data/note_modul1.json') as f:
    date_note = json.load(f)

@app.route('/')
def index():
    with open('data/clasa5A.json') as f:
        elevi = json.load(f)
    return render_template('index.html', elevi=elevi)

@app.route('/elev/<nume>')
def elev(nume):
    modul = request.args.get('modul', '1')
    nume = unquote(nume)
    note = date_note.get(nume, {})
    return render_template('elev.html', nume=nume, modul=modul, note=note)

@app.route('/salveaza_note/<nume>', methods=['POST'])
def salveaza_note(nume):
    nume = unquote(nume)
    note_noua = request.json
    date_note[nume] = note_noua
    with open('data/note_modul1.json', 'w') as f:
        json.dump(date_note, f, indent=4)
    return jsonify({"status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
