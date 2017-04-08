import React from 'react'

/**
 * Render an icon button.
 */

// TODO: fix styling to be same as MarkButtonS
const IconButton = ({ icon, title, isActive, onClick }) => (
  <button title={title} className="button" tabIndex="0" aria-pressed={isActive} data-active={isActive} onMouseDown={onClick} >
    <span aria-hidden="true" className="material-icons" >{icon}</span>
  </button>
)

IconButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default IconButton