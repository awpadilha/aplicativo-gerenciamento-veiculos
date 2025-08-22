// Sistema de Autenticação
class AuthSystem {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.bindLoginEvents();
        this.bindLogoutEvent(); // Adicionar evento de logout aqui
    }

    // Verificar status de autenticação
    checkAuthStatus() {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.isAuthenticated = true;
            this.showMainSystem();
        } else {
            this.showLoginScreen();
        }
    }

    // Vincular eventos de login
    bindLoginEvents() {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }

    // Vincular evento de logout
    bindLogoutEvent() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    }

    // Manipular login
    handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (this.validateCredentials(email, password)) {
            this.login(email);
        } else {
            this.showToast('E-mail ou senha incorretos!', 'error');
        }
    }

    // Validar credenciais
    validateCredentials(email, password) {
        // Credenciais fixas para demonstração
        return email === 'teste@teste.com' && password === '123456';
    }

    // Realizar login
    login(email) {
        this.currentUser = { email };
        this.isAuthenticated = true;
        
        // Salvar no localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Mostrar sistema principal
        this.showMainSystem();
        
        this.showToast('Login realizado com sucesso!', 'success');
    }

    // Realizar logout
    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        
        // Limpar localStorage
        localStorage.removeItem('currentUser');
        
        // Mostrar tela de login
        this.showLoginScreen();
        
        this.showToast('Logout realizado com sucesso!', 'info');
    }

    // Mostrar tela de login
    showLoginScreen() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('main-system').style.display = 'none';
        
        // Limpar formulário
        document.getElementById('login-form').reset();
    }

    // Mostrar sistema principal
    showMainSystem() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-system').style.display = 'block';
        
        // Atualizar informações do usuário
        document.getElementById('user-email').textContent = this.currentUser.email;
        
        // Inicializar sistema de veículos
        if (!window.vehicleManager) {
            window.vehicleManager = new VehicleManager();
        }
        
        // Garantir que vehicleManager seja acessível globalmente
        window.vehicleManager = window.vehicleManager;
        
        // Aguardar um pouco para garantir que o DOM esteja pronto
        setTimeout(() => {
            if (window.vehicleManager) {
                window.vehicleManager.renderVehicles();
            }
        }, 100);
    }

    // Mostrar toast
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Classe principal da aplicação de veículos
class VehicleManager {
    constructor() {
        this.vehicles = [];
        this.filteredVehicles = [];
        
        this.init();
    }

    init() {
        this.loadVehicles();
        this.bindEvents();
        
        // Aguardar um pouco para garantir que o DOM esteja pronto
        setTimeout(() => {
            this.renderVehicles();
        }, 100);
    }

    // Carregar veículos do localStorage
    loadVehicles() {
        const saved = localStorage.getItem('vehicles');
        if (saved) {
            this.vehicles = JSON.parse(saved);
        }
    }

    // Salvar veículos no localStorage
    saveVehicles() {
        localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    }

    // Vincular eventos
    bindEvents() {
        // Formulário
        document.getElementById('vehicle-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Busca
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchVehicles();
        });

        document.getElementById('clear-search-btn').addEventListener('click', () => {
            this.clearSearch();
        });

        // Busca em tempo real
        document.getElementById('search-input').addEventListener('input', (e) => {
            if (e.target.value.trim() === '') {
                this.clearSearch();
            }
        });

