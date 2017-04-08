import { Editor, Raw } from 'slate'
import React from 'react'
import MarkButton from '../container/MarkButton'
import HoverToolbar from '../container/HoverToolbar'

/**
 * Define a schema.
 *
 * @type {Object}
 */

const schema = {
  nodes: {
    paragraph: props => <p {...props.attributes}>{props.children}</p>
  },
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  }
}

/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class SlaterHover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: Raw.deserialize(props.state, { terse: true }),
      selRect: null
    }
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    this.setState({ state })
  }

  hasMark = (markType) => this.state.state.marks.some(mark => mark.type === markType)

  /**
   * When a mark button is clicked, toggle the current mark.
   */
  onClickMark = (markType) => (
    (e) => {
      e.preventDefault()
      let { state } = this.state

      state = state
        .transform()
        .toggleMark(markType)
        .apply()

      this.setState({ state })
    }
  )

  /**
   * When the portal opens, cache the menu element.
   *
   * @param {Element} portal
   */


  /**
   * Target the hover to the selection bounding rect
   */

  onSelectionChange = (selection, state) => {
    if (selection.isBlurred || selection.isCollapsed) {
      this.setState({ selRect: null })
    } else if (selection.isExpanded) {
      const selection = window.getSelection() // need the DOM selection range coordinates
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      this.setState({ selRect: rect })
    }
  }

  markButton = (icon, title, type) =>
    <MarkButton icon={icon} title={title} markType={type} hasMark={this.hasMark} onClickMark={this.onClickMark} />

  /**
   * Render.
   *
   * @return {Element}
   */
  render = () => (
    <div role="none">
      <HoverToolbar title="Inline Formatting" className="menu hover-menu" targetRect={this.state.selRect}>
        {this.markButton('format_bold', 'Bold', 'bold')}
        {this.markButton('format_italic', 'Italic', 'italic')}
        {this.markButton('format_underlined', 'Underline', 'underlined')}
        {this.markButton('code', 'Code', 'code')}
      </HoverToolbar>
      <Editor className="editor"
        schema={schema}
        state={this.state.state}
        onChange={this.onChange}
        onSelectionChange={this.onSelectionChange}
      />
    </div>
  )

}

export default SlaterHover
