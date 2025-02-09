import { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import EditModeOverlay from './components/edit-mode-overlay/edit-mode-overlay'
import SearchEngine from './sections/search-engine/search-engine'
import Shortcuts from './sections/shortcuts/shortcuts'
import { setAppBackground } from './states/edit-state'
import SearchImageApi from './storage/apis/search-image.api'
import Spacer from './widgets/spacer'
import { loadConfig } from './states/config-state'


function App() {
  // State
  const editMode = useAppSelector((state) => state.edit.editMode)
  const appBackground = useAppSelector((state) => state.edit.appBackground)
  const dispatch = useAppDispatch()

  // Methods
  const fetchBackgroundImage = async () => {
    // Load image
    const image = await SearchImageApi.loadBackgroundImage()
    if (image) {
      dispatch(setAppBackground(image))
    }
  }

  // Effects
  useEffect(() => {
    fetchBackgroundImage();

    // Load Config
    dispatch(loadConfig())
  }, []);

  // Render
  return (
    <>
      <div
        className={'wrapper' + (editMode ? ' edit-mode' : '')}
      >
        <div
          className={'app' + (editMode ? ' edit-mode' : '')}
          style={{
            backgroundImage: appBackground ? `url(${appBackground})` : undefined,
          }}
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
