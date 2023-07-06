import { ENV } from '../utils/constants'
import { getItem } from '../utils/storage'

// editor
export function contentTemplate({ content, documents }) {
  let html = `<textarea>${content ? content : ''}</textarea>`

  if (documents.length) {
    html += `
      <ul class="sub-documents-list">
        ${documents
          .map(
            (subDocument) =>
              `<li class="sub-document" data-id="${subDocument.id}"><span>${
                subDocument.title.length ? subDocument.title : '제목 없음'
              }</span></li>`,
          )
          .join('')}
      </ul>
    `
  }

  return html
}

export function titleTemplate({ title }) {
  return title.length
    ? `<input value="${title}" />`
    : `<input class="untitled" placeholder="제목 없음" />`
}

// sidebar
export function documentsListTemplate(documents) {
  return `
    <ul>
      ${documents.map((document) => `${renderDocument(document)}`).join('')}
      <li><button class='add'>+ 페이지 추가</button></li>
    </ul>
  `
}

export function sidebarHeaderTemplate() {
  return `
    <img src="" />
    <span>효리보고의 Notion</span>
  `
}

function renderDocument({ id, title, documents }) {
  const toggleState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
  const isHiddenClass = toggleState?.[id] ? '' : 'hidden'

  let html = `
    <li data-id='${id}' class='document'>
      <button class='toggle'>Toggle</button>
      <span>[${id}] ${title.length ? title : '제목 없음'}</span>
      <button class='delete'>X</button>
      <button class='add'>+</button>
  `

  if (documents.length) {
    html += `<ul class='nested ${isHiddenClass}'>`
    documents.forEach((subDocument) => {
      html += `${renderDocument(subDocument)}`
    })
    html += '</ul>'
  } else {
    html += `
      <ul class='nested ${isHiddenClass} no-subs'>
        <li>하위 페이지 없음</li>
      </ul>`
  }

  html += '</li>'

  return html
}
