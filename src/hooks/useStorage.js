import { useState, useEffect } from "react";
import { projectStorage } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

const useStorage = (file, metadata) => {
  const [ progress, setProgress ] = useState(0)
  const [ error, setError ] = useState(null)
  const [ url, setUrl ] = useState(null)

  const filePath = `chat/public/${uuidv4()}.jpg`

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(filePath);

    storageRef.put(file).on('state_changed', snap => {
      let percentage = Math.round(snap.bytesTransferred / snap.totalBytes) * 100
      setProgress(percentage);
    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL();
      setUrl(url)
    });
  }, [file]) 

  return { progress, url, error }
}

export default useStorage;