        // Validação em tempo real da placa
        document.getElementById('placa').addEventListener('input', (e) => {
            this.validatePlacaRealTime(e.target);
        });
    }

    // Validar placa (formato brasileiro: ABC-1234 ou ABC1234)
    validatePlaca(placa) {
        // Padrão antigo: ABC-1234 ou ABC1234
        const placaAntigaRegex = /^[A-Z]{3}[-]?[0-9]{4}$/;
        
        // Novo padrão Mercosul: ABC1D23 ou ABC-1D23
        const placaMercosulRegex = /^[A-Z]{3}[-]?[0-9][A-Z][0-9]{2}$/;
        
        const placaUpper = placa.toUpperCase();
        return placaAntigaRegex.test(placaUpper) || placaMercosulRegex.test(placaUpper);
    }

    // Verificar se placa já existe
    isPlacaDuplicate(placa, excludeId = null) {
        // Normalizar a placa antes da comparação
        const normalizedPlaca = this.normalizePlaca(placa);
        return this.vehicles.some(vehicle => 
            vehicle.placa.toUpperCase() === normalizedPlaca.toUpperCase() && 
            vehicle.id !== excludeId
        );
    }

    // Validar ano
    validateAno(ano) {
        const currentYear = new Date().getFullYear();
        return ano >= 1900 && ano <= currentYear + 1;
    }

    // Detectar tipo de placa
    detectPlacaType(placa) {
        const placaUpper = placa.toUpperCase();
        
        // Padrão antigo: ABC-1234 ou ABC1234
        if (/^[A-Z]{3}[-]?[0-9]{4}$/.test(placaUpper)) {
            return 'antigo';
        }
        
        // Novo padrão Mercosul: ABC1D23 ou ABC-1D23
        if (/^[A-Z]{3}[-]?[0-9][A-Z][0-9]{2}$/.test(placaUpper)) {
            return 'mercosul';
        }
        
        return 'invalido';
    }

    // Validar dados do veículo
    validateVehicle(vehicle) {
        const errors = [];

        if (!this.validatePlaca(vehicle.placa)) {
            errors.push('Placa deve estar no formato:\n• Padrão antigo: ABC-1234 ou ABC1234\n• Novo padrão Mercosul: ABC1D23 ou ABC-1D23');
        }

        if (this.isPlacaDuplicate(vehicle.placa, vehicle.id)) {
            errors.push('Placa já cadastrada no sistema');
        }

        if (!vehicle.modelo.trim()) {
            errors.push('Modelo é obrigatório');
        }

        if (!vehicle.marca.trim()) {
            errors.push('Marca é obrigatória');
        }

        if (!this.validateAno(vehicle.ano)) {
            errors.push('Ano deve estar entre 1900 e ' + (new Date().getFullYear() + 1));
        }

        return errors;
    }

    // Gerar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Formatar placa para exibição
    formatPlaca(placa) {
        if (placa.includes('-')) {
            return placa;
        }
        
        // Para placas de 7 caracteres (ambos os padrões): ABC1234 -> ABC-1234, ABC1D23 -> ABC-1D23
        if (placa.length === 7) {
            return placa.slice(0, 3) + '-' + placa.slice(3);
        }
        
        return placa;
    }

    // Normalizar placa para armazenamento
    normalizePlaca(placa) {
        // Remove hífen e converte para maiúsculo
        const normalized = placa.replace('-', '').toUpperCase();
        
        // Valida se a placa está em um dos formatos aceitos
        if (this.validatePlaca(normalized)) {
            return normalized;
        }
        
        // Se não validar, retorna a placa original sem hífen
        return normalized;
    }

    // Manipular envio do formulário
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('vehicle-form'));
        
        const vehicle = {
            id: this.generateId(),
            placa: this.normalizePlaca(formData.get('placa')),
            modelo: formData.get('modelo').trim(),
            marca: formData.get('marca').trim(),
            ano: parseInt(formData.get('ano'))
        };

        // Validação
        const errors = this.validateVehicle(vehicle);
        if (errors.length > 0) {
            this.showToast(errors.join('\n'), 'error');
            return;
        }

        this.addVehicle(vehicle);
    }

    // Adicionar veículo
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
        this.saveVehicles();
        this.renderVehicles();
        this.clearForm();
        
        const placaType = this.detectPlacaType(vehicle.placa);
        let message = 'Veículo cadastrado com sucesso!';
        
        if (placaType === 'mercosul') {
            message += ' (Placa no novo padrão Mercosul)';
        } else if (placaType === 'antigo') {
            message += ' (Placa no padrão antigo)';
        }
        
        this.showToast(message, 'success');
    }



    // Limpar formulário
    clearForm() {
        document.getElementById('vehicle-form').reset();
    }

    // Buscar veículos
    searchVehicles() {
        const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
        
        if (searchTerm === '') {
            this.filteredVehicles = [...this.vehicles];
        } else {
            this.filteredVehicles = this.vehicles.filter(vehicle => 
                vehicle.placa.toLowerCase().includes(searchTerm) ||
                vehicle.modelo.toLowerCase().includes(searchTerm) ||
                vehicle.marca.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderVehicles();
        
        if (this.filteredVehicles.length === 0 && searchTerm !== '') {
            this.showToast('Nenhum veículo encontrado com os termos da busca.', 'info');
        }
    }

    // Limpar busca
    clearSearch() {
        document.getElementById('search-input').value = '';
        this.filteredVehicles = [...this.vehicles];
        this.renderVehicles();
    }

    // Renderizar veículos
    renderVehicles() {
        const vehiclesToShow = this.filteredVehicles.length > 0 ? this.filteredVehicles : this.vehicles;
        const tbody = document.getElementById('vehicles-tbody');
        const noVehicles = document.getElementById('no-vehicles');
        const vehiclesCount = document.getElementById('vehicles-count');
        const table = document.getElementById('vehicles-table');
        
        // Atualizar contador
        vehiclesCount.textContent = `${vehiclesToShow.length} veículo${vehiclesToShow.length !== 1 ? 's' : ''} cadastrado${vehiclesToShow.length !== 1 ? 's' : ''}`;
        
        if (vehiclesToShow.length === 0) {
            tbody.innerHTML = '';
            noVehicles.style.display = 'block';
            table.style.display = 'none';
        } else {
            noVehicles.style.display = 'none';
            table.style.display = 'table';
            
            tbody.innerHTML = vehiclesToShow.map(vehicle => `
                <tr>
                    <td><strong>${this.formatPlaca(vehicle.placa)}</strong></td>
                    <td>${vehicle.modelo}</td>
                    <td>${vehicle.marca}</td>
                    <td>${vehicle.ano}</td>
                    <td class="actions">
                        <button class="btn-edit" onclick="window.vehicleManager.showEditMessage('${vehicle.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn-delete" onclick="window.vehicleManager.showDeleteConfirmation('${vehicle.id}')">
                            🗑️ Excluir
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }



    // Mostrar mensagem de edição (simulando sucesso)
    showEditMessage(id) {
        const vehicle = this.vehicles.find(v => v.id === id);
        if (vehicle) {
            this.showToast(`Veículo ${this.formatPlaca(vehicle.placa)} editado com sucesso!`, 'success');
        }
    }

    // Mostrar confirmação de exclusão (simulando sucesso)
    showDeleteConfirmation(id) {
        const vehicle = this.vehicles.find(v => v.id === id);
        if (vehicle) {
            document.getElementById('confirm-message').textContent = 
                `Tem certeza que deseja excluir o veículo com placa ${this.formatPlaca(vehicle.placa)}?`;
            document.getElementById('confirm-modal').style.display = 'block';
        }
    }

    // Simular exclusão bem-sucedida
    hideModal() {
        document.getElementById('confirm-modal').style.display = 'none';
        // Simular mensagem de sucesso da exclusão
        this.showToast('Veículo excluído com sucesso!', 'success');
    }

    // Validar placa em tempo real
    validatePlacaRealTime(input) {
        const placa = input.value.trim();
        const placaType = this.detectPlacaType(placa);
        
        // Remover classes anteriores
        input.classList.remove('valid-placa', 'invalid-placa', 'mercosul-placa');
        
        if (placa === '') {
            return;
        }
        
        if (placaType === 'invalido') {
            input.classList.add('invalid-placa');
        } else if (placaType === 'mercosul') {
            input.classList.add('valid-placa', 'mercosul-placa');
        } else {
            input.classList.add('valid-placa');
        }
    }

    // Mostrar toast
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Inicializar aplicação quando a página carregar
let authSystem;
let vehicleManager;



// Configuração global adicional para o botão de logout
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.authSystem) {
        logoutBtn.addEventListener('click', () => {
            window.authSystem.logout();
        });
    }
}

// Configurar botão de logout quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de autenticação
    authSystem = new AuthSystem();
    
    // Configurar botão de logout globalmente
    setupLogoutButton();
    
    // Adicionar alguns veículos de exemplo se não houver nenhum
    if (localStorage.getItem('vehicles') === null) {
        const sampleVehicles = [
            {
                id: 'sample1',
                placa: 'ABC1234',
                modelo: 'Civic',
                marca: 'Honda',
                ano: 2022
            },
            {
                id: 'sample2',
                placa: 'XYZ1A23',
                modelo: 'Corolla',
                marca: 'Toyota',
                ano: 2021
            },
            {
                id: 'sample3',
                placa: 'DEF9B12',
                modelo: 'Golf',
                marca: 'Volkswagen',
                ano: 2023
            }
        ];
        
        localStorage.setItem('vehicles', JSON.stringify(sampleVehicles));
    }
}); 