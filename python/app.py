import webview
import os
import sys
import platform
import gi

def get_caminho_raiz():
    """
    Identifica de forma inteligente onde é a raiz do projeto (root).
    No dev: sobe uma pasta a partir de python/app.py.
    No .exe: a própria pasta temporária do PyInstaller é a raiz.
    """
    if getattr(sys, 'frozen', False):
        # Estamos rodando no executável compilado
        return sys._MEIPASS
    else:
        # Estamos em desenvolvimento (python app.py)
        # os.path.dirname(__file__) retorna a pasta 'python'. 
        # O '..' sobe de volta para a raiz do projeto.
        return os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

class Api:
    def __init__(self):
        # Mudamos de self.window para self._window
        self._window = None

    def fechar_app(self):
        if self._window:
            self._window.destroy()

        os._exit(0)

def main():
    # 1. Pega o caminho absoluto da raiz
    raiz = get_caminho_raiz()
    
    # 2. Monta o caminho do HTML 
    html_file_path = os.path.join(raiz, 'html', 'index.html')
    
    api = Api()

    window = webview.create_window(
        'Calculadora',
        url=f'file://{html_file_path}',
        width=900,
        height=600,
        resizable=False,
        frameless=True,
        js_api=api
    )

    api._window = window
    webview.start(debug=False)

if __name__ == '__main__':
    main()
