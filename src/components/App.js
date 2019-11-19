import React from 'react'
import AddStep from '../containers/AddStep'
import ActualProof from '../containers/ActualProof'
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <UndoRedo />
    <ActualProof />
    <AddStep />
  </div>
)

export default App