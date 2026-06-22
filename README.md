# 🌿 EcoMida

> Reduza o desperdício, organize sua alimentação e cuide do planeta. 🌍

O **EcoMida** é um aplicativo mobile desenvolvido para ajudar usuários a gerenciar seus alimentos de forma inteligente. A aplicação permite controlar produtos armazenados, acompanhar datas de validade, receber alertas de vencimento e acessar dicas de armazenamento para reduzir desperdícios.

---

## 📱 Sobre o projeto

O desperdício de alimentos é um problema recorrente em muitas residências. Muitas vezes, produtos são esquecidos na geladeira, despensa ou freezer e acabam vencendo antes de serem consumidos.

O EcoMida foi criado para facilitar a organização desses alimentos, oferecendo recursos para cadastro, controle de estoque, acompanhamento de validade e notificações de alerta.

---

## 🎯 Objetivo

O objetivo principal do EcoMida é reduzir o desperdício de alimentos e incentivar hábitos mais sustentáveis por meio de um sistema de monitoramento e organização alimentar.

---

## ✨ Funcionalidades

### 🔐 Autenticação

* Cadastro de novos usuários
* Login com e-mail e senha
* Logout
* Persistência de sessão
* Recuperação de senha por e-mail
* Proteção de rotas para usuários autenticados

### 📦 Gerenciamento de alimentos

* Cadastro de alimentos
* Edição de produtos cadastrados
* Exclusão de produtos
* Busca por nome do alimento
* Filtro por status
* Alteração de status dos produtos

Cada alimento possui:

* Nome
* Categoria
* Quantidade
* Unidade de medida
* Data de validade
* Status

Categorias disponíveis:

* Bebida
* Fruta
* Legume
* Laticínio
* Proteína
* Padaria
* Congelado

Status disponíveis:

* Ativo
* Consumido
* Descartado

### 🔔 Notificações

* Alertas para produtos próximos da data de vencimento
* Badge no ícone de notificações indicando a quantidade de alertas
* Tela dedicada para visualização das notificações

### 📚 Dicas de armazenamento

* Dicas organizadas por categoria de alimento
* Busca por título, descrição ou categoria
* Sistema de favoritos
* Filtro para exibir apenas dicas favoritas
* Tela de detalhes com conteúdo completo
* Persistência local dos favoritos

### 👤 Perfil do usuário

* Visualização de nome, e-mail e foto de perfil
* Edição de nome e e-mail
* Alteração de senha com reautenticação
* Upload de foto de perfil
* Remoção de foto de perfil
* Preferências de alertas

---

## 🛠️ Tecnologias utilizadas

### Frontend

* React Native
* Expo
* TypeScript
* Expo Router
* NativeWind
* React Hook Form
* Zod

### Backend e banco de dados

* Firebase Authentication
* Cloud Firestore
* Firebase Security Rules

### Armazenamento de imagens

* Cloudinary

### Persistência local

* AsyncStorage

---

## 🏛️ Arquitetura

O projeto segue uma arquitetura organizada em camadas:

```text
Tela → Hook → Serviço → Firebase
```

### Camadas do sistema

| Camada       | Responsabilidade                          |
| ------------ | ----------------------------------------- |
| Apresentação | Telas, componentes e interface do usuário |
| Estado       | Contextos e gerenciamento de autenticação |
| Serviços     | Regras de negócio e comunicação com APIs  |
| Dados        | Firebase, Cloudinary e AsyncStorage       |

---

## 🔒 Segurança

O EcoMida utiliza práticas de segurança para proteger os dados dos usuários:

* Autenticação com Firebase Authentication
* Regras de segurança no Cloud Firestore
* Proteção de rotas internas
* Validação de formulários com React Hook Form e Zod
* Tokens de autenticação gerenciados pelo Firebase
* Variáveis sensíveis armazenadas no arquivo `.env`

---

## 🌍 Equipe EcoMida
