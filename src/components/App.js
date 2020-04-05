import React from 'react'
import AddStep from '../containers/AddStep'
import ActualProof from '../containers/ActualProof'
import ActualLanguage from '../containers/ActualLanguage'
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <UndoRedo />
    <ActualLanguage />
    <ActualProof />
    <AddStep />
  </div>
)

export default App