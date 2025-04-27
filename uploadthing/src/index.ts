import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

// Example test upload (commented out):
// const f = new File(["asdf"], "lol.txt");
// const res = await utapi.uploadFiles(f);
// console.log(res);

const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url);

    // Return index.html for root path
    if (url.pathname === "/") {
      return new Response("home");
    }

    if (url.pathname === "/upload") {
      const formdata = await req.formData();
      const fileEntry = formdata.get("profilePicture");

      // Check both null and type
      if (!(fileEntry instanceof Blob)) {
        return new Response("Invalid or missing file", { status: 400 });
      }

      // Safe to upload
      const uploadRes = await utapi.uploadFiles(fileEntry);

      console.log(uploadRes);

      return new Response("uploaded");
    }

    return new Response("Not Found", { status: 404 });
  },
});
