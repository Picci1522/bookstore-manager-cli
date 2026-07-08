import inquirer from 'inquirer';

export const showAutorMenu = async (): Promise<void> => {
    const answers = await inquirer.prompt([
        {
            type: 'select',
            name: 'opcao',
            message: '--- Gerenciar Autores ---',
            choices: [
                'Listar Autores',
                'Cadastrar Autor',
                'Voltar ao Menu Principal'
            ]
        }
    ]);

    switch (answers.opcao) {
        case 'Listar Autores':
            console.log('\n📚 [Aqui vamos listar os autores do banco de dados em breve...]\n');
            await showAutorMenu(); 
            break;
        case 'Cadastrar Autor':
            console.log('\n📝 Preencha os dados do novo autor:');
            
            // Coletando os dados digitados pelo usuário
            const autorData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'nome',
                    message: 'Qual o nome do autor?'
                },
                {
                    type: 'input',
                    name: 'nacionalidade',
                    message: 'Qual a nacionalidade do autor?'
                }
            ]);

            // Mostrando os dados na tela para confirmar que capturamos certo
            console.log('\n✅ Dados capturados com sucesso (ainda não salvos no banco):');
            console.log(`Nome: ${autorData.nome}`);
            console.log(`Nacionalidade: ${autorData.nacionalidade}\n`);
            
            await showAutorMenu(); 
            break;
        case 'Voltar ao Menu Principal':
            console.log('\nVoltando...');
            break;
    }
};