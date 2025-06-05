# 🧠 SafeSpace App — React Native com Expo

Aplicativo mobile desenvolvido com **React Native** e **Expo**, como parte do projeto **SafeSpace**, uma iniciativa de apoio psicológico e logístico a vítimas de tragédias. Este app consome a API SafeSpace e oferece uma interface simples para **cadastro, login, solicitações de ajuda** e **agendamentos de sessões**.

---

## 📱 Funcionalidades

- Tela de **Login** e **Cadastro de Usuários**
- Visualização de um **Dashboard** com resumo de atividades
- Envio de **Solicitações de Ajuda**
- **Agendamento** de sessões de apoio emocional
- Integração com a **API RESTful** da SafeSpace

---

## 🚀 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- Integração com [SafeSpace API (.NET)](https://github.com/seu-usuario/safespace-api)

---

## 🛠️ Como Executar o Projeto

1. Clone o repositório:
git clone https://github.com/seu-usuario/safespace-app.git
cd safespace-app

2. Instale as dependências:
npm install

3. Inicie o projeto com o Expo:
npx expo start

4. Abra o app em:
- Dispositivo físico (via QR Code com o app Expo Go)
- Emulador Android (Android Studio)
- Simulador iOS (Xcode, apenas no macOS)

## 📁 Estrutura Principal
/app
├── screens
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Dashboard.tsx
│   └── Agendamentos.tsx
├── services
│   └── api.ts
├── components
│   └── [Componentes reutilizáveis]
└── App.tsx

## 🧪 Requisitos de Teste
Login com usuário cadastrado na API
Cadastro de novo usuário
Criação de nova solicitação de ajuda
Criação de agendamento
Visualização de dados no dashboard (resumo)

## 👨‍💻 Autores
Desenvolvido por FJS.dev Associados
#### Felipe Levy Stephens Fidelix - RM556426 
#### Jennifer Suzuki - RM554661 
#### Samir Hage Neto - RM557260