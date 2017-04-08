import React from 'react'
import ReactDOM from 'react-dom'
import { Editor, Raw } from 'slate'
// import * as style from './slater.scss'

export default class Slater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      state: Raw.deserialize(props.state, { terse: true })
    }
    this.onChange = this.onChange.bind(this);
  }

  // On change, update the app's React state with the new editor state.
  onChange = (state) => {
    this.setState({ state })
  }

  // Render the editor.
  render = () => (
    <Editor className="editor"
      state={this.state.state}
      onChange={this.onChange}
    />
  )
}