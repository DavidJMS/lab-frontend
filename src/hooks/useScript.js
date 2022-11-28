import { useEffect } from 'react'

const useScript = (url, config = null) => {
  useEffect(() => {
    const allScripts = [...document.querySelectorAll('script')]
    if (allScripts.some(script => script.src === url)) {
      if (config && config.callback) {
        config.callback(null)
      }
      return
    }

    const script = document.createElement('script')
    const target = document.getElementsByTagName('script')[0]
    script.src = url
    // script.async = config.async || false;
    if (config && config.callback) {
      script.addEventListener('load', function (e) { config.callback(null, e) }, false)
    }
    target.parentNode.insertBefore(script, target)

    return () => {
      if (config && config.kill) {
        target.parentNode.removeChild(script)
      }
    }
  }, [url, config])
}

export default useScript
