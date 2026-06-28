/**
 * Trabalho Prático - Fundamentos de Projeto e Análise de Algoritmos
 * PUC Minas - campus Contagem
 * Professora: Amália Vasconcelos
 * ------------------------------------------------------------------------------------------------------------------------------------------
 * Autores: Alice Machado Villalba Costa, Gabriel Lucas Diniz Alves, Ingrid Yara Alves dos Santos, Joao Felipe da Silva Prado, 
 * Otavio Soares da Costa, Pedro Antonio Silva Neto, Wanessa Cristina Ribeiro de Paula
 * Data: 27/06/2026
 * Versão: 1.0
 * ------------------------------------------------------------------------------------------------------------------------------------------
 *
 * Arquivo 2 - Solução usando programação dinâmica + backtracking
 *
 * Diferente do arquivo 1, aqui separamos o problema em duas etapas:
 *
 *   1) Programação dinâmica: monta uma tabela só com os COMPRIMENTOS da LCS para cada par
 *      de posições (i, j) das duas strings. Não guardamos nenhuma sequência de caracteres
 *      nessa etapa, só números - isso é rápido e gasta pouca memória.
 *
 *   2) Backtracking: percorre essa tabela de comprimentos de trás pra frente, reconstruindo
 *      todas as sequências possíveis que atingem o comprimento máximo. É nessa etapa que as
 *      strings da LCS são realmente montadas.
 *
 * O backtracking é necessário porque, quando os caracteres comparados são diferentes, pode
 * haver mais de um caminho na tabela que leva ao mesmo comprimento ótimo. A tabela de DP não
 * guarda "qual caminho foi escolhido" - ela só guarda o tamanho. Por isso é preciso percorrer
 * (voltar) pela tabela testando cada ramificação válida para descobrir todas as sequências.
 * -------------------------------------------------------------------------------------------------------------------------------------------
 */

