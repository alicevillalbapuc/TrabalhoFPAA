# Checklist de Testes

Este arquivo documenta os testes da Pessoa 5. O objetivo e validar se as duas solucoes do projeto geram as mesmas respostas:

- `lcs_programacao_dinamica.js` - Programacao dinamica pura
- `lcs_programacao_dp_backtracking.js` - Programacao dinamica + backtracking

Para executar:

```bash
node testes_lcs.js
```

Ao rodar, o terminal mostra cada caso testado, a entrada, o resultado esperado e a confirmacao das duas implementacoes.

## Regras validadas

- Imprimir todas as LCS distintas.
- Ordenar as LCS em ordem alfabetica.
- Nao repetir respostas.
- Separar blocos de saida com uma linha em branco.
- Aceitar no maximo `D <= 10` casos.
- Aceitar apenas strings com 1 a 80 letras minusculas de `a` a `z`.
- Rejeitar letra maiuscula, string vazia, tamanho maior que 80 e `D` maior que 10.

## Casos de teste

### 1. Caso do exemplo oficial

Objetivo: confirmar se a saida bate com o exemplo do enunciado e se as varias LCS aparecem ordenadas.

Entrada:

```text
1
ijkijkii
ikjikji
```

Saida esperada:

```text
ijiji
ijiki
ijkji
ikiji
ikiki
ikjii
ikjki
```

### 2. Strings iguais

Objetivo: quando as duas strings sao iguais, a propria string deve ser a unica LCS.

Entrada:

```text
abc
abc
```

Saida esperada:

```text
abc
```

### 3. Strings sem letras em comum

Objetivo: confirmar que o algoritmo nao inventa resposta quando nao existe subsequencia comum nao vazia.

Entrada:

```text
abc
def
```

Saida esperada:

```text
(sem LCS)
```

### 4. LCS com uma unica resposta

Objetivo: validar um caso simples em que existe apenas uma maior subsequencia comum.

Entrada:

```text
abcde
ace
```

Saida esperada:

```text
ace
```

### 5. LCS com varias respostas

Objetivo: validar multiplas LCS distintas e a ordenacao alfabetica.

Entrada:

```text
abcbdab
bdcaba
```

Saida esperada:

```text
bcab
bcba
bdab
```

### 6. Letras repetidas

Objetivo: garantir que letras repetidas nao gerem respostas duplicadas.

Entrada:

```text
aab
aba
```

Saida esperada:

```text
aa
ab
```

### 7. Entrada com varios blocos

Objetivo: validar o formato completo da entrada com `D = 3` e a linha em branco entre blocos de saida.

Entrada:

```text
3
abc
abc
ab
a
aab
aba
```

Saida esperada:

```text
abc

a

aa
ab
```

### 8. Validacao de erro: letra maiuscula

Objetivo: rejeitar strings fora do padrao `a-z`.

Entrada:

```text
1
Abc
abc
```

Resultado esperado:

```text
entrada rejeitada
```

### 9. Validacao de erro: string vazia

Objetivo: rejeitar string com menos de 1 caractere.

Entrada:

```text
1

abc
```

Resultado esperado:

```text
entrada rejeitada
```

### 10. Validacao de erro: tamanho maior que 80

Objetivo: rejeitar string com mais de 80 caracteres.

Entrada usada no teste:

```text
1
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
a
```

Resultado esperado:

```text
entrada rejeitada
```

### 11. Validacao de erro: D maior que 10

Objetivo: rejeitar entrada com mais casos do que o limite permitido pelo enunciado.

Entrada: `D = 11`, com 22 linhas de strings.

Resultado esperado:

```text
entrada rejeitada
```
