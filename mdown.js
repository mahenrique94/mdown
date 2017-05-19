/** @auth Matheus Castiglioni
 *  Editor que faz uso do markdown
 */
function build(textarea) {
    const html = `
    <aside class="md-editor__toolbar">
        <ul class="md-editor__menu">
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertBold(this);" role="button" title="Negrito" type="button"><i class="icon-bold"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertItalic(this);" role="button" title="Italico" type="button"><i class="icon-italic"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="showSubMenu(this);" role="button" title="Header" type="button"><i class="icon-header"></i></button>
                <ul class="md-editor__submenu">
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH1(this);" role="button" title="Header 1" type="button"><h1>Header</h1></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH2(this);" role="button" title="Header 2" type="button"><h2>Header</h2></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH3(this);" role="button" title="Header 3" type="button"><h3>Header</h3></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH4(this);" role="button" title="Header 4" type="button"><h4>Header</h4></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH5(this);" role="button" title="Header 5" type="button"><h5>Header</h5></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH6(this);" role="button" title="Header 6" type="button"><h6>Header</h6></button></li>
                </ul>
            </li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertLink(this);" role="button" title="Link" type="button"><i class="icon-link"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertListOrdered(this);" role="button" title="Lista Ordenada" type="button"><i class="icon-list-numbered"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertPicture(this);" role="button" title="Imagem" type="button"><i class="icon-picture"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertVideo(this);" role="button" title="Video" type="button"><i class="icon-videocam"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertCitation(this);" role="button" title="Citacao'" type="button"><i class="icon-quote-left"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertCode(this);" role="button" title="Codigo" type="button"><i class="icon-code"></i></button>
        </ul>
        <ul class="md-editor__menu">
            <li class="md-editor__item"><button class="md-editor__action" onclick="expand(this);" role="button" title="Expandir" type="button"><i class="icon-resize-horizontal"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="help(this);" role="button" title="Ajuda" type="button"><i class="icon-info"></i></button></li>
        </ul>
    </aside>
    <div class="md-editor__wrap">
        <textarea ${textarea.autofocus == true ? 'autofocus' : ''} class="md-editor__data" data-upper="false" id="${textarea.id}" name="${textarea.name}" onblur="getSelectionCursor(this);" onkeydown="processKey(event);" onkeyup="processMarkDown(this, event);">${textarea.value}</textarea>
        <output class="md-editor__output"></output>
    </div>
    <div class="md-editor__help">
        <div class="md-editor__info">
            <h2 class="md-editor__title">Formatacao basica</h2>
            <p>**negrito**</p>
            <p>__itálico__</p>
            <p>**negrito e __itálico__**</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir titulos</h2>
            <p># H1</p>
            <p>## H2</p>
            <p>### H3</p>
            <p>#### H4</p>
            <p>##### H5</p>
            <p>###### H6</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir links</h2>
            <p>[Nome do link](http://www.exemplo.com.br)</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir listas</h2>
            <h4>Normal</h4>
            <p>- Item 1</p>
            <p>- Item 2</p>
            <p>- Item 3</p>
            <h4>Ordenada</h4>
            <p>1. Item 1</p>
            <p>2. Item 2</p>
            <p>3. Item 3</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir imagens</h2>
            <p>![Nome da imagem](URL)</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir videos</h2>
            <p>?[Nome do vídeo](URL)</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir uma citação</h2>
            <p>> Digite aqui a citação</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir codigos</h2>
            <h4>Sem formatacao</h4>
            <p>[code]</p>
            <p>// insira seu codigo aqui</p>
            <p>[/code]</p>
            <h4>Com formatação</h4>
            <p>[code-language]</p>
            <p>// insira seu código aqui</p>
            <p>[/code]</p>
            <p><strong>Obs:</strong> Troque "language" pelo nome da linguagem que você esta postando o código.</p>
        </div>
    </div>`;
    const editor = constroy();
    editor.innerHTML = html;
    textarea.parentNode.insertBefore(editor, textarea);
    textarea.remove();
};

const SPLIT_SPACE = " ";
const SPLIT_QUEBRA_LINHA = "\n";

let EDITOR_CURSOR_POSITION_BEGIN;
let EDITOR_CURSOR_POSITION_END;

