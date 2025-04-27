import os
from dotenv import load_dotenv
from fastapi import APIRouter, Request, Response
from uploadthing_py import UploadThingRequestBody, create_route_handler, create_uploadthing


load_dotenv()
router = APIRouter(prefix="/api/uploadthing", tags=["UploadThing"])

f = create_uploadthing()


upload_router = {
    "videoAndImage": f(
        {
            "image/png": {"max_file_size": "4MB"},
            "image/heic": {"max_file_size": "16MB"},
        }
    )
    .middleware(lambda req: {"user_id": req.headers["x-user-id"]})
    .on_upload_complete(lambda file, metadata: print(f"Upload complete for {metadata['user_id']}"))
}
handlers = create_route_handler(
    router=upload_router,
    api_key=os.getenv("UPLOADTHING_SECRET", "ur mom"),
    is_dev=os.getenv("ENVIRONMENT", "development") == "development",
)

@router.get("/")
async def ut_get():
    return handlers["GET"]()


@router.post("/")
async def ut_post(
    request: Request,
    response: Response,
    body: UploadThingRequestBody,
):
    return await handlers["POST"](
        request=request,
        response=response,
        body=body,
    )