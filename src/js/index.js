import React from 'react'
import ReactDOM from 'react-dom'
import Slater from './component/SlaterP'
import stateTest from '../../state-test.json'
import stateHover from '../../state-hover.json'

ReactDOM.render(
  <Slater state={stateHover} />,
  document.getElementById('editor')
);
