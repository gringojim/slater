import { Editor, Raw } from 'slate'
import React from 'react'
import SVGButton from '../component/ui/SVGButtonS'
import PluginEditTable from 'slate-edit-table'
// import Toolbar from '../container/HoverToolbar'

/**
 * Define a schema.
 *
 * @type {Object}
 */
// 'table-caption': <caption></caption>
/*const schema = {
  nodes: {
    'table': props =>
      <table >
        { (props.caption != null) && <caption>{props.caption}</caption>}
        <tbody {...props.attributes}>{props.children}</tbody>
      </table>,
    'table-row': props => <tr {...props.attributes}>{props.children}</tr>,
    'table-cell': props =>
      <td {...props.attributes}>
        {props.children}
      </td>,
  },
  marks: {
    bold: props => <strong>{props.children}</strong>,
  }
}*/

const tableButton = (icon, title) =>
  <SVGButton icon={icon} title={title} isActive={false} onClick={ () => {} } />

/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class SlaterTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: Raw.deserialize(props.state, { terse: true }),
      selRect: null
    }
  }

  /**
   * On backspace, do nothing if at the start of a table cell.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */

  onBackspace = (e, state) => {
    console.log(">bs", state.startKey, state.startOffset, state.endKey, state.endOffset)
    if (state.startOffset != 0) return
    e.preventDefault()
    return state
  }

  /**
   * On delete, do nothing if at the end of a table cell.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */

  onDelete = (e, state) => {
    console.log(">del", state.startKey, state.startOffset, state.endKey, state.endOffset)
    if (state.endOffset != state.startText.length) return
    e.preventDefault()
    return state
  }

  /**
   * On return, do nothing if inside a table cell.
   *
   * @param {Event} e
   * @param {State} state
   * @return {State or Null} state
   */

  onEnter = (e, state) => {
    console.log(">ent", state.startKey, state.startOffset, state.endKey, state.endOffset)
    e.preventDefault()
    return state
  }

  /**
   * On key down, check for our specific key shortcuts.
   *
   * @param {Event} e
   * @param {Object} data
   * @param {State} state
   * @return {State or Null} state
   */

  onKeyDown = (e, data, state) => {
    console.log(">keydown", data.key, state.startKey, state.startOffset, state.endKey, state.endOffset)
    const { document, selection } = state
    const { startKey } = selection
    const startNode = document.getDescendant(startKey)
    console.log(">keydown", startNode)

    if (selection.isAtStartOf(startNode)) {
      const previous = document.getPreviousText(startNode.key)
      const prevBlock = document.getClosestBlock(previous.key)

      if (prevBlock.type == 'table-cell') {
        e.preventDefault()
        return state
      }
    }

    if (state.startBlock.type != 'table-cell') return
    switch (data.key) {
      case 'backspace': return this.onBackspace(e, state)
      case 'delete': return this.onDelete(e, state)
      case 'enter': return this.onEnter(e, state)
    }
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = (state) => {
    console.log('>CHG STATE', state)
    this.setState({ state })
  }

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

  /**
   * Render.
   *
   * @return {Element}
   */
  // <Toolbar title="Inline Formatting" className="menu hover-menu" targetRect={this.state.selRect}>

  render = () => (
    <div style={{border: "2px solid orange", padding: "5px"}} role="none">EDITING
      <div title="Table Editing" className="menu">
       { tableButton( "table", "Add Table" ) }
       { tableButton( "table-large", "Add Table2" ) }
       { tableButton( "table-caption-top-bottom", "Table Caption" ) }
       { tableButton( "label", "Table Caption" ) }
       { tableButton( "label-outline", "Table Caption" ) }
       { tableButton( "table-edit", "Edit Table" ) }
       { tableButton( "table-column-plus-before", "Add Column Before" ) }
       { tableButton( "table-column-plus-after", "Add Column After" ) }
       { tableButton( "table-column-remove", "Add Column After" ) }
       { tableButton( "table-column-width", "Column Width" ) }
       { tableButton( "table-row-plus-before", "Add Row Before" ) }
       { tableButton( "table-row-plus-after", "Add Row After" ) }
       { tableButton( "table-row-remove", "Add Row After" ) }
       { tableButton( "table-row-height", "Row Height" ) }
   </div>
      <Editor className="editor"
        schema={schema}
        state={this.state.state}
        onChange={this.onChange}
        onSelectionChange={this.onSelectionChange}
      />
    </div>
  )

}

export default SlaterTable

/* Hover toolbar at cursor for context menu

      <HoverToolbar title="Table Editing" className="menu hover-menu" targetRect={this.state.selRect}>
        <IconButton  AddTable />
      </HoverToolbar>
*/