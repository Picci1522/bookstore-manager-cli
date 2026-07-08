import inquirer from 'inquirer';
import { showAutorMenu } from './autor.menu';

export const showMainMenu = async (): Promise<void> => {
    const answers = await inquirer.prompt([
        {
            type: 'select',
            name: 'opcao',
            message: 'Bem-vindo à BookStore Manager. O que deseja fazer?',
            choices: [
                'Gerenciar Autores',
                'Gerenciar Livros',
                'Gerenciar Clientes',
                'Realizar Empréstimo',
                'Sair'
            ]
        }
    ]);

    switch (answers.opcao) {
        case 'Gerenciar Autores':
            await showAutorMenu(); 
            await showMainMenu();  
            break;
        case 'Sair':
            console.log("Saindo do sistema...");
            process.exit();
    }
};