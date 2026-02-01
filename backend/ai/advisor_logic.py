import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def get_advisor_response(advisor_id, player_message, session, era_data):
    from content.advisors import ADVISOR_CONFIGS
    
    config = ADVISOR_CONFIGS.get(advisor_id, {})
    
    # 1. Build the System Prompt (The AI's Instructions)
    system_instruction = f"""
    You are {config.get('name')}, a Roman advisor in {era_data['year']}.
    Personality: {config.get('personality')}
    Hidden Agenda: {config.get('hidden_agenda')}
    Your Secret 'Tell': {config.get('tell')} (Use this subtly when lying).
    
    Current Rome Stats: {session.stats}
    Player has viewed these evidences: {session.evidence_viewed}
    
    Rules:
    - Stay in character.
    - Keep responses to 2-4 sentences.
    - Do not admit you are an AI.
    - If the player challenges you with evidence, be defensive but stay in character.
    """

    # 2. Get existing chat history for this advisor
    history = session.chats.get(advisor_id, [])
    
    # 3. Add the new player message to history
    messages = [{"role": "system", "content": system_instruction}]
    messages.extend(history)
    messages.append({"role": "user", "content": player_message})

    # 4. Call OpenAI
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    
    ai_reply = response.choices[0].message.content
    
    # 5. Return the reply and the updated history
    new_history = history + [
        {"role": "user", "content": player_message},
        {"role": "assistant", "content": ai_reply}
    ]
    
    return ai_reply, new_history