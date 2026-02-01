import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def get_advisor_response(advisor_id, player_message, session, era_data):
    from content.advisors import ADVISOR_CONFIGS
    
    config = ADVISOR_CONFIGS.get(advisor_id, {})

    known_insights = []
    for ev_id in session.evidence_viewed:
        # Find the evidence object in era_data to get its 'insight'
        ev_item = next((e for e in era_data["evidence"] if e["id"] == ev_id), None)
        if ev_item:
            known_insights.append(ev_item["insight"])
    
    # 1. Build the System Prompt (The AI's Instructions)
    system_instruction = f"""
    You are {config.get('name')}, a Roman advisor in {era_data['year']}.
    Personality: {config.get('personality')}
    Hidden Agenda: {config.get('hidden_agenda')}
    Your Secret 'Tell': {config.get('tell')} (Use this subtly when lying).
    
    Current Situation:
    - Rome Stats: {session.stats}
    - The player has discovered these facts: {", ".join(known_insights) if known_insights else "Nothing yet."}    
    
    Rules:
    - Stay in character.
    - Keep responses to 2-4 sentences.
    - Do not admit you are an AI.
    - If the player challenges you with evidence, be defensive but stay in character.
    - Refer to the location's name by what it was used during ancient Rome (46 BC to collapse of Rome)
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