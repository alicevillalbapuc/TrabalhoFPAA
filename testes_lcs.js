const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const contexto = {};
vm.createContext(contexto);

vm.runInContext(fs.readFileSync("lcs_programacao_dinamica.js", "utf8"), contexto);
vm.runInContext(fs.readFileSync("lcs_programacao_dp_backtracking.js", "utf8"), contexto);

const implementacoes = [
    {
        nome: "Programação dinâmica",
        lcs: contexto.lcsDP,
        processar: contexto.processarEntradaPD
    },
    {
        nome: "Programação dinâmica com backtracking",
        lcs: contexto.lcsDPBacktracking,
        processar: contexto.processarEntrada
    }
];

let numeroTeste = 1;

function formatarValor(valor) {
    if (Array.isArray(valor)) {
        return valor.length > 0 ? valor.join("\n") : "(sem LCS)";
    }

    return valor;
}

function imprimirCabecalhoTeste(tipo, descricao, entrada, esperado) {
    console.log(`\nTeste ${numeroTeste++}: ${descricao}`);
    console.log(`Tipo: ${tipo}`);
    console.log("Entrada:");
    console.log(entrada);
    console.log("Resultado esperado:");
    console.log(formatarValor(esperado));
}

function testarLCS(descricao, a, b, esperado) {
    imprimirCabecalhoTeste("calculo direto da LCS", descricao, `${a}\n${b}`, esperado);

    for (const impl of implementacoes) {
        assert.deepStrictEqual(
            [...impl.lcs(a, b)],
            esperado,
            `${impl.nome} falhou no teste: ${descricao}`
        );
        console.log(`OK - ${impl.nome}`);
    }
}

function testarProcessamento(descricao, entrada, esperado) {
    imprimirCabecalhoTeste("processamento de entrada completa", descricao, entrada, esperado);

    for (const impl of implementacoes) {
        assert.strictEqual(
            impl.processar(entrada),
            esperado,
            `${impl.nome} falhou no processamento: ${descricao}`
        );
        console.log(`OK - ${impl.nome}`);
    }
}

function testarErro(descricao, entrada) {
    imprimirCabecalhoTeste("validacao de erro", descricao, entrada, "entrada rejeitada");

    for (const impl of implementacoes) {
        assert.throws(
            () => impl.processar(entrada),
            `${impl.nome} deveria rejeitar a entrada: ${descricao}`
        );
        console.log(`OK - ${impl.nome} rejeitou a entrada`);
    }
}

// Caso do exemplo oficial do enunciado.
testarProcessamento(
    "exemplo oficial",
    "1\nijkijkii\nikjikji",
    "ijiji\nijiki\nijkji\nikiji\nikiki\nikjii\nikjki"
);

// Strings iguais.
testarLCS("strings iguais", "abc", "abc", ["abc"]);

// Strings sem letras em comum.
testarLCS("sem letras em comum", "abc", "def", []);

// LCS com uma única resposta.
testarLCS("uma única resposta", "abcde", "ace", ["ace"]);

// LCS com várias respostas distintas em ordem alfabética.
testarLCS("várias respostas", "abcbdab", "bdcaba", ["bcab", "bcba", "bdab"]);

// Letras repetidas, verificando se não há duplicação na saída.
testarLCS("letras repetidas", "aab", "aba", ["aa", "ab"]);

// Entrada com vários blocos e linha em branco entre os blocos de saída.
testarProcessamento(
    "vários blocos",
    "3\nabc\nabc\nab\na\naab\naba",
    "abc\n\na\n\naa\nab"
);

// Validação de entradas inválidas.
testarErro("letra maiúscula", "1\nAbc\nabc");
testarErro("string vazia", "1\n\nabc");
testarErro("tamanho maior que 80", `1\n${"a".repeat(81)}\na`);
testarErro(
    "D maior que 10",
    "11\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na\na"
);

console.log("\nTodos os testes automatizados foram executados com sucesso.");
