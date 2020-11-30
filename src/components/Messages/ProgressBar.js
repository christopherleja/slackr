import { useEffect } from 'react'
import mime from 'mime-types'
import useStorage from '../../hooks/useStorage'
import { Progress } from 'semantic-ui-react'

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
    <Progress
      className="progress__bar"
      percent={progress}
      progress
      indicating
      size="medium"
      inverted
    />
  )
}

export default ProgressBar
