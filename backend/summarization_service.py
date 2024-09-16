import openai
import logging
from config import OPENAI_API_KEY
import asyncio

# Set up logging
logger = logging.getLogger(__name__)

# Set up OpenAI API key
openai.api_key = OPENAI_API_KEY

async def summarize_text(text: str) -> str:
    try:
        logger.info("Starting text summarization using GPT-4")

        # Create the payload for ChatCompletion outside run_in_executor
        request_payload = {
            'model': 'gpt-4',
            'messages': [
                {"role": "system", "content": "You are an expert assistant skilled at processing and summarizing transcriptions of audio and video content."},
                {"role": "user", "content": f"The following is a transcript of a YouTube MP3 file. Please provide a detailed summary that includes the main points, key insights, and any relevant takeaways. Focus on the essence of the discussion, any examples or arguments made, and actionable conclusions:\n\n{text}"}
            ],
            # Increased max tokens for more detailed output
            'max_tokens': 500,  
            'n': 1,  # Generate only one summary response
            'temperature': 0.5,  # Lower temperature for more focused and coherent summaries
        }

        # Use the synchronous create method in an executor for async behavior
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: openai.ChatCompletion.create(**request_payload)
        )

        summary = response.choices[0].message['content']
        logger.info("Summarization completed successfully")
        return summary

    except Exception as e:
        logger.error(f"Error during summarization: {str(e)}")
        raise
