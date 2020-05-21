import React from 'react'
import AddStep from '../containers/AddStep'
import ActualProof from '../containers/ActualProof'
import ActualLanguage from '../containers/ActualLanguage'
import UndoRedo from '../containers/UndoRedo'
import ImportExport from '../containers/ImportExport'
import Help from '../components/Help'

const App = () => (
  <div>
    <UndoRedo />
    <ImportExport />
    <ActualLanguage />
    <ActualProof />
    <AddStep />
    <Help />
  </div>
)

export default App