import {getSession} from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({req});

  if(session){
    res.json(session)
  } else {
    res.send({
      error: "YOu need to be signed in"
    })
  }
}
