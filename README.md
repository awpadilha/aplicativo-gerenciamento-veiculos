# 🚗 Sistema de Gerenciamento de Veículos

Um sistema completo para cadastro, edição e gerenciamento de veículos com sistema de autenticação integrado.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- **Login seguro** com e-mail e senha
- **Controle de sessão** persistente
- **Proteção de rotas** - acesso restrito a usuários autenticados
- **Logout** com limpeza de sessão

### 🚙 Gerenciamento de Veículos
- **Cadastro** de novos veículos
- **Edição** de veículos existentes
- **Exclusão** com confirmação
- **Busca** por placa, modelo ou marca
- **Validação** de dados (placa brasileira, ano, etc.)
- **Armazenamento local** persistente

### 🎨 Interface
- **Design responsivo** para desktop e mobile
- **Interface moderna** com gradientes e sombras
- **Notificações toast** para feedback do usuário
- **Modais de confirmação** para ações críticas

## 🚀 Como Usar

### 1. Acesso ao Sistema
- Abra o arquivo `index.html` em seu navegador
- Use as credenciais padrão:
  - **E-mail:** `teste@teste.com`
  - **Senha:** `123456`

### 2. Gerenciando Veículos
- **Cadastrar:** Preencha o formulário e clique em "Cadastrar"
- **Editar:** Clique no botão "✏️ Editar" na lista
- **Excluir:** Clique no botão "🗑️ Excluir" e confirme
- **Buscar:** Use o campo de busca para encontrar veículos específicos

### 3. Sair do Sistema
- Clique no botão "Sair" no canto superior direito

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox e Grid
- **JavaScript ES6+** - Lógica da aplicação
- **LocalStorage** - Armazenamento local dos dados
- **Design Responsivo** - Funciona em todos os dispositivos

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 🔒 Segurança

- **Autenticação obrigatória** para acesso ao sistema
- **Validação de credenciais** no lado cliente
- **Sessão persistente** com localStorage
- **Proteção de rotas** implementada

## 📁 Estrutura do Projeto

```
aplicativo-gerenciamento-veiculos/
├── index.html          # Página principal com login e sistema
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript (auth + veículos)
└── README.md           # Documentação do projeto
```

## 🎯 Funcionalidades Técnicas

### Sistema de Autenticação
- Classe `AuthSystem` para gerenciar login/logout
- Validação de credenciais
- Controle de estado de autenticação
- Redirecionamento automático

### Gerenciamento de Veículos
- Classe `VehicleManager` para operações CRUD
- Validação de dados (placa, ano, etc.)
- Busca e filtros
- Persistência local

### Interface do Usuário
- Componentes modulares
- Estados visuais (loading, success, error)
- Feedback visual para todas as ações
- Design consistente e moderno

## 🔧 Personalização

### Alterar Credenciais de Login
Para alterar as credenciais padrão, edite o método `validateCredentials` no arquivo `script.js`:

```javascript
validateCredentials(email, password) {
    // Altere aqui as credenciais desejadas
    return email === 'seu@email.com' && password === 'suasenha';
}
```

### Adicionar Novos Campos
Para adicionar novos campos aos veículos, edite:
- Formulário HTML em `index.html`
- Validação em `script.js`
- Renderização na tabela

## 🚨 Limitações Atuais

- **Credenciais fixas** (para demonstração)
- **Armazenamento local** (sem banco de dados)
- **Sem recuperação de senha**
- **Sem múltiplos usuários**

## 🔮 Próximas Melhorias

- [ ] Sistema de usuários múltiplos
- [ ] Recuperação de senha
- [ ] Banco de dados backend
- [ ] API REST
- [ ] Upload de imagens dos veículos
- [ ] Relatórios e estatísticas
- [ ] Exportação de dados

## 📄 Licença

Este projeto é de uso livre para fins educacionais e comerciais.

---

**Desenvolvido com ❤️ para gerenciamento eficiente de frotas de veículos** 