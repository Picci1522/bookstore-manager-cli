<<<<<<< HEAD
async function bootstrap() {
    console.log("🚀 BookStore Manager CLI inicializado com sucesso!");
}

bootstrap();
=======
import { showMainMenu } from './menus/main.menu';

const main = async () => {
    console.log("🚀 BookStore Manager CLI inicializado com sucesso!\n");
    
    // Chama o menu principal para a tela
    await showMainMenu();
};

main();
>>>>>>> bd1a9d9 (Primeiro commit)
