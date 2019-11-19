import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="btn-group" role="group">
    <button type="button" className="btn btn-secondary" onClick={onUndo} disabled={!canUndo}>Undo</button>
    <button type="button" className="btn btn-secondary" onClick={onRedo} disabled={!canRedo}>Redo</button>
  </div>
)

const mapStateToProps = (state) => ({
  canUndo: state.steps.past.length > 0,
  canRedo: state.steps.future.length > 0
})

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo)

export default UndoRedo