const REGEXP_P = new RegExp("^(.+)$", "gim");
const REGEXP_BR = new RegExp("^([\\s]{0})$", "gim");
const REGEXP_STRONG = new RegExp("(([*]{2})([0-9a-z]))", "gim");
const REGEXP_STRONG_CLOSE = new RegExp("(([0-9a-z])([*]{2}))", "gim");
const REGEXP_EM = new RegExp("^(([_]{2})([0-9a-z]))", "gim");
const REGEXP_EM_CLOSE = new RegExp("(([0-9a-z])([_]{2}))", "gim");
const REGEXP_H1 = new RegExp("^(([#])([\\s]*)(.+))", "gim");
const REGEXP_H2 = new RegExp("^(([#]{2})([\\s]*)(.+))", "gim");
const REGEXP_H3 = new RegExp("^(([#]{3})([\\s]*)(.+))", "gim");
const REGEXP_H4 = new RegExp("^(([#]{4})([\\s]*)(.+))", "gim");
const REGEXP_H5 = new RegExp("^(([#]{5})([\\s]*)(.+))", "gim");
const REGEXP_H6 = new RegExp("^(([#]{6})([\\s]*)(.+))", "gim");
const REGEXP_A = new RegExp("(([\\[])(.+)([\\]])([\\(])(.+)([\\)]))", "gim");
const REGEXP_IMG = new RegExp("(([\\!])([\\[])(.+)([\\]])([\\(])(.+)([\\)]))", "gim");
const REGEXP_VIDEO = new RegExp("(([\\?])([\\[])(.+)([\\]])([\\(])(.+)([\\)]))", "gim");
const REGEXP_BLOCKQUOTE = new RegExp("^(([>])([\\s]*)(.+))", "gim");
const REGEXP_CODE = new RegExp("^(([\\[])([c][o][d][e])([\\]]))$", "gim");
const REGEXP_CODE_LANGUAGE = new RegExp("^(([\\[])([c][o][d][e])([\\-])([a-z]+)([\\]]))$", "gim");
const REGEXP_CODE_CLOSE = new RegExp("^(([\\[])([\\/])([c][o][d][e])([\\]]))$", "gim");
const REGEXP_CODE_INLINE = new RegExp("(([\\`]{3})([0-9a-z]))", "gim");
const REGEXP_CODE_INLINE_CLOSE = new RegExp("(([0-9a-z])([\\`]{3}))", "gim");
const REGEXP_TAB = new RegExp('([\\t])', 'gim');
const REGEXP_UL = new RegExp("^(([\\-])([\\s]*)(.+))", "gim");

const REGEXP_TAG_P = new RegExp("(([<])([p])([>]))", "gim");
const REGEXP_TAG_STRONG = new RegExp("(([<])([s][t][r][o][n][g])([>]))", "gim");
const REGEXP_TAG_EM = new RegExp("(([<])([e][m])([>]))", "gim");
const REGEXP_TAG_H1 = new RegExp("(([<])([h][1])([>]))", "gim");
const REGEXP_TAG_H2 = new RegExp("(([<])([h][2])([>]))", "gim");
const REGEXP_TAG_H3 = new RegExp("(([<])([h][3])([>]))", "gim");
const REGEXP_TAG_H4 = new RegExp("(([<])([h][4])([>]))", "gim");
const REGEXP_TAG_H5 = new RegExp("(([<])([h][5])([>]))", "gim");
const REGEXP_TAG_H6 = new RegExp("(([<])([h][6])([>]))", "gim");
const REGEXP_TAG_A = new RegExp("(([<])([a])([\\s])([h][r][e][f]))", "gim");
const REGEXP_TAG_IMG = new RegExp("(([<])([i][m][g])([\\s])([a][l][t]))", "gim");
const REGEXP_TAG_VIDEO = new RegExp("(([<])([i][f][r][a][m][e])([\\s])([s][r][c]))", "gim");
const REGEXP_TAG_BLOCKQUOTE = new RegExp("(([<])([b][l][o][c][k][q][u][o][t][e])([>]))", "gim");
const REGEXP_TAG_UL = new RegExp("(([<])([u][l])([>]))", "gim");
const REGEXP_TAG_LI = new RegExp("(([<])([l][i])([>]))", "gim");

const KEYCODE_TAB = 9;

/** @auth Matheus Castiglioni
 *  Criar a DIV que engloba todos os elementos do editor
 */
function constroy() {
    const editor = document.createElement("DIV");
    editor.classList.add("md-editor");
    return editor;
}

