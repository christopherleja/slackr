import { useEffect } from 'react'
import mime from 'mime-types'
import useStorage from '../../hooks/useStorage'

const ProgressBar = ({ file, setFile, readyToSend }) => {
  const metadata = { contentType: mime.lookup(file.name) }

  const { url, progress, error } = useStorage(file, metadata)

  useEffect(() => {
    if (url){
      readyToSend(url)
      setFile(null)
    }
  }, [url, file])

  return (
    <div 
      className="progress-bar"
      style={{ 
        width: `${progress}%`,
        height: '.4rem',
        backgroundColor: 'firebrick',
      }}
      >
    </div>
  )
}

export default ProgressBar
