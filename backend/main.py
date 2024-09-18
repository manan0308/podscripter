import logging
import os
import sys
import traceback
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from youtube_downloader import download_audio
from transcription_service import transcribe_audio
from summarization_service import summarize_text

# Set up logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('app.log')
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware for the React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://podscripter-production.up.railway.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# VideoRequest schema for receiving video URLs
class VideoRequest(BaseModel):
    url: str

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Received {request.method} request to {request.url}")
    logger.debug(f"Request headers: {request.headers}")
    response = await call_next(request)
    logger.info(f"Returned response with status code: {response.status_code}")
    return response

@app.post("/process")
async def process_video(video: VideoRequest):
    logger.info(f"Processing video: {video.url}")
    try:
        logger.debug("Attempting to download audio")
        audio_path = await download_audio(video.url)
        logger.info(f"Audio downloaded successfully: {audio_path}")

        logger.debug("Attempting to transcribe audio")
        transcript = transcribe_audio(audio_path)
        logger.info("Audio transcribed successfully")

        logger.debug("Attempting to summarize transcript")
        summary = await summarize_text(transcript)
        logger.info("Transcript summarized successfully")

        return {"transcript": transcript, "summary": summary}
    except Exception as e:
        logger.error(f"Error processing video: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Failed to process video: {str(e)}")

@app.get("/test")
async def test_route():
    logger.info("Test route accessed")
    return {"message": "Test route is working"}

@app.on_event("startup")
async def startup_event():
    logger.info("FastAPI application starting up")
    logger.info(f"Current working directory: {os.getcwd()}")
    logger.info(f"Contents of current directory: {os.listdir('.')}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("FastAPI application shutting down")

# Serve the frontend build directory
# Note: This should be after all your API routes
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
