//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';



/**
 * @param {string} url
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(url, { signal: controller.signal })
        if(res.statusText !== 'OK') throw Error('could not fetch data')
        setData(res.data)
        setError(null)
        setLoading(false)
      } catch (error) {
        if(error.message === 'canceled') {
          setLoading(false)
        }else if (error.response.status == 401) {
          setError('Please log in')
        }else{
          setError(error.response)
        }
      } 
    }
    fetchData()
    return () => {
      controller.abort()
    };
  }, [url, data])

  return { data, loading, error }
}

export default useFetch;