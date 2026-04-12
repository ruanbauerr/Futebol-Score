import { registerRootComponent } from 'expo';

import App from './App';

// Ponto de entrada do Expo para ambientes nativo e web.
// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// Tambem garante que, no Expo Go ou no build nativo,
// o ambiente seja configurado corretamente.
registerRootComponent(App);
