# Changelog - Sistema de Cadastro de Veículos

## [2.0.0] - 2024-12-19

### ✨ Novas Funcionalidades
- **Suporte ao novo padrão de placas brasileiro (Mercosul)**
  - Agora aceita placas no formato: ABC1D23 (novo padrão Mercosul)
  - Mantém compatibilidade com o formato antigo: ABC-1234
  - Validação automática de ambos os formatos

### 🔧 Melhorias na Validação
- **Validação em tempo real** do campo de placa
- **Feedback visual** para diferentes tipos de placa:
  - 🟢 Verde: Placa válida (padrão antigo)
  - 🔵 Azul: Placa válida (novo padrão Mercosul)
  - 🔴 Vermelho: Placa inválida
- **Mensagens informativas** sobre o tipo de placa cadastrada

### 📝 Atualizações na Interface
- **Placeholder atualizado** para mostrar ambos os formatos aceitos
- **Mensagem de ajuda** abaixo do campo de placa
- **Maxlength aumentado** para 9 caracteres (para acomodar o hífen opcional)

### 🎯 Funcionalidades Técnicas
- **Detecção automática** do tipo de placa (antigo vs. Mercosul)
- **Normalização inteligente** das placas para armazenamento
- **Validação robusta** com regex para ambos os formatos
- **Formatação automática** para exibição (adiciona hífen quando necessário)

### 📊 Formatos de Placa Suportados
1. **Padrão Antigo (ABC-1234)**
   - 3 letras + hífen + 4 números
   - Exemplo: ABC-1234, XYZ-5678

2. **Novo Padrão Mercosul (ABC1D23)**
   - 3 letras + 1 número + 1 letra + 2 números
   - Exemplo: ABC1D23, XYZ5A67

### 🔍 Exemplos de Uso
- **Cadastro**: O sistema aceita ambos os formatos automaticamente
- **Edição**: Mantém o formato original da placa
- **Busca**: Funciona com ambos os formatos
- **Validação**: Feedback visual em tempo real

### 🚀 Como Usar
1. Digite a placa no campo correspondente
2. O sistema validará automaticamente o formato
3. Feedback visual indicará se a placa é válida e de qual tipo
4. Ao cadastrar, o sistema informará o padrão da placa

### 🧪 Testes
- Testado com placas do padrão antigo
- Testado com placas do novo padrão Mercosul
- Validação de duplicatas funcionando para ambos os formatos
- Formatação automática para exibição