/** @auth Matheus Castiglioni
 *  Escutar cada digitação do editor
 */
function processMarkDown(editor, event) {
    insertOutPut(editor, compile(editor.value));
    Prism.highlightAll();
    scrollOutPut(editor);
}

/** @auth Matheus Castiglioni
 *  Pegar o HTML gerado pelo MarkDown e inserir no preview do editor
 */
const insertOutPut = (editor, html) => editor.nextElementSibling.innerHTML = html;

/** @auth Matheus Castiglioni
 *  Rolar automáticamente o preview de acordo com o seu crescimento
 */
const scrollOutPut = editor => editor.nextElementSibling.scrollTop = editor.nextElementSibling.clientHeight;

/** @auth Matheus Castiglioni
 *  Compiltar o MarkDown e gerar um HTML
 */
function compile(value) {
    let html = "";
    value = markDownUl(value);
    const lines = replaceMarkDown(value.split(SPLIT_QUEBRA_LINHA));
    for (let line of lines) {
        html += line;
    }
    return html;
}

/** @auth Matheus Castiglioni
 *  Verificando linha á linha por marcações MarkDown e trocar para seu respectivo HTML
 */
function replaceMarkDown(lines) {
    for (let i = 0; i < lines.length; i++) {
        lines[i] = markDownH6(lines[i]);
        lines[i] = markDownH5(lines[i]);
        lines[i] = markDownH4(lines[i]);
        lines[i] = markDownH3(lines[i]);
        lines[i] = markDownH2(lines[i]);
        lines[i] = markDownH1(lines[i]);
        lines[i] = markDownStrong(lines[i]);
        lines[i] = markDownStrongClose(lines[i]);
        lines[i] = markDownEm(lines[i]);
        lines[i] = markDownEmClose(lines[i]);
        lines[i] = markDownImg(lines[i]);
        lines[i] = markDownVideo(lines[i]);
        lines[i] = markDownA(lines[i]);
        lines[i] = markDownBloquote(lines[i]);
        lines[i] = markDownCodeLanguage(lines[i]);
        lines[i] = markDownCode(lines[i]);
        lines[i] = markDownCodeClose(lines[i]);
        lines[i] = markDownCodeInline(lines[i]);
        lines[i] = markDownCodeInlineClose(lines[i]);
        lines[i] = markDownP(lines[i]);
        lines[i] = markDownBr(lines[i]);
        lines[i] = markDownTab(lines[i]);
        lines[i] = insertClass(lines[i]);
    }
    return lines;
}

/** @auth Matheus Castiglioni
 *  Inserir Paragráfos
 */
function markDownP(line) {
    if (!line.startsWith("<h") && !line.startsWith("<img") && !line.startsWith("<iframe") && !line.startsWith("<blockquote") && !line.startsWith("<pre") && !line.startsWith("</code") && !line.startsWith("<ul") && !line.startsWith("<ol") && !line.startsWith("<li"))
        return line.replace(REGEXP_P, "<p>$1</p>");
    return line;
}

/** @auth Matheus Castiglioni
 *  Inserir quebras de linha
 */
const markDownBr = line => line.replace(REGEXP_BR, "<br/>");

/** @auth Matheus Castiglioni
 *  Inserir Negritos
 */
function markDownStrong(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_STRONG, "<strong>$3");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Fechar Negritos
 */
