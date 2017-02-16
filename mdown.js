/** @auth Matheus Castiglioni
 *  Editor que faz uso do markdown
 */
const HTML_MDOWN = `
    <aside class="md-editor__toolbar">
        <ul class="md-editor__menu">
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertBold(this);" role="button" title="Negrito" type="button"><i class="icon-bold"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertItalic(this);" role="button" title="Itálico" type="button"><i class="icon-italic"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="showSubMenu(this);" role="button" title="Header" type="button"><i class="icon-header"></i></button>
                <ul class="md-editor__submenu">
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH1(this);" role="button" type="button"><h1>Header</h1></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH2(this);" role="button" type="button"><h2>Header</h2></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH3(this);" role="button" type="button"><h3>Header</h3></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH4(this);" role="button" type="button"><h4>Header</h4></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH5(this);" role="button" type="button"><h5>Header</h5></button></li>
                    <li class="md-editor__subitem"><button class="md-editor__action" onclick="insertH6(this);" role="button" type="button"><h6>Header</h6></button></li>
                </ul>
            </li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertLink(this);" role="button" title="Link" type="button"><i class="icon-link"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertList(this);" role="button" title="Lista" type="button"><i class="icon-list-bullet"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertListOrdered(this);" role="button" title="Lista Ordenada" type="button"><i class="icon-list-numbered"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertPicture(this);" role="button" title="Imagem" type="button"><i class="icon-picture"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertVideo(this);" role="button" title="Vídeo" type="button"><i class="icon-videocam"></i></button>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertCitation(this);" role="button" title="Citação'" type="button"><i class="icon-quote-left"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="insertCode(this);" role="button" title="Código" type="button"><i class="icon-code"></i></button>
        </ul>
        <ul class="md-editor__menu">
            <li class="md-editor__item"><button class="md-editor__action" onclick="expand(this);" role="button" title="Expandir" type="button"><i class="icon-resize-horizontal"></i></button></li>
            <li class="md-editor__item"><button class="md-editor__action" onclick="help(this);" role="button" title="Ajuda" type="button"><i class="icon-info"></i></button></li>
        </ul>
    </aside>
    <div class="md-editor__wrap">
        <textarea autofocus class="md-editor__data" onkeyup="processMarkDown(this, event);"></textarea>
        <output class="md-editor__output"></output>
    </div>
    <div class="md-editor__help">
        <div class="md-editor__info">
            <h2 class="md-editor__title">Formatação básica</h2>
            <p>**negrito**</p>
            <p>_itálico_</p>
            <p>**negrito e _itálico_**</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir títulos</h2>
            <p># H1</p>
            <p>## H2</p>
            <p>### H3</p>
            <p>#### H4</p>
            <p>##### H5</p>
            <p>###### H6</p>
        </div>
        <div class="md-editor__info">
            <h2 class="md-editor__title">Como inserir links</h2>
            <p>[Nome do link](http://www.globo.com)</p>
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
            <h2 class="md-editor__title">Como inserir códigos</h2>
            <h4>Sem formatação</h4>
            <p>\`\`\`</p>
            <p>// insira seu código aqui</p>
            <p>\`\`\`</p>
            <h4>Com formatação</h4>
            <p>\`\`\` language-xxxx</p>
            <p>// insira seu código aqui</p>
            <p>\`\`\`</p>
            <p><strong>Obs:</strong> Troque "xxxx" pelo nome da linguagem que você esta postando código.</p>
            <h4>Identação</h4>
            <p>Para identar os códigos utilize quatro espaços.</p>
        </div>
    </div>
`;
const REGEX_P = new RegExp('^(.+)$', 'gim');
const REGEX_STRONG = new RegExp('(([*]{2})([a-z\\s\\w\\d\\.\\-]+)([*]{2}))', 'gim');
const REGEX_EM = new RegExp('(([_])([\a-z\s\\d\\.\\-]+)([_]))', 'gim');
const REGEX_H1 = new RegExp('(([#]\\s)([^\\<]+))', 'gim');
const REGEX_H2 = new RegExp('(([#]{2}\\s)([^\\<]+))', 'gim');
const REGEX_H3 = new RegExp('(([#]{3}\\s)([^\\<]+))', 'gim');
const REGEX_H4 = new RegExp('(([#]{4}\\s)([^\\<]+))', 'gim');
const REGEX_H5 = new RegExp('(([#]{5}\\s)([^\\<]+))', 'gim');
const REGEX_H6 = new RegExp('(([#]{6}\\s)([^\\<]+))', 'gim');
const REGEX_A = new RegExp('(([\\[])(.+)([\\]])([(])(.+)([)]))', 'gim');
const REGEX_IMG = new RegExp('(([!])([\\[])(.+)([\\]])([(])(.+)([)]))', 'gim');
const REGEX_IFRAME = new RegExp('(([?])([\\[])(.+)([\\]])([(])(.+)([)]))', 'gim');
const REGEX_BLOCKQUOTE = new RegExp('(([\\>]\\s)([^\\<]+))', 'gim');
const REGEX_CODE = new RegExp('(([`]{3})([\\sA-Z\\-]*)([\\w\\W\\s\\S\\n\\r\\d\\D]+)([`]{3}))', 'gim');

