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
 * Arquivo 1 - Solução usando somente programação dinâmica
 *
 * A ideia aqui é encontrar todas as maiores subsequências comuns (LCS) entre duas strings usando apenas uma tabela DP, sem usar backtracking.
 *
 * Em vez de guardar só o comprimento em cada célula da tabela, guardamos também todas as subsequências que têm esse comprimento. 
 * Assim, quando a tabela termina de ser preenchida, a resposta já está pronta em dp[0][0].
 * -------------------------------------------------------------------------------------------------------------------------------------------
 */

// -------------------------------------------------------------------------------------------------------------------------------------------
// Função principal - monta a tabela DP e retorna todas as LCS
//
// A tabela é preenchida de trás pra frente (do fim das strings pro começo).
// Cada célula dp[i][j] representa: "qual é a melhor LCS se eu começar a comparar a partir da posição i em 'a' e j em 'b'?"
// -------------------------------------------------------------------------------------------------------------------------------------------
function lcsDP(a, b) {
    const n = a.length;
    const m = b.length;

    // Cria a tabela com (n+1) linhas e (m+1) colunas.
    // A linha/coluna extra serve como "borda" com valor 0 (caso base).
    // Cada célula começa com comprimento 0 e uma sequência vazia.
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: m + 1 }, () => ({
            len: 0,
            seqs: new Set([""])
        }))
    );

    // Preenche a tabela de baixo pra cima e da direita pra esquerda
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {

            if (a[i] === b[j]) {
                // Os caracteres nas posições i e j são iguais. Então esse caractere entra na LCS. 
                // Pega todas as subsequências da célula diagonal (i+1, j+1) e coloca esse caractere na frente de cada uma.
                const novas = new Set();
                for (const s of dp[i + 1][j + 1].seqs) {
                    novas.add(a[i] + s);
                }
                dp[i][j] = {
                    len: dp[i + 1][j + 1].len + 1,
                    seqs: novas
                };

            } else {
                // Os caracteres são diferentes, então é preciso escolher: avançar em 'a' (olha a célula de baixo) ou avançar em 'b' 
                // (olha a célula da direita) - e ficamos com o melhor.
                const abaixo  = dp[i + 1][j];
                const direita = dp[i][j + 1];

                if (abaixo.len > direita.len) {
                    // Avançar em 'a' dá um resultado maior
                    dp[i][j] = { len: abaixo.len, seqs: new Set(abaixo.seqs) };
                } else if (direita.len > abaixo.len) {
                    // Avançar em 'b' dá um resultado maior
                    dp[i][j] = { len: direita.len, seqs: new Set(direita.seqs) };
                } else {
                    // Os dois caminhos dão o mesmo comprimento, então junta as subsequências dos dois lados.
                    dp[i][j] = {
                        len: abaixo.len,
                        seqs: new Set([...abaixo.seqs, ...direita.seqs])
                    };
                }
            }
        }
    }

    // dp[0][0] tem a resposta completa - filtramos a string vazia que foi usada como valor inicial e ordenamos alfabeticamente.
    return [...dp[0][0].seqs]
        .filter(s => s.length > 0)
        .sort();
}

// ---------------------------------------------------------------------------
// Função utilizada pela interface gráfica para processar os dados de entrada.
// ---------------------------------------------------------------------------
function validarEntradaLCSPD(input) {
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

function processarEntradaPD(input) {
    const casos = validarEntradaLCSPD(input);
    const blocos = [];

    for (const [a, b] of casos) {
        const lcs = lcsDP(a, b);
        blocos.push(lcs.join("\n"));
    }

    return blocos.join("\n\n");
}
