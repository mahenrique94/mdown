/** @auth Matheus Castiglioni
 *  Editor que faz uso do markdown
 */
const REGEX_P = new RegExp('^(.+)$', 'gim');
const REGEX_STRONG = new RegExp('(([*]{2})(.+)([*]{2}))', 'gim');
const REGEX_EM = new RegExp('(([_])(.+)([_]))', 'gim');
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

/** @auth Matheus Castiglioni
 *  Processa cada tag markdown
 */
function processMarkDown(editor) {
    let html = editor.value;
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
    insertOutput(editor, html);
}

/** @auth Matheus Castiglioni
 *  Função para pegar a posição do cursor no textarea e inserir os markdowns
 */
document.querySelectorAll('.md-editor__data').forEach(editor => {
    editor.addEventListener('blur', function() {
        EDITOR_CURSOR_POSITION_BEGIN = this.selectionStart;
        EDITOR_CURSOR_POSITION_END = this.selectionEnd;
    });
});

/** @auth Matheus Castiglioni
 *  Pega o html gerado pelo markdown e insere no preview
 */
function insertOutput(editor, html) {
    let output = editor.nextSibling.nextSibling;
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
        insertMarkDown(editor, '[link]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 1);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a imagem
 */
function insertPicture(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '![image]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 1);
}

/** @auth Matheus Castiglioni
 *  Inserir marcação referente a imagem
 */
function insertVideo(button) {
    const editor = button.parentNode.parentNode.parentNode.parentNode.querySelector('.md-editor__data');
    if (editor)
        insertMarkDown(editor, '?[video]', '(url)', EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END, 1);
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