function markDownStrongClose(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_STRONG_CLOSE, "$2</strong>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir Itálicos
 */
function markDownEm(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_EM, "<em>$3");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Fechar Itálicos
 */
function markDownEmClose(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_EM_CLOSE, "$2</em>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir os Títulos de H1 á H6
 */
const markDownH1 = line => line.replace(REGEXP_H1, "<h1>$4</h1>");
const markDownH2 = line => line.replace(REGEXP_H2, "<h2>$4</h2>");
const markDownH3 = line => line.replace(REGEXP_H3, "<h3>$4</h3>");
const markDownH4 = line => line.replace(REGEXP_H4, "<h4>$4</h4>");
const markDownH5 = line => line.replace(REGEXP_H5, "<h5>$4</h5>");
const markDownH6 = line => line.replace(REGEXP_H6, "<h6>$4</h6>");

/** @auth Matheus Castiglioni
 *  Inserir lista desordenada
 */
function markDownUl(value) {
    value = value.replace(REGEXP_UL, "<li>$4</li>");
    return value;
}

/** @auth Matheus Castiglioni
 *  Inserir lista ordenada
 */
const markDownOl = line => line.replace(REGEXP_OL, "<ol>$4</ol>");

/** @auth Matheus Castiglioni
 *  Inserir Link
 */
function markDownA(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_A, "<a href=\"$6\" title=\"$3\" target='_blank'>$3</a>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir Imagem
 */
function markDownImg(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_IMG, "<img alt=\"$4\" src=\"$7\">");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir Vídeo
 */
function markDownVideo(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_VIDEO, "<iframe src=\"$7\"></iframe>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir os Citação
 */
const markDownBloquote = line => line.replace(REGEXP_BLOCKQUOTE, "<blockquote>$4</blockquote>");

/** @auth Matheus Castiglioni
 *  Inserir blocos de código sem formatação
 */
function markDownCode(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_CODE, "<pre class=\"language-xxxx\"><code class=\"language-xxxx\">");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir blocos de código com formatação
 */
function markDownCodeLanguage(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_CODE_LANGUAGE, "<pre class=\"language-$5\"><code class=\"language-$5\">");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Fechar blocos de código
 */
function markDownCodeClose(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_CODE_CLOSE, "</code></pre>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir blocos de código com formatação
 */
function markDownCodeInline(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_CODE_INLINE, "<code class=\"language-xxxx\">$3");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir blocos de código com formatação
 */
function markDownCodeInlineClose(line) {
    const words = line.split(SPLIT_SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].replace(REGEXP_CODE_INLINE_CLOSE, "$2</code>");
    }
    return words.join(" ");
}

/** @auth Matheus Castiglioni
 *  Inserir os identação
 */
const markDownTab = line => line.replace(REGEXP_TAB, "&nbsp;&nbsp;&nbsp;&nbsp;");

/** @auth Matheus Castiglioni
 *  Inserindo as classes do editor em todas as tags do HTML
 */
function insertClass(line) {
    line = line.replace(REGEXP_TAG_P, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_STRONG, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_EM, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H1, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H2, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H3, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H4, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H5, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_H6, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_A, "<$3 class=\"md-editor__$3\" $5");
    line = line.replace(REGEXP_TAG_IMG, "<$3 class=\"md-editor__$3\" $5");
    line = line.replace(REGEXP_TAG_VIDEO, "<$3 class=\"md-editor__$3\" $5");
    line = line.replace(REGEXP_TAG_BLOCKQUOTE, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_UL, "<$3 class=\"md-editor__$3\">");
    line = line.replace(REGEXP_TAG_LI, "<$3 class=\"md-editor__$3\">");
    return line;
}

/** @auth Matheus Castiglioni
 *  Processando uma tecla digitada no editor
 */
function processKey(event) {
    if (event.key.toLowerCase() === "tab") {
        event.preventDefault();
        getSelectionCursor(event.target);
        insertTab(event.target);
    }
}

/** @auth Matheus Castiglioni
 *  Pegando a posição do cursor no editor
 */
function getSelectionCursor(editor) {
    EDITOR_CURSOR_POSITION_BEGIN = editor.selectionStart;
    EDITOR_CURSOR_POSITION_END = editor.selectionEnd;
}

/** @auth Matheus Castiglioni
 *  Inserindo identação
 */
function insertTab(editor) {
    editor.value = editor.value.substring(0, EDITOR_CURSOR_POSITION_BEGIN) + "\t" + editor.value.substring(EDITOR_CURSOR_POSITION_END, editor.value.length);
    editor.setSelectionRange((EDITOR_CURSOR_POSITION_END + 1), (EDITOR_CURSOR_POSITION_END + 1));
}

/** @auth Matheus Castiglioni
 *  Procura todos os editores da página e insere o editor de MarkDown
 */
const editors = document.querySelectorAll(".md-editor__init");
editors.forEach(editor => build(editor));

/** @auth Matheus Castiglioni
 *  Procura todos os elementos que possuem o texto MarkDown e compila para o HTML
 */
const bases = document.querySelectorAll(".md-editor__base");
bases.forEach(base => base.innerHTML = compile(base.textContent));

/** @auth Matheus Castiglioni
 *  Inicializa os textos areas
 */
const datas = document.querySelectorAll(".md-editor__data");
datas.forEach(data => processMarkDown(data, event));

/** @auth Matheus Castiglioni
 *  Mostra o submenu com mais opção para o editor
 */
function showSubMenu(button) {
    const subMenu = button.parentNode.querySelector('ul');
    if (subMenu)
        toggleElement(subMenu);
}

/** @auth Matheus Castiglioni
 *  Mostra e esconde determinado elemento
 */
function toggleElement(element) {
    if (isHide(element))
        element.style.display = 'block';
    else
        element.style.display = 'none';
}

/** @auth Matheus Castiglioni
 *  Mostra o submenu com mais opção para o editor 
 */
function showSubMenu(button) {
    const subMenu = button.parentNode.querySelector('ul');
    if (subMenu)
        toggleElement(subMenu);
}

/** @auth Matheus Castiglioni
 *  Verifica se um elemento esta escondido ou visível
 */
function isHide(element) {
    return element.style.display == undefined || element.style.display == '' || element.style.display == 'none';
}

/** @auth Matheus Castiglioni
 *  Mostra e esconde o preview da digitação
 */
function expand(button) {
    const data = button.parentNode.parentNode.parentNode.parentNode.querySelector('textarea');
    const output = button.parentNode.parentNode.parentNode.parentNode.querySelector('output');
    if (data && output) {
        data.classList.toggle('is-full');
        output.classList.toggle('is-hide');
    }
}

/** @auth Matheus Castiglioni
 *  Mostra e esconde as dicas de formatação do mark down
 */
function help(button) {
    const help = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__help');
    if (help)
        toggleElement(help);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente ao negrito
 */
function insertBold(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '**', '**', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 2);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente ao itálico
 */
function insertItalic(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '_', '_', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 1);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente aos cabeçalhos
 */
function insertH1(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '# ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 2);
    toggleElement(button.parentNode.parentNode);
}
function insertH2(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '## ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 3);
    toggleElement(button.parentNode.parentNode);
}
function insertH3(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 4);
    toggleElement(button.parentNode.parentNode);
}
function insertH4(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '#### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 5);
    toggleElement(button.parentNode.parentNode);
}
function insertH5(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '##### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 6);
    toggleElement(button.parentNode.parentNode);
}
function insertH6(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '###### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 7);
    toggleElement(button.parentNode.parentNode);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente ao link
 */
function insertLink(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '[link]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 5);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a imagem
 */
function insertPicture(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '![image]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 7);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a imagem
 */
function insertVideo(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '?[video]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 7);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a citação
 */
function insertCitation(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '> ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 3);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a lista normal
 */
function insertList(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '- ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 3);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a lista ordenada
 */
function insertListOrdered(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '1. ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 3);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a lista ordenada
 */
function insertCode(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '[code]\n// insira seu código aqui\n', '[/code]', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 32);
}

/** @auth Matheus Castiglioni
 *  Inserir as tags markdowns onde o cursor esta posicionado no editor
 */
function insertMarkDown(editor, markdownBegin, markdownEnd, positionBegin, positionEnd, currentPosition) {
    if (hasTextSelected(positionBegin, positionEnd)) {
        editor.value = editor.value.substring(0, positionBegin) + markdownBegin + editor.value.substring(positionBegin, positionEnd) + (markdownEnd != null ? markdownEnd : '') + editor.value.substring(positionEnd, editor.value.length)
        editor.focus();
        editor.setSelectionRange(EDITOR_CURSOR_POSITION_END + currentPosition, EDITOR_CURSOR_POSITION_END + currentPosition);
        processMarkDown(editor);
    } else {
        editor.value = editor.value.substring(0, positionBegin) + markdownBegin + (markdownEnd != null ? markdownEnd : '') + editor.value.substring(EDITOR_CURSOR_POSITION_BEGIN, editor.value.length);
        editor.focus();
        editor.setSelectionRange((EDITOR_CURSOR_POSITION_BEGIN + currentPosition), (EDITOR_CURSOR_POSITION_BEGIN + currentPosition));
        processMarkDown(editor);
    }
}

/** @auth Matheus Castiglioni
 *  Verificando se tem algum texto selecionado para adicionar os markdowns ou é para adicionar um markdown sem conteudo
 */
function hasTextSelected(begin , end) {
    return begin != end;
}

/** @auth Matheus Castiglioni
 *  Cria a div que ira englobar todos os componentes do editor
 */
function buildWrap() {
    const wrap = document.createElement('DIV');
    wrap.classList.add('md-editor');
    return wrap;
}