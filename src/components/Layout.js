import React, {useState, useEffect, useRef} from "react";
//See this post: https://stackoverflow.com/questions/10639914/is-there-a-way-to-get-bings-photo-of-the-day
//The cors Pre-fight is solved with an server endpoint that proxies the image. Someone in the comments provided it :) --> https://api45gabs.azurewebsites.net/api/sample/bingphotos
//Cors wird über JavaScript getriggert das auf Client Side läuft. Deshalb der API Endpoint backgroundImage


function Layout(props) {
  const [url, setUrl] = useState();
  const [initialRequest, setInitialRequest] = useState(false);




  useEffect(() => {
    const InitialRequestFunctionApi = async event => {
      const response = await fetch(`api/backgroundImage/backgroundImageApi`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'GET'
          });
      const res = await response.json();
      // console.log(res[0].url);
      setUrl(res.images[0].url)
      setInitialRequest(true);
    }
    InitialRequestFunctionApi();

  }, []);

//Wenn die URL von Bing fuer das daily Wallpaper geladen ist, zeig es an. Ansonsten nimm ein alternatives Bild.
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>{`
        body {
          ${url !== undefined ? ("background-image: url(https://www.bing.com/" + url + ")") : ("background-image: url(https://www.bing.com/th?id=OHR.Tetouan_EN-US7379560261_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp%22)")};
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
        p, h1, h2, h3, h4, h5, h6, a{
          color: #f8f9fa;
        }
      `}</style>
    </div>
  )
}


export default Layout
