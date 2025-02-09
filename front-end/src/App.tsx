import './App.css'
import { useAppSelector } from './app/hooks'
import EditModeOverlay from './components/edit-mode-overlay/edit-mode-overlay'
import SearchEngine from './sections/search-engine/search-engine'
import Shortcuts from './sections/shortcuts/shortcuts'
import Spacer from './widgets/spacer'


function App() {
  // State
  const editMode = useAppSelector((state) => state.edit.editMode)

  // Render
  return (
    <>
      <div
        className={'wrapper' + (editMode ? ' edit-mode' : '')}
      >
        <div
          className={'app' + (editMode ? ' edit-mode' : '')}
        >
          <div className='app-content'>
            <Spacer height={128} />
            <SearchEngine />
            <Spacer height={64} />
            <Shortcuts />
          </div>
        </div>
      </div>

      {/* Edit Mode */}
      <div className='edit-mode-overlay-container'>
        <EditModeOverlay />
      </div>
    </>
  )
}

export default App
