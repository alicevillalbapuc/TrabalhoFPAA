# Trabalho Prático – Fundamentos de Projeto e Análise de Algoritmos

## Descobrindo Padrões: A Jornada para Sincronizar Dados Complexos

**Disciplina:** Fundamentos de Projeto e Análise de Algoritmos  
**Curso:** Sistemas de Informação – PUC Minas Gerais – Campus Contagem  
**Professora:** Amália Vasconcelos

---

#  Integrantes

- Alice Machado Villalba Costa
- Gabriel Lucas Diniz Alves
- Ingrid Yara Alves dos Santos
- João Felipe da Silva Prado
- Otávio Soares da Costa
- Pedro Antônio Silva Neto
- Wanessa Cristina Ribeiro de Paula


---

# Introdução

Este trabalho tem como objetivo resolver o problema de encontrar todas as **Maiores Subsequências Comuns (Longest Common Subsequence - LCS)** entre duas sequências de caracteres.

Para a resolução do problema foram desenvolvidas duas versões do algoritmo, conforme solicitado no enunciado da disciplina:

- Solução utilizando apenas **Programação Dinâmica**;
- Solução utilizando **Programação Dinâmica** em conjunto com **Backtracking**.

---

# Problema

Dadas duas sequências de caracteres, o programa deve encontrar todas as maiores subsequências comuns entre elas, respeitando a ordem dos caracteres, eliminando duplicatas e apresentando os resultados em ordem alfabética.

A Programação Dinâmica é utilizada para calcular o comprimento da LCS, enquanto o Backtracking é responsável por reconstruir todas as subsequências máximas possíveis.

---

# Respostas

## 1. Como a programação dinâmica foi aplicada na solução?

> Resposta.

---

## 2. Por que o uso de backtracking é necessário neste problema?

> Resposta.

---

## 3. Houve desafios na implementação? Quais? Como foram superados?

> Resposta.

---

## 4. Qual é a complexidade da solução proposta?

Considere:

- **n** = tamanho da primeira sequência;
- **m** = tamanho da segunda sequência;
- **K** = quantidade de maiores subsequências comuns encontradas;
- **L** = comprimento da maior subsequência comum (LCS).

---

### Versão utilizando apenas Programação Dinâmica

Nesta implementação é criada uma matriz `dp` de dimensões `(n + 1) × (m + 1)`. Cada posição da matriz armazena duas informações:

- o comprimento da LCS;
- um conjunto (`Set`) contendo todas as maiores subsequências daquela posição.

#### Passo 1 – Criação da matriz

A matriz possui `(n + 1) × (m + 1)` posições.

**Complexidade de tempo:**

```text
O(n × m)
```

#### Passo 2 – Preenchimento da matriz

Cada posição da matriz é processada apenas uma vez.

Quando os caracteres são iguais, o algoritmo percorre todas as subsequências armazenadas na célula diagonal para adicionar o caractere correspondente.

Quando os caracteres são diferentes e os comprimentos são iguais, os conjuntos das células vizinhas são unidos, copiando todas as subsequências armazenadas.

Se:

- **K** representa o número de LCS distintas;
- **L** representa o comprimento de cada LCS;

o custo para manipular esses conjuntos é aproximadamente:

```text
O(K × L)
```

Como essa operação pode ocorrer em diversas posições da matriz, a complexidade total torna-se:

```text
O(n × m × K × L)
```

#### Complexidade de memória

Além da matriz, cada célula pode armazenar diversas subsequências.

Assim, a memória utilizada é aproximadamente:

```text
O(n × m × K × L)
```

---

### Versão utilizando Programação Dinâmica + Backtracking

Nesta solução, o problema é dividido em duas etapas.

#### Passo 1 – Construção da tabela de Programação Dinâmica

A matriz armazena apenas o comprimento da LCS em cada posição.

Cada célula é calculada apenas uma vez.

**Complexidade de tempo:**

```text
O(n × m)
```

#### Passo 2 – Backtracking

Após a construção da tabela, o algoritmo percorre apenas os caminhos que mantêm o comprimento ótimo da LCS.

Foi utilizada memoização (`Map`), evitando que uma mesma posição seja processada mais de uma vez.

Como cada uma das **K** subsequências possui comprimento **L**, o custo da reconstrução é:

```text
O(K × L)
```

#### Complexidade total

Somando as duas etapas, obtém-se:

```text
O(n × m + K × L)
```

#### Complexidade de memória

A memória utilizada é composta por:

- tabela de Programação Dinâmica:

```text
O(n × m)
```

- memoização e armazenamento das subsequências:

```text
O(K × L)
```

Portanto, a complexidade de memória é:

```text
O(n × m + K × L)
```

---

### Comparação entre as soluções

A implementação utilizando apenas Programação Dinâmica armazena todas as subsequências em cada posição da matriz, aumentando significativamente o consumo de memória e o tempo de execução devido às cópias e uniões dos conjuntos.

Já a implementação que combina Programação Dinâmica com Backtracking armazena apenas os comprimentos das subsequências na tabela. As sequências são reconstruídas somente ao final, utilizando Backtracking com memoização, tornando a solução mais eficiente tanto em tempo quanto em memória.

---

## 5. O que o grupo aprendeu ao resolver esse problema?

> Resposta.