// -------------------------------------------------------------------------------------------------------------------------------------------
// Etapa 1 - Programação dinâmica
//
// Monta uma tabela dp com (n+1) linhas e (m+1) colunas, onde cada célula dp[i][j] guarda
// apenas o comprimento da LCS considerando os sufixos a partir das posições i (em 'a') e j (em 'b').
// A última linha e a última coluna são a "borda" (0), que representa string vazia.
// -------------------------------------------------------------------------------------------------------------------------------------------
function montarTabelaComprimentos(a, b) {
    const n = a.length;
    const m = b.length;

    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    /* 
    * Preenche de trás pra frente (do fim das strings pro começo),
    * mas guardando só o tamanho - sem montar nenhuma string aqui.
    */
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (a[i] === b[j]) {
                // Caractere igual: esse caractere obrigatoriamente entra na LCS,
                // então o comprimento é 1 + o que vem da diagonal.
                dp[i][j] = dp[i + 1][j + 1] + 1;
            } else {
                // Caracteres diferentes: o melhor comprimento é o maior entre
                // "avançar em a" (célula de baixo) e "avançar em b" (célula da direita).
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }

    return dp;
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// Etapa 2 - Backtracking
//
// Usa a tabela de comprimentos (já pronta) para reconstruir todas as LCS possíveis.
// A função "olha" para a posição (i, j) e decide para onde ir, com base nos comprimentos
// já calculados pela DP - nenhuma comparação de caractere é refeita aqui além da que decide
// se o caractere atual entra ou não na sequência.
//
// Usamos um cache (memo) guardado em um Map, para não recalcular o backtracking da mesma
// posição (i, j) mais de uma vez - isso evita que a quantidade de chamadas recursivas explique.
// -------------------------------------------------------------------------------------------------------------------------------------------
function backtrack(a, b, dp, i, j, memo) {
    const n = a.length;
    const m = b.length;

    /**
     * Caso base: fim de uma das duas strings.
     * Se não há mais nenhum caractere para combinar, então a única sequência possível é a vazia.
    */
    if (i === n || j === m) {
        return new Set([""]);
    }

    /**
     *  Se essa posição já foi resolvida antes, reaproveita o resultado guardado no cache.
    */
    const chave = i + "," + j;
    if (memo.has(chave)) {
        return memo.get(chave);
    }

    let resultado;

    if (a[i] === b[j]) {
        /**
         *  Os caracteres são iguais: pela lógica da DP, esse caractere SEMPRE faz parte
         *  de toda LCS que passa por aqui. Então só é preciso seguir pela diagonal (i+1, j+1)
         * e colocar esse caractere na frente de cada sequência encontrada.
         */
        const doFundo = backtrack(a, b, dp, i + 1, j + 1, memo);
        resultado = new Set();
        for (const s of doFundo) {
            resultado.add(a[i] + s);
        }

    } else {

        /**
         *  Caracteres diferentes -> ponto onde backtracking decide os caminhos.
         * Comparação com os comprimentos guardados na tabela para saber quais vizinhos são ótimos.
         * 
        */ 
        resultado = new Set();

        // Caminho "avançar em a": só é válido se não perder o comprimento ótimo da célula atual.
        if (dp[i + 1][j] === dp[i][j]) {
            const doAbaixo = backtrack(a, b, dp, i + 1, j, memo);
            for (const s of doAbaixo) {
                resultado.add(s);
            }
        }

        // Caminho "avançar em b": só é válido se mantiver o comprimento ótimo.
        if (dp[i][j + 1] === dp[i][j]) {
            const doDireita = backtrack(a, b, dp, i, j + 1, memo);
            for (const s of doDireita) {
                resultado.add(s);
            }
        }

    }

    memo.set(chave, resultado);
    return resultado;
}

// -------------------------------------------------------------------------------------------------------------------------------------------
// Função principal - junta as duas etapas (DP + backtracking) e devolve todas as LCS,
// já filtrando a string vazia (usada só como caso base) e ordenando alfabeticamente.
// -------------------------------------------------------------------------------------------------------------------------------------------
function lcsDPBacktracking(a, b) {
    const dp = montarTabelaComprimentos(a, b);
    const memo = new Map();
    const todas = backtrack(a, b, dp, 0, 0, memo);

    return [...todas]
        .filter(s => s.length > 0)
        .sort();
}

// ---------------------------------------------------------------------------
// Função utilizada pela interface gráfica para processar os dados de entrada.
// ---------------------------------------------------------------------------
function validarEntradaLCSBacktracking(input) {
    const linhas = input.replace(/\r/g, "").split("\n").map(l => l.trim());

    if (linhas.length === 0 || linhas[0] === "") {
        throw new Error("A primeira linha deve conter a quantidade de casos D.");
    }

    if (!/^\d+$/.test(linhas[0])) {
        throw new Error("A primeira linha deve conter um numero inteiro positivo.");
    }

    const D = parseInt(linhas[0], 10);
    if (D < 1 || D > 10) {
        throw new Error("D deve estar entre 1 e 10.");
    }

    const linhasEsperadas = 1 + (2 * D);
    if (linhas.length !== linhasEsperadas) {
        throw new Error(`Entrada invalida: para D = ${D}, devem existir exatamente ${2 * D} linhas de strings.`);
    }

    const casos = [];
    for (let i = 1; i < linhas.length; i += 2) {
        const a = linhas[i];
        const b = linhas[i + 1];

        for (const seq of [a, b]) {
            if (seq.length < 1 || seq.length > 80) {
                throw new Error("Cada string deve ter entre 1 e 80 caracteres.");
            }
            if (!/^[a-z]+$/.test(seq)) {
                throw new Error("Cada string deve conter apenas letras minusculas de a a z.");
            }
        }

        casos.push([a, b]);
    }

    return casos;
}

function processarEntrada(input) {
    const casos = validarEntradaLCSBacktracking(input);
    const blocos = [];

    for (const [a, b] of casos) {
        const lcs = lcsDPBacktracking(a, b);
        blocos.push(lcs.join("\n"));
    }

    return blocos.join("\n\n");
}
