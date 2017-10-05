---
layout: page
title: Documentação
---

### Começe a usar o [{{ site.title }}](/)

Para transformar seus `textareas` em editores *markdown* devemos simplesmente adicionar a classe `.md-editor__init` no `textarea` que queremos transformar em editor *markdown*:

```markup
<textarea class="md-editor__init">...</textarea>
```

### Definindo o editor com autofocus

Caso tenha necessidade, podemos definir que assim que a página for carregada o editor recebera o focus para digitação, fazemos isso adicionando o `autofocus` no `textarea`:

```html
<textarea autofocus class="md-editor__init">...</textarea>
```

### Definindo um ID e Nome para o editor

Caso tenha necessidade de identificar o editor com um ID único na página, podemos adicionar o `id` no `textarea`, para que o valor dele seja submetido ao form devemos informar um `name para o `textarea`:

```markup
<textarea autofocus class="md-editor__init" id="editor" name="editor">...</textarea>
```

Com isso você já deve ser capaz de começar as marcações no editor, em caso de dúvidas visualize a [demo](/demo) do [{{ site.title }}](/).