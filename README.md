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

A Programação Dinâmica foi aplicada para resolver o problema da LCS (Longest Common Subsequence), que consiste em encontrar a maior subsequência comum entre duas strings. Nas duas versões do projeto, foi criada uma tabela/matriz de programação dinâmica para armazenar os resultados dos subproblema, e cada posição da matriz representa o tamanho da maior subsequência comum entre partes das duas strings analisadas.

A ideia foi comparar os caracteres das duas strings. Quando os caracteres são iguais, o valor da posição atual recebe o valor da diagonal anterior somado de 1. Quando os caracteres são diferentes, o algoritmo escolhe o maior valor entre a posição de cima e a posição da esquerda.

Com isso, a matriz evita que o programa precise recalcular várias vezes os mesmos subproblemas, tornando a solução mais eficiente do que uma abordagem apenas recursiva.

Na primeira versão, a Programação Dinâmica é usada principalmente para calcular o tamanho da LCS. Já na segunda versão, além de calcular esse tamanho, a tabela também serve como base para o processo de backtracking, que reconstrói as subsequências comuns encontradas.


---

## 2. Por que o uso de backtracking é necessário neste problema?

O backtracking é necessário porque a tabela de Programação Dinâmica, sozinha informa apenas o tamanho da maior subsequência comum, ela não mostra diretamente quais são as subsequências que formam a resposta.

Depois que a matriz de DP é preenchida, o algoritmo precisa percorrê-la de trás para frente para reconstruir as LCS, e esse processo é feito pelo backtracking.

Quando os caracteres das duas strings são iguais, esse caractere faz parte da subsequência e o algoritmo segue para a diagonal anterior da matriz. Quando os caracteres são diferentes, o algoritmo analisa os valores vizinhos da matriz e segue pelos caminhos que ainda podem gerar uma LCS válida.

O backtracking é especialmente importante porque podem existir várias LCS diferentes com o mesmo tamanho. Ele permite encontrar todas as subsequências comuns máximas distintas, e não só uma resposta possível.

---

## 3. Houve desafios na implementação? Quais? Como foram superados?

Durante a implementação e os testes, um dos principais desafios foi garantir que todas as subsequências comuns mais longas fossem encontradas sem repetição. Como algumas entradas possuem letras repetidas, a mesma LCS pode ser gerada por caminhos diferentes na tabela de programação dinâmica. Para superar isso, foi necessário comparar as saídas geradas pelas duas versões e utilizar estruturas que evitassem duplicidade, como conjuntos.

Outro desafio foi validar se as subsequências estavam realmente em ordem alfabética, conforme solicitado no enunciado. Para isso, foram criados casos de teste com múltiplas LCS possíveis, verificando se a saída final estava ordenada corretamente.

Também foi necessário testar casos variados, como strings iguais, strings com muitos caracteres repetidos, entradas com mais de um conjunto de dados e situações de validação, como quantidade de casos maior que o permitido ou uso de caracteres inválidos. Esses testes ajudaram a identificar erros de formatação, principalmente a exigência de imprimir uma linha em branco entre blocos de saída.

Por fim, os testes foram executados nas duas soluções: a versão usando apenas programação dinâmica e a versão combinando programação dinâmica com backtracking. A comparação entre as saídas permitiu confirmar que ambas retornavam as mesmas LCS distintas para os mesmos casos de entrada.

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

Com o desenvolvimento do trabalho, nós aprendemos na prática como a Programação Dinâmica pode ser aplicada para resolver problemas que possuem subproblemas sobrepostos e estrutura ótima, usando o problema da LCS.

Também foi possível entender melhor a diferença entre calcular apenas o valor ótimo e reconstruir as soluções que levam a esse valor. A matriz de Programação Dinâmica resolve a parte do tamanho da LCS, enquanto o backtracking é necessário para recuperar as subsequências propriamente ditas.

Além disso, o grupo aprendeu sobre a importância de organizar a entrada e a saída do programa, validar os dados recebidos, evitar respostas duplicadas e analisar a complexidade do algoritmo.

O trabalho também ajudou a reforçar conceitos importantes vistos na disciplina, como recursão, programação dinâmica, backtracking, comparação entre strings e recuperação de soluções a partir de uma tabela.
