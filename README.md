# 🧮 Calculadora Desktop - Instalação Local

Este repositório contém o código-fonte de uma calculadora desktop híbrida construída com **Python (PyWebView)** no backend e **HTML5/Bootstrap 5** no frontend. 

Siga as instruções abaixo para instalar as dependências de pacotes e executar o projeto em sua máquina.

---

## 🖥️ Compatibilidade e Requisitos de Sistema

O aplicativo utiliza o motor de renderização nativo do sistema operacional para desenhar a interface web. Certifique-se de que seu ambiente possui o suporte necessário:

* **Windows:** Compatível com **Windows 10/11** (Utiliza o motor nativo do Microsoft Edge WebView2).
* **Linux:** Compatível com distribuições baseadas em **Gnome/GTK3** (Ubuntu, Debian, Mint, etc.).

---

## 🚀 Como Instalar e Rodar

> 💡 **Nota:** Os passos abaixo assumem que você já possui o **Python 3** e o **Node.js** instalados, e que já está com o seu **ambiente virtual (venv) criado e devidamente ativado** no terminal.

### 1. Instalar as Dependências do Projeto
Navegue até a pasta `vendor/` para instalar simultaneamente os pacotes de backend (Python) e frontend (NPM):

```bash
# Entre na pasta de configurações
cd vendor

# Instale a biblioteca pywebview no seu ambiente virtual
pip install -r requirements.txt

# Instale os pacotes visuais (Bootstrap e Bootstrap Icons)
npm install

# Volte para a raiz do projeto
cd ..

# Execute o backend da aplicação
python3 python/app.py
