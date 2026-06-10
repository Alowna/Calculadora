# 🧮 Calculadora Desktop - Instalação Local

Este projeto é uma calculadora desktop híbrida construída com **Python (PyWebView)** no backend e **HTML5 + Bootstrap 5** no frontend.

---

## 🖥️ Compatibilidade e Requisitos de Sistema

O aplicativo utiliza o motor de renderização nativo do sistema operacional.

- **Windows:** Compatível com Windows 10/11 (usa Microsoft Edge WebView2 Runtime)
- **Linux:** Requer GTK3 e WebKitGTK instalados no sistema (ex: Ubuntu, Debian, Mint). Dependências podem variar entre distribuições.

---

## 🚀 Como Instalar e Executar

> 💡 Requisitos: Python 3, Node.js e um ambiente virtual (`venv`) ativo.

### 1. Instalar dependências Python e JS

```bash
cd vendor

pip install -r requirements.txt
npm install

cd ..

# Execute o backend da aplicação
python3 python/app.py
