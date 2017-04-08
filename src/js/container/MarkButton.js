import React from 'react'
import IconButton from '../component/ui/IconButtonS'

/**
 * Render a mark-toggling button.
 */
const MarkButton = ({ icon, title, markType, hasMark, onClickMark }) =>
  <IconButton icon={icon} title={title} isActive={hasMark(markType)} onClick={onClickMark(markType)} />

MarkButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  markType: React.PropTypes.string.isRequired,
  hasMark: React.PropTypes.func.isRequired,
  onClickMark: React.PropTypes.func.isRequired
}

export default MarkButton