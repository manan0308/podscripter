import assemblyai as aai
from config import ASSEMBLYAI_API_KEY
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Set up the API key for AssemblyAI
aai.settings.api_key = ASSEMBLYAI_API_KEY

def transcribe_audio(file_path: str) -> str:
    try:
        logger.info("Starting transcription using AssemblyAI")
        transcriber = aai.Transcriber()

        # Use the synchronous transcribe method
        transcript = transcriber.transcribe(file_path)

        # Check the transcription status
        if transcript.status == aai.TranscriptStatus.error:
            raise Exception(f"Transcription error: {transcript.error}")

        logger.info("Transcription completed successfully")
        return transcript.text  # Synchronous result
    except Exception as e:
        logger.error(f"Error during transcription: {str(e)}")
        raise
