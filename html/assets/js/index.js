let Calculadora = {
    // ==========================================
    // 1. ESTADO DA APLICAÇÃO (STATE)
    // ==========================================
    // Guarda os dados brutos. Nunca altera a tela diretamente.
    state: {
        currentValue: "", // Número atualmente digitado
        history: ""       // Histórico de operações (ex: "2 + 2")
    },

    // ==========================================
    // 2. REFERÊNCIAS DO DOM (VIEW CACHE)
    // ==========================================
    // Mapeamento dos elementos HTML para evitar consultas lentas de "getElementById" repetidas vezes.
    refIds: {
        display: document.getElementById('displayScreen'),
        historyDisplay: document.getElementById('historyScreen'),
        numeros: document.querySelectorAll('.num-btn'),
        soma: document.getElementById('sum'),
        subtracao: document.getElementById('sub'),
        multiplicacao: document.getElementById('mult'),
        divisao: document.getElementById('div'),
        modulo: document.getElementById('modl'),
        raiz: document.getElementById('rootOf'),
        potenciaDois: document.getElementById('potTwo'),
        potencia: document.getElementById('potGeneral'),
        igual: document.getElementById('btn-equal'),
        limparTudo: document.getElementById('btn-clear'),
        apagarUltimo: document.getElementById('btn-delete'),
        logArea: document.getElementById('historyLogArea'),
        emptyMsg: document.getElementById('emptyHistoryMsg'),
        clearHistoryBtn: document.getElementById('btn-clear-history'),
        closeAppBtn: document.getElementById('btn-close-app'),
        themeToggleBtn: document.getElementById('btn-theme-toggle'),
        themeIcon: document.getElementById('theme-icon')
    },

    // ==========================================
    // 3. INICIALIZAÇÃO E EVENT LISTENERS
    // ==========================================
    // Ponto de entrada. Conecta os botões do HTML às funções lógicas.
    init() {
        this.refIds.numeros.forEach(btn => {
            btn.addEventListener('click', (e) => this.appendNumber(e.target.innerText));
        });

        this.refIds.soma.addEventListener('click', () => this.handleOperator('+'));
        this.refIds.subtracao.addEventListener('click', () => this.handleOperator('-'));
        this.refIds.multiplicacao.addEventListener('click', () => this.handleOperator('*'));
        this.refIds.divisao.addEventListener('click', () => this.handleOperator('/'));
        this.refIds.modulo.addEventListener('click', () => this.handleOperator('%'));
        this.refIds.potencia.addEventListener('click', () => this.handleOperator('**'));

        this.refIds.raiz.addEventListener('click', () => this.calculateSingle('sqrt'));
        this.refIds.potenciaDois.addEventListener('click', () => this.calculateSingle('sqr'));

        this.refIds.igual.addEventListener('click', () => this.calculateTotal());
        
        this.refIds.limparTudo.addEventListener('click', () => this.clearAll());
        this.refIds.apagarUltimo.addEventListener('click', () => this.deleteLast());
        this.refIds.clearHistoryBtn.addEventListener('click', () => this.clearHistoryPanel());
        
        this.refIds.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        this.refIds.closeAppBtn.addEventListener('click', () => this.closeApplication());
    },

    // ==========================================
    // 4. LÓGICA DE NEGÓCIOS (CONTROLLER)
    // ==========================================
    // Funções puramente lógicas. Modificam o 'state' e só depois mandam a interface se atualizar.

    appendNumber(num) {
        this.state.currentValue += num;
        this.updateDisplay(); // Chama a View para refletir a mudança
    },

    handleOperator(operator) {
        if (this.state.currentValue === "" && this.state.history === "") return;
        
        if (this.state.currentValue !== "") {
            if (this.state.history === "") {
                this.state.history = `${this.state.currentValue} ${operator} `;
            } else {
                // Adiciona parênteses para garantir a ordem matemática nas múltiplas operações
                this.state.history = `(${this.state.history.trim()} ${this.state.currentValue}) ${operator} `;
            }
        } else {
            // Se o usuário clicar em "+" e depois "-", substitui o último operador
            this.state.history = this.state.history.replace(/\s*(?:\*\*|[+\-*/%])\s*$/, ` ${operator} `);
        }
        
        this.state.currentValue = "";
        this.updateDisplay();
    },

    calculateTotal() {
        if (this.state.history === "" || this.state.currentValue === "") return;
        
        let fullExpression = this.state.history + this.state.currentValue;
        
        try {
            // "new Function" executa a string matemática compilando-a nativamente no JS
            let result = new Function('return ' + fullExpression)();

            // Proteção contra falha matemática (Ex: 5 / 0)
            if (!isFinite(result)) {
                this.registerHistory(fullExpression, "Erro");
                this.state.currentValue = "Indefinido"; 
                this.state.history = ""; 
                this.updateDisplay();
                this.state.currentValue = ""; 
                return; 
            }

            // Arredonda para no máximo 2 casas decimais
            let finalResult = String(Math.round(result * 100) / 100); 
            
            this.registerHistory(fullExpression, finalResult);
            
            this.state.currentValue = finalResult;
            this.state.history = ""; 
            this.updateDisplay();
        } catch (error) {
            this.state.currentValue = "Erro de Sintaxe";
            this.updateDisplay();
            this.state.currentValue = ""; 
        }
    },

    calculateSingle(operation) {
        if (this.state.currentValue === "") return;
        
        let val = Number(this.state.currentValue);
        // Operador ternário para definir qual conta matemática usar
        let result = operation === 'sqrt' ? Math.sqrt(val) : val ** 2;
        let finalResult = String(Math.round(result * 100) / 100);
        
        // Formata como a conta aparecerá no histórico lateral
        let visualExpression = operation === 'sqrt' ? `√(${val})` : `(${val})²`;
        
        this.registerHistory(visualExpression, finalResult);
        this.state.currentValue = finalResult;
        this.updateDisplay();
    },

    clearAll() {
        // Reseta os estados lógicos para vazio
        this.state.currentValue = "";
        this.state.history = "";
        this.updateDisplay();
    },

    deleteLast() {
        // Corta (slice) o último caractere digitado da string
        this.state.currentValue = this.state.currentValue.toString().slice(0, -1);
        this.updateDisplay();
    },

    // ==========================================
    // 5. MANIPULAÇÃO DO DOM E VIEW (INTERFACE)
    // ==========================================
    // Funções dedicadas exclusivamentes a alterar os visuais (HTML/CSS) baseadas no estado atual.

    updateDisplay() {
        // Atualiza a tela grande
        this.refIds.display.innerText = this.state.currentValue;
        
        // Traduz os símbolos lógicos JS (* e /) para símbolos visuais (× e ÷) no visor pequeno
        let visualHistory = this.state.history.replace(/\*/g, '×').replace(/\//g, '÷');
        this.refIds.historyDisplay.innerText = visualHistory;
    },

    registerHistory(expression, result) {
        // Remove a mensagem de "vazio" caso exista
        if (this.refIds.emptyMsg) {
            this.refIds.emptyMsg.style.display = 'none'; 
        }
        
        // Cria dinamicamente uma nova Div para o histórico
        const logItem = document.createElement('div');
        logItem.className = 'border-bottom border-secondary-subtle pb-2 mb-2 d-flex justify-content-between align-items-center fs-5';
        
        let visualExpression = expression.replace(/\*/g, '×').replace(/\//g, '÷');
        logItem.innerHTML = `<span class="text-body-secondary">${visualExpression} =</span> <span class="fw-bold text-body">${result}</span>`;
        
        // Injeta a nova div no topo do painel
        this.refIds.logArea.prepend(logItem); 
    },

    clearHistoryPanel() {
        // Substitui todo o conteúdo da área de log pela mensagem inicial padrão
        this.refIds.logArea.innerHTML = '<p id="emptyHistoryMsg" class="text-body-secondary text-center mt-3">Nenhum cálculo realizado ainda.</p>';
        this.refIds.emptyMsg = document.getElementById('emptyHistoryMsg'); // Recadastra a referência do DOM perdida
    },

    toggleTheme() {
        // Manipula atributos globais do HTML para engatilhar o CSS do Bootstrap
        const htmlElement = document.documentElement; 
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        
        if (currentTheme === 'light') {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            this.refIds.themeIcon.className = 'bi bi-sun-fill text-warning'; 
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            this.refIds.themeIcon.className = 'bi bi-moon-fill'; 
        }
    },

    // ==========================================
    // 6. INTEGRAÇÃO BACKEND (API WEBVIEW)
    // ==========================================
    // Comunicação com o sistema operacional via Python
    closeApplication() {
        if (window.pywebview && window.pywebview.api) {
            window.pywebview.api.fechar_app();
        } else {
            console.warn("A API do Python não está disponível (rodando no navegador?).");
        }
    }
};

// Start
Calculadora.init();