const KEYCODE_TAB = 9;

/** @auth Matheus Castiglioni
 *  Processa cada digitação do editor
 */
function processMarkDown(editor, event) {
    insertOutput(editor, processMarkDownTags(editor.value));
}

/** @auth Matheus Castiglioni
 *  Processa cada tag markdown
 */
function processMarkDownTags(value) {
    let html = value;
    html = markDownP(html);
    html = markDownBlockquote(html);
    html = markDownStrong(html);
    html = markDownEM(html);
    html = markDownH6(html);
    html = markDownH5(html);
    html = markDownH4(html);
    html = markDownH3(html);
    html = markDownH2(html);
    html = markDownH1(html);
    html = markDownIMG(html);
    html = markDownIframe(html);
    html = markDownA(html);
    html = markDownCode(html);
    return html;
}

/** @auth Matheus Castiglioni
 *  Função para iniciar o markdown
 */
const editors = document.querySelectorAll('.md-editor')
if (editors.length > 0) {
    editors.forEach(editor => {
        editor.innerHTML = HTML_MDOWN;
    });
}

/** @auth Matheus Castiglioni
 *  Função para pegar a posição do cursor no textarea e inserir os markdowns
 */
const datas = document.querySelectorAll('.md-editor__data');
if (datas.length > 0) {
    datas.forEach(editor => {
        editor.addEventListener('blur', function() {
            getSelectionCursor(this);
        });
        editor.addEventListener('keydown', function(event) {
            getSelectionCursor(this);
            if (event.keyCode == KEYCODE_TAB) {
                event.preventDefault();
                event.stopPropagation();
                insertIdentation(editor);
            }
        });
    });
}

/** @auth Matheus Castiglioni
 *  Função para pegar o markdown do banco de dados e converte-lo para as tags HTML
 */
const bases = document.querySelectorAll('.md-editor__base')
if (bases.length > 0) {
    bases.forEach(base => {
        insertOutput(base, processMarkDownTags(base.textContent));        
    });
}

/** @auth Matheus Castiglioni
 *  Função para adicionar identação no textarea
 */
function insertIdentation(editor) {
    editor.value = editor.value.substring(0, EDITOR_CURSOR_POSITION_BEGIN) + '\t' + editor.value.substring(EDITOR_CURSOR_POSITION_END, editor.value.length);
    editor.setSelectionRange((EDITOR_CURSOR_POSITION_END + 1), (EDITOR_CURSOR_POSITION_END + 1));
}

/** @auth Matheus Castiglioni
 *  Função para pegar a posição do cursor no textarea
 */
