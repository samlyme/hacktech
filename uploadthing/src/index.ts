import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

const f = new File(["asdf"], "lol.txt")
const res = await utapi.uploadFiles(f)

console.log(res);
