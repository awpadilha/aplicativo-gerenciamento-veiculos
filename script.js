// Classe principal da aplicação
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
                            Editar
                        </button>
                        <button class="btn-delete" onclick="vehicleManager.showDeleteConfirmation('${vehicle.id}', '${this.formatPlaca(vehicle.placa)}')">
                            Excluir
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
let vehicleManager;

document.addEventListener('DOMContentLoaded', () => {
    vehicleManager = new VehicleManager();
    
    // Adicionar alguns veículos de exemplo se não houver nenhum
    if (vehicleManager.vehicles.length === 0) {
        const sampleVehicles = [
            {
                id: vehicleManager.generateId(),
                placa: 'ABC1234',
                modelo: 'Civic',
                marca: 'Honda',
                ano: 2022
            },
            {
                id: vehicleManager.generateId(),
                placa: 'XYZ5678',
                modelo: 'Corolla',
                marca: 'Toyota',
                ano: 2021
            },
            {
                id: vehicleManager.generateId(),
                placa: 'DEF9012',
                modelo: 'Golf',
                marca: 'Volkswagen',
                ano: 2023
            }
        ];
        
        sampleVehicles.forEach(vehicle => {
            vehicleManager.vehicles.push(vehicle);
        });
        
        vehicleManager.saveVehicles();
        vehicleManager.renderVehicles();
    }
});

// Funções globais para uso nos botões HTML
function editVehicle(id) {
    vehicleManager.editVehicle(id);
}

function deleteVehicle(id) {
    vehicleManager.showDeleteConfirmation(id);
} 