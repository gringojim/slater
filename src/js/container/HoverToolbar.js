import React from 'react'
import PortalToolbar from '../component/ui/PortalToolbar'

const PAD = 5
const position = (window, menu, rect) => (menu && rect ? {
  opacity: 1,
  top: `${Math.max(rect.top + window.scrollY - menu.offsetHeight, PAD)}px`,
  left: `${Math.max(rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2, PAD)}px`
}
  : null
)

class HoverToolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menu: null }
    this.onOpen.bind(this)
  }

  onOpen = (portal) => {
    this.setState({ menu: portal.firstChild })
  }

  render = () => {
    let { title, className, targetRect, children } = this.props
    let style = position(window, this.state.menu, targetRect)

    return (
      <PortalToolbar isOpened onOpen={this.onOpen} title={title} className={className}
        style={style}>
        {children}
      </PortalToolbar>
    )
  }
}

export default HoverToolbar
