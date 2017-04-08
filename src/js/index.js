import React from 'react'
import ReactDOM from 'react-dom'
import Slater from './component/SlaterTable2'
import stateTest from '../../state-test.json'
import state from '../../state-table.json'

ReactDOM.render(
  <Slater state={state} />,
  document.getElementById('editor')
);
