import React, {useState, useEffect} from "react";
//See this post: https://stackoverflow.com/questions/10639914/is-there-a-way-to-get-bings-photo-of-the-day
//The cors Pre-fight is solved with an server endpoint that proxies the image. Someone in the comments provided it :)
//Wenn der Server nicht mehr zur verfuegung steht, musst Du Dir selbst einen erstellen. z.B so: https://blog.atwork.at/post/Use-the-Daily-Bing-picture-in-Teams-calls

// export const getServerSideProps = async () => {
//   const response = await fetch(`https://api45gabs.azurewebsites.net/api/sample/bingphotos`, {
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             method: 'GET'
//           });
//   const res = await response.json();
//   console.log("Im running");
//   return {
//     props: {urlData: res}
//   }
// }

function Layout(props, {urlData}) {
  const [url, setUrl] = useState();


  useEffect(() => {

    const InitialRequestFunction = async event => {
      const response = await fetch(`https://api45gabs.azurewebsites.net/api/sample/bingphotos`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'GET'
          });
      const res = await response.json();
      // console.log(res[0].url);
      setUrl(res[0].url);
    }
    InitialRequestFunction();
  }, [])

//Wenn die URL von Bing fuer das daily Wallpaper geladen ist, zeig es an. Ansonsten nimm ein alternatives Bild.
  return (
    <div className="page-layout">
      {props.children}
      <style jsx global>{`
        body {
          ${url !== undefined ? ("background-image: url(https://www.bing.com/" + url + ")") : ("background-image: url(https://www.bing.com/th?id=OHR.Tetouan_EN-US7379560261_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp%22)")};
        }
      `}</style>
    </div>
  )
}


export default Layout
