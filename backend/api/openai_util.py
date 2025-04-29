from openai import OpenAI, APIError
from decouple import config
import logging

# Logging configuration
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Create OpenAI client
client = OpenAI(api_key=config('OPENAI_API_KEY'))

def generate_educational_content(prompt):
    try:
        logger.info(f"Generating educational content with prompt: {prompt}")

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI educational assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300
        )

        result = response.choices[0].message.content.strip()
        logger.info(f"Received response: {result}")
        return result

    except APIError as api_err:
        # Specific logging and handling for OpenAI API-related errors
        logger.error(f"APIError occurred: {api_err}")
        if "insufficient_quota" in str(api_err):
            return {"error": "insufficient_quota"}
        return {"error": str(api_err)}

    except Exception as e:
        # Log and extract general error info
        error_msg = str(e)
        logger.error(f"Error generating educational content: {error_msg}")

        # Check for quota-related error
        if "insufficient_quota" in error_msg or "quota" in error_msg:
            return {"error": "insufficient_quota"}
        
        return {"error": error_msg}
