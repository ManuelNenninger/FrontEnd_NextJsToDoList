
export default async (req, res) => {
    const response = await fetch(`http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-DE`, {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'GET'
        });
    const resJson = await response.json();
    res.send(resJson);

}
