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
        this.isEditing = false;
        this.currentEditId = null;
        this.filteredVehicles = [];
        
        this.init();
    }

    init() {
        this.loadVehicles();
        this.bindEvents();
        this.renderVehicles();
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

        // Botão cancelar
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.cancelEdit();
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

        // Modal de confirmação
        document.getElementById('confirm-yes').addEventListener('click', () => {
            this.confirmDelete();
        });

        document.getElementById('confirm-no').addEventListener('click', () => {
            this.hideModal();
        });

        // Fechar modal ao clicar fora
        document.getElementById('confirm-modal').addEventListener('click', (e) => {
            if (e.target.id === 'confirm-modal') {
                this.hideModal();
            }
        });
    }

    // Validar placa (formato brasileiro: ABC-1234 ou ABC1234)
    validatePlaca(placa) {
        const placaRegex = /^[A-Z]{3}[-]?[0-9]{4}$/;
        return placaRegex.test(placa.toUpperCase());
    }

    // Verificar se placa já existe
    isPlacaDuplicate(placa, excludeId = null) {
        return this.vehicles.some(vehicle => 
            vehicle.placa.toUpperCase() === placa.toUpperCase() && 
            vehicle.id !== excludeId
        );
    }

    // Validar ano
    validateAno(ano) {
        const currentYear = new Date().getFullYear();
        return ano >= 1900 && ano <= currentYear + 1;
    }

    // Validar dados do veículo
    validateVehicle(vehicle) {
        const errors = [];

        if (!this.validatePlaca(vehicle.placa)) {
            errors.push('Placa deve estar no formato ABC-1234 ou ABC1234');
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
        return placa.slice(0, 3) + '-' + placa.slice(3);
    }

    // Normalizar placa para armazenamento
    normalizePlaca(placa) {
        return placa.replace('-', '').toUpperCase();
    }

    // Manipular envio do formulário
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('vehicle-form'));
        
        const vehicle = {
            id: this.currentEditId || this.generateId(),
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

        if (this.isEditing) {
            this.updateVehicle(vehicle);
        } else {
            this.addVehicle(vehicle);
        }
    }

    // Adicionar veículo
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
        this.saveVehicles();
        this.renderVehicles();
        this.clearForm();
        this.showToast('Veículo cadastrado com sucesso!', 'success');
    }

    // Atualizar veículo
    updateVehicle(vehicle) {
        const index = this.vehicles.findIndex(v => v.id === vehicle.id);
        if (index !== -1) {
            this.vehicles[index] = vehicle;
            this.saveVehicles();
            this.renderVehicles();
            this.cancelEdit();
            this.showToast('Veículo atualizado com sucesso!', 'success');
        }
    }

    // Excluir veículo
    deleteVehicle(id) {
        const index = this.vehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            const vehicle = this.vehicles[index];
            this.vehicles.splice(index, 1);
            this.saveVehicles();
            this.renderVehicles();
            this.showToast(`Veículo ${vehicle.placa} excluído com sucesso!`, 'success');
        }
    }

    // Editar veículo
    editVehicle(id) {
        const vehicle = this.vehicles.find(v => v.id === id);
        if (vehicle) {
            this.isEditing = true;
            this.currentEditId = id;
            
            // Preencher formulário
            document.getElementById('placa').value = this.formatPlaca(vehicle.placa);
            document.getElementById('modelo').value = vehicle.modelo;
            document.getElementById('marca').value = vehicle.marca;
            document.getElementById('ano').value = vehicle.ano;
            
            // Atualizar interface
            document.getElementById('form-title').textContent = 'Editar Veículo';
            document.getElementById('submit-btn').textContent = 'Atualizar';
            document.getElementById('cancel-btn').style.display = 'block';
            
            // Focar no primeiro campo
            document.getElementById('placa').focus();
        }
    }

    // Cancelar edição
    cancelEdit() {
        this.isEditing = false;
        this.currentEditId = null;
        this.clearForm();
        
        // Restaurar interface
        document.getElementById('form-title').textContent = 'Cadastrar Novo Veículo';
        document.getElementById('submit-btn').textContent = 'Cadastrar';
        document.getElementById('cancel-btn').style.display = 'none';
    }

    // Limpar formulário
    clearForm() {
        document.getElementById('vehicle-form').reset();
        document.getElementById('edit-id').value = '';
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
                        <button class="btn-edit" onclick="vehicleManager.editVehicle('${vehicle.id}')">
                            ✏️ Editar
                        </button>
                        <button class="btn-delete" onclick="vehicleManager.showDeleteConfirmation('${vehicle.id}', '${this.formatPlaca(vehicle.placa)}')">
                            🗑️ Excluir
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    // Mostrar confirmação de exclusão
    showDeleteConfirmation(id, placa) {
        document.getElementById('confirm-message').textContent = 
            `Tem certeza que deseja excluir o veículo com placa ${placa}?`;
        document.getElementById('confirm-modal').style.display = 'block';
        document.getElementById('confirm-yes').onclick = () => this.confirmDelete(id);
    }

    // Confirmar exclusão
    confirmDelete(id) {
        this.deleteVehicle(id);
        this.hideModal();
    }

    // Esconder modal
    hideModal() {
        document.getElementById('confirm-modal').style.display = 'none';
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

// Funções globais para uso nos botões HTML
function editVehicle(id) {
    if (vehicleManager) {
        vehicleManager.editVehicle(id);
    }
}

function deleteVehicle(id) {
    if (vehicleManager) {
        vehicleManager.showDeleteConfirmation(id);
    }
}

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
                placa: 'XYZ5678',
                modelo: 'Corolla',
                marca: 'Toyota',
                ano: 2021
            },
            {
                id: 'sample3',
                placa: 'DEF9012',
                modelo: 'Golf',
                marca: 'Volkswagen',
                ano: 2023
            }
        ];
        
        localStorage.setItem('vehicles', JSON.stringify(sampleVehicles));
    }
}); 