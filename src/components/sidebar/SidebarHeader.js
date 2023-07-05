import { sidebarHeaderTemplate } from '../../templates/SidebarTemplates'
import { createComponent } from '../../utils/domUtils'

export default function SidebarHeader() {
  const $header = createComponent('div', 'header')

  this.render = () => {
    $header.innerHTML = sidebarHeaderTemplate()
  }

  this.render()

  return $header
}
