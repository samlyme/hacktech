import { UTApi } from "uploadthing/server";

console.log(process.env.UPLOADTHING_TOKEN)
export const utapi = new UTApi({});

const f = new File(["asdf"], "lol.txt")
const res = await utapi.uploadFiles(f)

console.log(res);
