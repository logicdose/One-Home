import Spacer from '../../widgets/spacer';
import SearchEngineImage from '../../assets/images/search-engine-image.jpg'
import './search-engine.css'
import { FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ImageRounded } from '@mui/icons-material';
import SearchImageApi from '../../storage/apis/search-image.api';

export default function SearchEngine() {

    // State
    const editMode = useAppSelector((state) => state.edit.editMode)
    const showSearchImage = useAppSelector((state) => state.config.showSearchImage)

    // Image
    const [image, setImage] = useState('')

    // Form State
    const [searchText, setSearchText] = useState('')

    // Methods
    const handleSubmit = (e: FormEvent, newTab: boolean = false) => {
        e.preventDefault()
        // If no search text
        if (searchText === "") {
            // Open Google
            window.open('https://www.google.com', newTab ? '_blank' : '_self')
            return
        }

        window.open(`https://www.google.com/search?q=${searchText}`, newTab ? '_blank' : '_self')

        // Reset
        setSearchText('')
    }

    const pickImage = () => {
        // Open File Picker
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target?.result
                if (!data) return

                setImage(data.toString())

                // Save Image
                SearchImageApi.saveImage(data.toString())
            }

            reader.readAsDataURL(file)
        }

        input.click()
    }

    const loadImage = async () => {
        const image = await SearchImageApi.loadImage()
        if (image) setImage(image)
    }

    // Effects
    useEffect(() => {
        loadImage()
    }, [])

    // Render
    return (
        <div className='search-engine'>
            <Spacer height={16} />
            {(showSearchImage) && (
                <div className='logo'>
                    {image ? (
                        <img src={image} alt='One Home' />
                    ) : (
                        <img src={SearchEngineImage} alt='One Home' />
                    )}


                    {/* Edit Mode Overlay */}
                    {editMode && (
                        <>
                            {/* Pick Button */}
                            {!image && (
                                <div
                                    className='edit-mode-overlay'
                                    onClick={() => pickImage()}
                                >
                                    <ImageRounded />
                                    <Spacer width={12} />
                                    <span>Pick Image</span>
                                </div>
                            )}

                            {/* Remove Button */}
                            {image && (
                                <div
                                    className='edit-mode-overlay remove'
                                    onClick={() => {
                                        setImage('')
                                        SearchImageApi.removeImage()
                                    }}
                                >
                                    <ImageRounded />
                                    <Spacer width={12} />
                                    <span>Remove</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            <Spacer height={32} />
            <form onSubmit={handleSubmit}>
                <div className='search-box'>
                    <input
                        disabled={editMode}
                        type='text'
                        placeholder='Search here...'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            // If holding `Ctrl` key and press `Enter`
                            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                e.preventDefault()
                                handleSubmit(e, true)
                            }
                        }}
                    />
                    <div className='button-container'>
                        <button
                            disabled={editMode}
                            type='submit'
                            className='search-button'
                        >@Google</button>
                    </div>
                </div>
            </form>
            <Spacer height={16} />
        </div>
    );
}