function getSelectionCursor(editor) {
    EDITOR_CURSOR_POSITION_BEGIN = editor.selectionStart;
    EDITOR_CURSOR_POSITION_END = editor.selectionEnd;
}

/** @auth Matheus Castiglioni
 *  Pega o html gerado pelo markdown e insere no preview
 */
function insertOutput(element, html) {
    let output = element;
    if (element.nodeName === 'TEXTAREA')
        output = element.nextSibling.nextSibling;
    output.innerHTML = html;
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag P
 */
function markDownP(html) {
    return html.replace(REGEX_P, '<p>$1</p>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag STRONG
 */
function markDownStrong(html) {
    return html.replace(REGEX_STRONG, '<strong>$3</strong>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag EM
 */
function markDownEM(html) {
    return html.replace(REGEX_EM, '<em>$3</em>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H1
 */
function markDownH1(html) {
    return html.replace(REGEX_H1, '<h1>$3</h1>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H2
 */
function markDownH2(html) {
    return html.replace(REGEX_H2, '<h2>$3</h2>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H3
 */
function markDownH3(html) {
    return html.replace(REGEX_H3, '<h3>$3</h3>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H4
 */
function markDownH4(html) {
    return html.replace(REGEX_H4, '<h4>$3</h4>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H5
 */
function markDownH5(html) {
    return html.replace(REGEX_H5, '<h5>$3</h5>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag H6
 */
function markDownH6(html) {
    return html.replace(REGEX_H6, '<h6>$3</h6>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag A
 */
function markDownA(html) {
    return html.replace(REGEX_A, '<a href="$6">$3</a>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag IMG
 */
function markDownIMG(html) {
    return html.replace(REGEX_IMG, '<img alt="$4" src="$7">');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag IFRAME
 */
function markDownIframe(html) {
    return html.replace(REGEX_IFRAME, '<iframe src="$7">');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag BLOCKQUOTE
 */
function markDownBlockquote(html) {
    return html.replace(REGEX_BLOCKQUOTE, '<blockquote>$3</blockquote>');
}

/** @auth Matheus Castiglioni
 *  Processa o markdown da tag code inline
 */
function markDownCode(html) {
    return html.replace(REGEX_CODE, '<pre class="language-xxxx $3"><code class="language-xxxx $3">$4</code></pre>');
}

/** @auth Matheus Castiglioni
 *  Mostra o submenu com mais opção para o editor 
 */
function showSubMenu(button) {
    let subMenu = button.parentNode.querySelector('ul');
    if (subMenu != undefined)
        showHideElement(subMenu);
}

/** @auth Matheus Castiglioni
 *  Mostra e esconde determinado elemento 
 */
function showHideElement(element) {
    if (isHide(element))
        element.style.display = 'block';
    else
        element.style.display = 'none';
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
    let data = button.parentNode.parentNode.parentNode.parentNode.querySelector('textarea');
    let output = button.parentNode.parentNode.parentNode.parentNode.querySelector('output');
    if (data != undefined && output != undefined) {
        data.classList.toggle('is-full');
        output.classList.toggle('is-hide');
    }
}

/** @auth Matheus Castiglioni
 *  Mostra e esconde as dicas de formatação do mark down 
 */
function help(button) {
    let help = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__help');
    if (help != undefined)
        showHideElement(help);
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
    showHideElement(button.parentNode.parentNode);
}
function insertH2(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '## ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 3);  
    showHideElement(button.parentNode.parentNode);
}
function insertH3(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 4);  
    showHideElement(button.parentNode.parentNode);
}
function insertH4(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '#### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 5);  
    showHideElement(button.parentNode.parentNode);
}
function insertH5(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '##### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 6);  
    showHideElement(button.parentNode.parentNode);
}
function insertH6(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '###### ', null, EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 7);  
    showHideElement(button.parentNode.parentNode);
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
        insertMarkDown(editor, '```\ninsira seu código aqui\n', '```', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 26);
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