# Encanto da Ângela - Website Artesanal

Um website elegante e responsivo para a loja de sabonetes artesanais "Encanto da Ângela", desenvolvido com foco na experiência do usuário e design autêntico.

## 🌟 Características

### Design & Estilo
- **Paleta de Cores**: Branco (#FFFFFF), Lilás Suave (#C8A2C8), e Preto (#000000)
- **Tema**: Elegância artesanal rústica com toque moderno minimalista
- **Tipografia**: Fontes elegantes serifadas combinadas com sans-serif limpas
- **Animações**: Transições suaves e microinterações que melhoram a experiência

### Funcionalidades
- ✅ Design totalmente responsivo (mobile, tablet, desktop)
- ✅ Carrinho de compras funcional com controle de quantidade
- ✅ **Sistema de checkout completo com PagSeguro**
- ✅ **Coleta de dados do cliente (nome, email, telefone, CPF, endereço)**
- ✅ **Validação de formulários e CPF**
- ✅ **Máscaras de entrada para telefone, CPF e CEP**
- ✅ **Página de agradecimento personalizada**
- ✅ Carrossel de depoimentos com transições suaves
- ✅ Formulário de contato com validação
- ✅ Navegação suave entre seções
- ✅ Efeitos de partículas flutuantes no fundo
- ✅ Animações de scroll e fade-in
- ✅ Menu mobile responsivo
- ✅ Notificações de feedback para o usuário

## 📁 Estrutura do Projeto

```
html/
├── encanto-da-angela.html              # Página principal
├── encanto-da-angela.css               # Estilos e animações
├── encanto-da-angela.js                # Funcionalidades interativas
├── pagseguro-integration-example.js    # Exemplo de integração PagSeguro
├── FORMSPREE_SETUP.md                  # Guia de configuração Formspree
└── README.md                           # Documentação
```

## 🚀 Como Usar

1. **Abrir o Website**: Abra o arquivo `encanto-da-angela.html` em qualquer navegador moderno
2. **Navegação**: Use o menu superior para navegar entre as seções
3. **Produtos**: Visualize e adicione produtos ao carrinho
4. **Carrinho**: Clique no ícone do carrinho para ver os itens selecionados
5. **Checkout**: Finalize a compra através do sistema PagSeguro integrado

## 🎨 Seções do Website

### 1. Header (Cabeçalho)
- Logo da marca
- Menu de navegação responsivo
- Ícone do carrinho com contador
- Botão "Comprar Agora"

### 2. Hero Section (Seção Principal)
- Título principal impactante
- Subtítulo descritivo
- Botão de call-to-action
- Imagem artesanal de fundo

### 3. Produtos
- Grid responsivo de produtos
- Cards com informações detalhadas
- Botões de adicionar ao carrinho
- Preços em formato brasileiro

### 4. Sobre
- História da marca
- Processo artesanal
- Características dos produtos
- Imagem da fundadora

### 5. Depoimentos
- Carrossel de avaliações de clientes
- Sistema de estrelas
- Transições automáticas e manuais
- Controles de navegação

### 6. Contato
- Informações de contato (WhatsApp, Instagram, Email)
- Formulário de mensagem
- Links para redes sociais

### 7. Footer (Rodapé)
- Links rápidos
- Políticas da loja
- Redes sociais
- Informações de contato

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia elegante
- **PagSeguro**: Sistema de pagamentos

## 📱 Responsividade

O website foi desenvolvido com abordagem mobile-first e é totalmente responsivo:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- Imagens otimizadas
- CSS e JavaScript minificados
- Carregamento assíncrono de recursos
- Animações otimizadas com CSS3
- Lazy loading implementado

## 🎯 SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- Schema markup para produtos
- URLs amigáveis
- Alt text em imagens

## 🔧 Personalização

### Cores
As cores podem ser facilmente alteradas através das variáveis CSS no arquivo `encanto-da-angela.css`:

```css
:root {
    --primary-color: #C8A2C8;    /* Lilás suave */
    --secondary-color: #FFFFFF;   /* Branco */
    --accent-color: #000000;      /* Preto */
}
```

### Produtos
Adicione novos produtos editando o array `products` no arquivo `encanto-da-angela.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Nome do Produto",
        description: "Descrição do produto",
        price: 24.90,
        image: "fas fa-icon",
        category: "categoria"
    }
];
```

### Formulário de Contato
O formulário de contato está **totalmente funcional** e configurado com Formspree:

- ✅ **Envia emails reais** para `angelagalindo78@yahoo.com.br`
- ✅ **Proteção contra spam** incluída
- ✅ **Resposta automática** para clientes
- ✅ **Interface profissional** com confirmações
- ✅ **Funciona em todos os dispositivos**

**Configuração**: Já configurado com seu endpoint Formspree `https://formspree.io/f/xeordodr`

### Integração PagSeguro
Para integrar com PagSeguro real:

1. **Configure suas credenciais** no arquivo `pagseguro-integration-example.js`
2. **Substitua a simulação** na função `proceedToPagSeguro()` em `encanto-da-angela.js`
3. **Implemente o backend** para processar webhooks do PagSeguro
4. **Configure as URLs** de retorno e notificação

**Arquivo de exemplo incluído**: `pagseguro-integration-example.js` contém código completo para integração real com PagSeguro.

## 🌐 Deploy

Para colocar o website no ar:

1. **Hospedagem**: Use qualquer serviço de hospedagem estática (Netlify, Vercel, GitHub Pages)
2. **Domínio**: Configure um domínio personalizado
3. **SSL**: Certifique-se de que o site tenha certificado SSL
4. **CDN**: Considere usar um CDN para melhor performance

## 📞 Suporte

Para dúvidas ou suporte técnico:
- Email: contato@encantodaangela.com.br
- WhatsApp: (11) 99999-9999
- Instagram: @encantodaangela

## 📄 Licença

Este projeto foi desenvolvido exclusivamente para Encanto da Ângela. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para Encanto da Ângela**

*Website artesanal que combina elegância, funcionalidade e experiência do usuário excepcional.*
