import { Editor, Raw } from 'slate'
import React from 'react'
import ReactDOM from 'react-dom'
import PluginEditTable from 'slate-edit-table'
import SVGButton from '../component/ui/SVGButtonS'

const tablePlugin = PluginEditTable();
const plugins = [
  tablePlugin
];

const schema = {
  nodes: {
    table: props => <table><tbody {...props.attributes}>{props.children}</tbody></table>,
    table_row: props => <tr {...props.attributes}>{props.children}</tr>,
    table_cell: (props) => {
      let align = props.node.get('data').get('align') || 'left'
      return <td style={{ textAlign: align }} {...props.attributes}>{props.children}</td>;
    },
    paragraph: props => <p {...props.attributes}>{props.children}</p>,
    heading: props => <h1 {...props.attributes}>{props.children}</h1>
  }
};

const tableButton = (icon, title, onClick) => <SVGButton icon={icon} title={title} isActive={false} onClick={onClick} />

const Example = React.createClass({
  getInitialState: function () {
    return {
      state: Raw.deserialize(this.props.state, { terse: true }),
    };
  },

  onChange: function (state) {
    this.setState({
      state: state
    });
  },

  onInsertTable: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.insertTable(state.transform())
        .apply()
    );
  },

  onInsertColumn: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.insertColumn(state.transform())
        .apply()
    );
  },

  onInsertRow: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.insertRow(state.transform())
        .apply()
    );
  },

  onRemoveColumn: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.removeColumn(state.transform())
        .apply()
    );
  },

  onRemoveRow: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.removeRow(state.transform())
        .apply()
    );
  },

  onRemoveTable: function () {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.removeTable(state.transform())
        .apply()
    );
  },

  onSetAlign: function (event, align) {
    let { state } = this.state;

    this.onChange(
      tablePlugin.transforms.setColumnAlign(state.transform(), align)
        .apply()
    );
  },

  renderNormalToolbar: function () {
    return (
      <div>
        <button onClick={this.onInsertTable}>Insert Table</button>
      </div>
    );
  },

  renderTableToolbar: function () {
    return (
      <div>
        {tableButton("table", "Insert Table", this.onInsertTable)}
        {tableButton("table-column-plus-after", "Insert Column After", this.onInsertColumn)}
        {tableButton("table-column-remove", "Remove Column", this.onRemoveColumn)}
        {tableButton("table-row-plus-after", "Insert Row After", this.onInsertRow)}
        {tableButton("table-row-remove", "Remove Row", this.onRemoveRow)}
        {tableButton("table-delete", "Delete Table", this.onRemoveTable)}
        <br />
        <button onClick={(e) => this.onSetAlign(e, 'left')}>Set align left</button>
        <button onClick={(e) => this.onSetAlign(e, 'center')}>Set align center</button>
        <button onClick={(e) => this.onSetAlign(e, 'right')}>Set align right</button>
      </div>
    );
  },

  render: function () {
    let { state } = this.state;
    let isTable = tablePlugin.utils.isSelectionInTable(state);

    return (
      <div>
        {isTable ? this.renderTableToolbar() : this.renderNormalToolbar()}
        <Editor
          placeholder={'Enter some text...'}
          plugins={plugins}
          state={state}
          onChange={this.onChange}
          schema={schema}
        />
      </div>
    );
  }
});


export default Example

/////////////////

  /*
        <button onClick={this.onInsertTable}>Insert Table</button>
        <button onClick={this.onInsertColumn}>Insert Column</button>
        <button onClick={this.onInsertRow}>Insert Row</button>
        <button onClick={this.onRemoveColumn}>Remove Column</button>
        <button onClick={this.onRemoveRow}>Remove Row</button>
        <button onClick={this.onRemoveTable}>Remove Table</button>


       { tableButton( "table-large", "Insert Table2" ) }
       { tableButton( "table-caption-top-bottom", "Table Caption" ) }
       { tableButton( "label", "Table Caption" ) }
       { tableButton( "label-outline", "Table Caption" ) }
       { tableButton( "table-edit", "Edit Table" ) }
       { tableButton( "table-column-plus-before", "Insert Column Before" ) }
       { tableButton( "table-column-width", "Column Width" ) }
       { tableButton( "table-row-plus-before", "Insert Row Before" ) }
       { tableButton( "table-row-height", "Row Height" ) }


  mytable_render = () => (
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
  )*/