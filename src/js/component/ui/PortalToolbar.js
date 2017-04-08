import Portal from 'react-portal'
import React from 'react'

/**
 * Render the Toolbar.
 *
 * @return {Element}
 */

const PortalToolbar = ({ onOpen, title, className, style, children }) => (
  <Portal isOpened={true} onOpen={onOpen} closeOnEsc={true} >
    <div role="toolbar" title={title} className={className} aria-hidden={style == null} style={style || {}}>
      {children}
    </div>
  </Portal>
)

export default PortalToolbar
