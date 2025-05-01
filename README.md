# Quiz Interativo sobre Estruturas de Repetição

Este projeto é um quiz interativo desenvolvido em HTML, CSS (Tailwind CSS) e JavaScript puro, focado em testar conhecimentos sobre estruturas de repetição (loops) em programação. Ele inclui funcionalidades avançadas como persistência de dados usando `localStorage`, um sistema de tentativas com limites e tempo de espera, e feedback dinâmico para o usuário.

## Funcionalidades Principais

*   **Perguntas Variadas:** Apresenta 10 perguntas de múltipla escolha, divididas entre níveis fácil e difícil.
*   **Embaralhamento de Opções:** As opções de resposta para cada pergunta são embaralhadas a cada vez que a pergunta é carregada, evitando memorização da posição.
*   **Feedback Imediato:** O usuário recebe feedback visual instantâneo (correto/incorreto) após selecionar uma resposta.
*   **Cálculo de Pontuação:** A pontuação final é calculada e exibida ao término do quiz.
*   **Persistência de Progresso:**
    *   Utiliza o `localStorage` do navegador para salvar as respostas dadas e a pontuação atual.
    *   Permite que o usuário feche o navegador e retome o quiz posteriormente (dentro da mesma sessão de navegador ou até limpar o cache).
*   **Sistema de Tentativas Inteligente:**
    *   **Pontuação Mínima:** Exige que o usuário acerte pelo menos 8 das 10 perguntas para ser considerado "aprovado".
    *   **Limite de Tentativas:** Permite um máximo de 3 tentativas para alcançar a pontuação mínima.
    *   **Tempo de Espera:** Implementa um bloqueio de tempo entre tentativas falhas:
        *   10 minutos de espera após a 1ª tentativa falha.
        *   20 minutos de espera após a 2ª tentativa falha.
    *   **Bloqueio:** Impede novas tentativas após o limite de 3 ser atingido.
*   **Links Condicionais:** Apresenta links diferentes ao final do quiz, dependendo se o usuário atingiu ou não a pontuação mínima:
    *   **Aprovado:** Link para conteúdo especial.
    *   **Reprovado:** Link para material de revisão.
*   **Verificação de Compatibilidade:** Checa se o `localStorage` está disponível no navegador do usuário e informa caso não esteja.
*   **Interface Responsiva (Implícito pelo Tailwind):** A interface se adapta a diferentes tamanhos de tela (assumindo uso correto do Tailwind CSS no HTML).

## Como Usar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/mariorenanofc/teste-aula-10.git
    cd teste-aula-10
    ```
2.  **Abra o arquivo HTML:**
    Abra o arquivo `index.html` (ou o nome do seu arquivo HTML principal) diretamente em um navegador web moderno (como Chrome, Firefox, Edge, Safari).
3.  **Responda ao Quiz:** Siga as instruções na tela para responder às perguntas. Seu progresso e tentativas serão gerenciados automaticamente pelo script.

## Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **CSS3 (Tailwind CSS):** Estilização e layout da interface.
*   **JavaScript (ES6+):** Lógica do quiz, manipulação do DOM, interatividade, persistência com `localStorage` e gerenciamento das tentativas.

## Possíveis Melhorias Futuras

*   Adicionar mais perguntas e/ou categorias de perguntas.
*   Implementar um temporizador geral para o quiz ou individual para cada pergunta.
*   Refatorar o código JavaScript para maior modularidade (ex: separar a lógica do quiz, manipulação da UI e interações com `localStorage` em módulos ou classes distintas).
*   Melhorar a acessibilidade (ARIA attributes, navegação por teclado).
*   Adicionar animações mais elaboradas para transições e feedback.
*   Criar um backend simples para armazenar pontuações de forma mais permanente ou para um ranking.

---

Sinta-se à vontade para ajustar este modelo, adicionando ou removendo seções conforme necessário para o seu projeto!
