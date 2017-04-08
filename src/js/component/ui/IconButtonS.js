import React from 'react'

/**
 * Render an icon button.
 */

// TODO: add hover styling
const IconButtonS = ({ icon, title, isActive, onClick }) => (
  <span role="button" title={title} className="button" tabIndex="0" aria-pressed={isActive} data-active={isActive} onMouseDown={onClick} >
    <span aria-hidden="true" className="material-icons" >{icon}</span>
  </span>
)

IconButtonS.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default IconButtonS