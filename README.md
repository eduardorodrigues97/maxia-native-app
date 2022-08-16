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


* Para teste, a conta tem que ser developer, então tem que clicar 7 vezes na versão da play store e dps ligar o internal app sharing kkkkkkkkkk
Open the play store app and tap on the side menu option present in the top right corner (tap the avatar).
Tap on Settings.
In the About section, just continuously tap the Play store version option for seven times.
Now, tap on the General section you will see the Internal App sharing option.

* Configuração build local APK https://docs.expo.dev/classic/turtle-cli/

* Get only APK: eas build -p android --profile preview
* Get .aab: eas build -p android

* Icon generator: https://easyappicon.com/


### Generating keystore

https://developer.android.com/studio/publish/app-signing

path: keystores/android/upload-keystore.jks
keystore password: ask Luiz or Eduardo

Generate .pem: `expo fetch:android:upload-cert`

Workaround pra não commitar o google-services.json
