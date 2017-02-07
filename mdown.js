/** @auth Matheus Castiglioni
 *  Expressões regulares para realizar o mark down 
 */
var EDITOR_CURSOR_POSITION_BEGIN, EDITOR_CURSOR_POSITION_END;

const INDEX_BEGIN_END = 3;
const INDEX_CONTENT = 2;
const INDEX_MARKDOWN = 0;
const INDEX_REGEX = 0;
const INDEX_TAG = 1;

                 // [EXPRESSAO_REGULAR, TAG_PARA_SER_ADICIONADO, INDICE_DO_GRUPO_QUE_VAI_DENTRO_DA_TAG, INFORMAR ^ e $ ?]
const REGEXP_P = [new RegExp('^(.+)$', 'gim'), 'p', 0, true]; // <p></p>
const REGEXP_H1 = [new RegExp('^(([#])(.*))$', 'gim'), 'h1', 3, false]; //<h1></h1>
const REGEXP_H2 = [new RegExp('^(([#]{2})(.*))$', 'gim'), 'h2', 3, false]; //<h2></h2>
const REGEXP_H3 = [new RegExp('^(([#]{3})(.*))$', 'gim'), 'h3', 3, false]; //<h3></h3>
const REGEXP_H4 = [new RegExp('^(([#]{4})(.*))$', 'gim'), 'h4', 3, false]; //<h4></h4>
const REGEXP_H5 = [new RegExp('^(([#]{5})(.*))$', 'gim'), 'h5', 3, false]; //<h5></h5>
const REGEXP_H6 = [new RegExp('^(([#]{6})(.*))$', 'gim'), 'h6', 3, false]; //<h6></h6>
const REGEXP_STRONG = [new RegExp('(([*]{2})(.*)([*]{2}))', 'gim'), 'strong', 3, false]; //<strong></strong>
const REGEXP_I = [new RegExp('(([_])(.*)([_]))', 'gim'), 'em', 3, false]; //<em></em>
const REGEXP_A = [new RegExp('((([\\[])(.*)([\\]])(([(])(.*)([)]))))', 'gim'), ['a', 'href'], [4, 8], false]; // <a></a>
const REGEXP_IMG = [new RegExp('(([!])(([\\[])(.*)([\\]])(([(])(.*)([)]))))', 'gim'), ['img', 'src', 'alt'], [5, 9, 5], false]; // <img></img>
const REGEXP_VIDEO = [new RegExp('(([?])(([\\[])(.*)([\\]])(([(])(.*)([)]))))', 'gim'), ['iframe', 'src'], [5, 9], false]; // <iframe></iframe>
const REGEXP_BLOCKQUOTE = [new RegExp('^(([>])(.*))$', 'gim'), 'blockquote', 3, false]; //<blockquote></blockquote>
const REGEXP_UL = [new RegExp('^(([-])(.*))$', 'gim'), 'li', 3, false]; //<li></li>
const REGEXP_OL = [new RegExp('^(([\\d][.])(.*))$', 'gim'), 'li', 3, false]; //<ol></ol>
const REGEXS = [
    REGEXP_BLOCKQUOTE,
    REGEXP_UL,
    REGEXP_OL,
    REGEXP_H6,
    REGEXP_H5,
    REGEXP_H4,
    REGEXP_H3,
    REGEXP_H2,
    REGEXP_H1,
    REGEXP_STRONG,
    REGEXP_I,
    REGEXP_IMG,
    REGEXP_VIDEO,
    REGEXP_A,
    REGEXP_P
];

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
 *  Processa a formatação a cada tecla digitada no textarea
 */
function processMarkDown(textarea) {
    let output = textarea.parentNode.querySelector('output');
    let html = processEachRegex(textarea);
    output.innerHTML = html;
}

/** @auth Matheus Castiglioni
 *  Processa cada expressão regular e troca para sua determinada tag HTML 
 */
function processEachRegex(textarea) {
    let html = textarea.value;
    let match;
    for(let i = 0; i < REGEXS.length; i++) {
        while(match = REGEXS[i][INDEX_REGEX].exec(textarea.value)) {            
            html = replaceMarkDownForTag(html, match, REGEXS[i]);
        }
    }
    return html;
}

/** @auth Matheus Castiglioni
 *  Troca o valor do mark down pela tag
 */
function replaceMarkDownForTag(value, match, regexp) {    
    let regExpMatch = buildRegExpMatch(regexp[INDEX_BEGIN_END], match[INDEX_MARKDOWN]);
    let html = value.replace(regExpMatch, buildTag(match, regexp[INDEX_CONTENT], regexp[INDEX_TAG]));
    return html;
}

/** @auth Matheus Castiglioni
 *  Criar expressão para trocar a tag apenas no pedaço que a mesma foi encontrada e não procurar no 
 *  value do campo inteiro
 */
function buildRegExpMatch(beginEnd, match) {
    let regExp = new RegExp(`^([${match.trim().replace(/[\[]/g, '\\[').replace(/[\]]/g, '\\]').replace(/[\/]/g, '\\/').replace(/[\-]/g, '\\-')}]{${match.trim().length}})$`);
    if (!beginEnd)
        regExp = new RegExp(`([${match.replace(/[\[]/g, '\\[').replace(/[\]]/g, '\\]').replace(/[\/]/g, '\\/').replace(/[\-]/g, '\\-')}]{${match.length}})`);
    return regExp;
}

/** @auth Matheus Castiglioni
 *  Pega o valor encontrado de acordo com cada regex e o devolve entre as TAG's
 */
function buildTag(match, content, tag) {
    let html;
    if (Array.isArray(tag) && Array.isArray(content))
        html = `<${tag[0]} ${tag[1]}="${match[content[1]]}">${match[content[0]].trim()}</${tag[0]}>`;
    else
        html = `<${tag}>${match[content].trim()}</${tag}>`;
    return html;
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