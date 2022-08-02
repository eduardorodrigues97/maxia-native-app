# maxia-native-app
Experiencia Professor

Tutorial para deploy do app na Play Store (`https://www.youtube.com/watch?v=oBWBDaqNuws`)
1. Criação da conta na Google Play
2. Criação do Projeto e Service Account (associada ao projeto)
3. Ajuste no app.json
4. Instalar eas-cli: `npm install -g eas-cli`
5. Login na Expo account: `eas login`
6. Configurar build para android: `eas build:configure`
    i. Atenção para as dependencias: `npm install`
7. Executar build para android: `eas build --platform android`