# 🚗 Sistema de Cadastro de Veículos

Uma aplicação web completa para gerenciamento de cadastro de veículos, desenvolvida com HTML, CSS e JavaScript puro.

## ✨ Funcionalidades

### ✅ Requisitos Implementados

- **R1 - Cadastro de veículo**: Formulário completo para cadastrar veículos com placa, modelo, marca e ano
- **R2 - Validação de placa**: Sistema verifica se a placa já está cadastrada antes de salvar
- **R3 - Edição de veículo**: Interface para editar informações de veículos existentes
- **R4 - Exclusão de veículo**: Funcionalidade para remover veículos com confirmação
- **R5 - Consulta de veículo**: Busca por placa, modelo ou marca
- **R6 - Listagem de veículos**: Tabela com todos os veículos cadastrados

### 🎯 Características Adicionais

- **Interface moderna e responsiva**: Design adaptável para diferentes tamanhos de tela
- **Validações robustas**: Verificação de formato de placa, ano válido e campos obrigatórios
- **Armazenamento local**: Dados salvos no localStorage do navegador
- **Busca em tempo real**: Filtragem automática durante a digitação
- **Notificações toast**: Feedback visual para todas as operações
- **Modal de confirmação**: Confirmação antes de excluir veículos
- **Dados de exemplo**: Aplicação vem com alguns veículos pré-cadastrados

## 🚀 Como Usar

### 1. Abrir a Aplicação
- Abra o arquivo `index.html` em qualquer navegador moderno
- A aplicação funcionará completamente offline

### 2. Cadastrar Veículo
- Preencha o formulário com:
  - **Placa**: Formato ABC-1234 ou ABC1234
  - **Modelo**: Nome do modelo do veículo
  - **Marca**: Fabricante do veículo
  - **Ano**: Ano de fabricação (1900-2031)
- Clique em "Cadastrar"

### 3. Editar Veículo
- Na tabela de veículos, clique no botão "✏️ Editar"
- O formulário será preenchido com os dados atuais
- Faça as alterações e clique em "Atualizar"
- Use "Cancelar" para desistir da edição

### 4. Excluir Veículo
- Na tabela de veículos, clique no botão "🗑️ Excluir"
- Confirme a exclusão no modal que aparecerá

### 5. Buscar Veículos
- Use o campo de busca para encontrar veículos por:
  - Placa
  - Modelo
  - Marca
- Clique em "Buscar" ou digite para busca automática
- Use "Limpar" para remover os filtros

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilos modernos com gradientes, sombras e animações
- **JavaScript ES6+**: Lógica da aplicação com classes e funcionalidades modernas
- **LocalStorage**: Armazenamento local dos dados
- **CSS Grid/Flexbox**: Layout responsivo e flexível

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🔒 Validações

### Placa
- Formato: ABC-1234 ou ABC1234
- Deve ser única no sistema
- Aceita letras maiúsculas e números

### Ano
- Deve estar entre 1900 e o ano atual + 1
- Validação de entrada numérica

### Campos Obrigatórios
- Placa, modelo e marca são obrigatórios
- Validação em tempo real

## 💾 Armazenamento

- **LocalStorage**: Dados persistem entre sessões do navegador
- **Estrutura**: Array de objetos JSON
- **Backup**: Os dados são salvos automaticamente após cada operação

## 🎨 Interface

### Cores
- **Primária**: Gradiente azul-roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#48bb78)
- **Erro**: Vermelho (#e53e3e)
- **Aviso**: Laranja (#ed8936)
- **Info**: Azul (#4299e1)

### Componentes
- **Formulários**: Campos com validação visual
- **Tabelas**: Responsivas com hover effects
- **Botões**: Com animações e estados hover
- **Modais**: Para confirmações importantes
- **Toasts**: Notificações temporárias

## 📁 Estrutura de Arquivos

```
sistema-veiculos/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── script.js           # Lógica JavaScript
└── README.md           # Este arquivo
```

## 🌟 Recursos Avançados

- **Padrão MVC**: Separação clara entre dados, lógica e interface
- **Event Delegation**: Gerenciamento eficiente de eventos
- **Formatação automática**: Placas são formatadas automaticamente
- **Persistência de dados**: Informações não são perdidas ao fechar o navegador
- **Feedback visual**: Confirmações visuais para todas as operações

## 🔧 Personalização

### Alterar Cores
Edite as variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --error-color: #e53e3e;
}
```

### Adicionar Campos
Para adicionar novos campos ao veículo:
1. Adicione o campo no HTML
2. Atualize a classe `VehicleManager` no JavaScript
3. Modifique as validações conforme necessário

## 📝 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

## 🤝 Contribuições

Sugestões e melhorias são sempre bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests
- Melhorar a documentação

---

**Desenvolvido com ❤️ usando tecnologias web modernas** 