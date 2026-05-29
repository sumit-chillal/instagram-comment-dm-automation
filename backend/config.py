import os
from dotenv import load_dotenv

load_dotenv()

VERIFY_TOKEN = os.getenv("VERIFY_TOKEN", "")
INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN", "")
IG_BUSINESS_ACCOUNT_ID = os.getenv("IG_BUSINESS_ACCOUNT_ID", "")
print("TOKEN START:", INSTAGRAM_ACCESS_TOKEN[:20])
print("IG ACCOUNT:", IG_BUSINESS_ACCOUNT_ID)