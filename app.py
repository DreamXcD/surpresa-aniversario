from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    # Caminho para a pasta de imagens
    images_dir = os.path.join(app.static_folder, 'images')
    
    # Lista todas as imagens na pasta (ignora arquivos que não sejam imagens)
    images = []
    if os.path.exists(images_dir):
        images = [f for f in os.listdir(images_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
    
    return render_template('index.html', images=images)

if __name__ == '__main__':
    # Roda o servidor na porta 5000
    app.run(debug=True)