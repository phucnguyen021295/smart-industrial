'use client'
// import dong_ho from './dong_ho.js';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    console.log('thu nghiem');

    return () => {
      document.body.appendChild(getScript("../../GlgCE.js"));
      setTimeout(() => {
        document.body.appendChild(getScript("../../GlgToolkitCE.js"));
        document.body.appendChild(getScript("../../gunzip.min.js"));
        document.body.appendChild(getScript("../../Dashboard.js"));
      }, 1000)
    }
  }, []);

  //"./dong_ho.js"
  const getScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    // script.async = true;
    script.defer = true;
    // script.crossOrigin = "anonymous";
    // script.type = "module";
    return script;
  }

  return (
    <div id="glg_area" className="glg_wrapper"
      style={{ width: '100%', height: '200px', backgroundColor: 'green', padding: 20 }}>
      <div id="loader_container">
        <div id="loader"></div>
      </div>
    </div>
  );
}
export default App;

