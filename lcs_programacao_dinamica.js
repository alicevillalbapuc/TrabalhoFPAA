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
function processarEntradaPD(input) {
    const linhas = input.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    let idx = 0;

    const D = parseInt(linhas[idx++], 10);
    const blocos = [];

    for (let d = 0; d < D; d++) {
        const a = linhas[idx++] ?? "";
        const b = linhas[idx++] ?? "";

        const lcs = lcsDP(a, b);
        blocos.push(lcs.join("\n"));
    }

    return blocos.join("\n\n");
}