import logging
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from youtube_downloader import download_audio  # Asynchronous download
from transcription_service import transcribe_audio  # Synchronous transcription
from summarization_service import summarize_text  # Asynchronous summarization

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Serve the frontend build directory
app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="frontend")

# Add CORS middleware for the React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://podscripter-production.up.railway.app"],  # Add your Railway domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# VideoRequest schema for receiving video URLs
class VideoRequest(BaseModel):
    url: str

@app.post("/process")
async def process_video(video: VideoRequest):
    logger.info(f"Received request to process video: {video.url}")
    try:
        # Asynchronous download of audio from the given URL
        logger.info("Attempting to download audio")
        audio_path = await download_audio(video.url)
        logger.info(f"Audio downloaded successfully: {audio_path}")

        # Synchronous transcription of the downloaded audio
        logger.info("Attempting to transcribe audio")
        transcript = transcribe_audio(audio_path)  # Synchronous call, no await
        logger.info("Audio transcribed successfully")

        # Asynchronous summarization of the transcript
        logger.info("Attempting to summarize transcript")
        summary = await summarize_text(transcript)  # Async summarization
        logger.info("Transcript summarized successfully")

        # Return both the transcript and summary
        return {"transcript": transcript, "summary": summary}

    except Exception as e:
        logger.error(f"Error processing video: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to process video: {str(e)}")


@app.on_event("startup")
async def startup_event():
    logger.info("FastAPI application starting up")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("FastAPI application shutting down")
