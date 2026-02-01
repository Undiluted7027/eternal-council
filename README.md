*Submitted as part of [XHacks 2026](https://devpost.com/software/divergence-5gw6j0)*
## Inspiration                                                                         
                                                                                         
  We were fascinated by a simple question: *What if history had gone differently?*       
                                                                                         
  The fall of the Roman Republic and eventual collapse of the Empire wasn't inevitable—it was the result of specific decisions made by specific people. We wanted to create an experience where players could explore these pivotal moments, make their own choices, and see how their alternate timeline compares to actual history.                                                                                                            
  But we didn't want a simple choose-your-own-adventure. We wanted advisors who felt *real*—characters with their own personalities, biases, and hidden agendas who would try to manipulate the player just like real political actors would.                    
                                                                                         
## What It Does                                                                        
                                                                                         
  **Divergence** is an interactive historical strategy game where you play as the "Oracle"—a mysterious advisor to Rome across five pivotal eras:                        
                                                                                         
  1. **49 BC** - The Rubicon                                                   
  2. **44 BC** - The Ides of March                                                       
  3. **27 BC** - The Principate                                                    
  4. **235 AD** - The Crisis                                               
  5. **476 AD** - The Fall                                                       
                                                                                         
  In each era, you:                                                                      
  - **Investigate evidence** - Examine historical documents, letters, and records        
  - **Consult AI advisors** - Chat with senators, generals, merchants, and priests who each have hidden agendas                                                              
  - **Make critical decisions** - Choose the path Rome will take                         
                                                                                         
  At the end, a **Timeline Visualization** shows exactly where your choices diverged from actual history, with your "Historical Accuracy" score revealing how closely you followed Rome's true path.                                                             

                                                                                         
## How We Built It                                                                     
                                                                                         
  **Frontend:** React 19 + TypeScript with Vite for blazing-fast development. We used:   
  - **Zustand** for state management (tracking player choices, stats, chat history)      
  - **Framer Motion** for smooth animations and transitions                              
  - **Tailwind CSS** for a cohesive Roman-inspired visual design                         
  - **Custom SVG visualizations** for the branching timeline                             
                                                                                         
  **Backend:** Python FastAPI providing:                                                 
  - Session management for player progress                                               
  - Era content delivery with historical accuracy calculations                           
  - Real-time stat tracking (Military, Economy, Stability, Republic)                     
                                                                                         
  **AI Integration:** OpenAI GPT-4 powers our advisor conversations. Each advisor has:   
  - A unique personality profile                                                         
  - A hidden agenda they're secretly pursuing                                            
  - A "tell"—a phrase they use when lying                                                
  - Context awareness of what evidence the player has discovered                         
                                                                                         
## Challenges We Faced                                                                 
                                                                                         
  **Making AI advisors feel authentic:** Getting GPT-4 to stay in character while being subtly deceptive was tricky. We developed detailed personality profiles and "tells" so players who pay attention can catch advisors in their lies.                            
                                                                                         
  **Balancing historical accuracy with gameplay:** We wanted choices to feel meaningful while still reflecting real historical constraints. The stat system (Military, Economy, Stability, Republic) lets players see the consequences of their decisions.            
                                                                                         
  **Content Generation:** Generating assets like images of sprites, evidence and historically accurate + relevant text was a big pain and took majority of the time.                                                                     
                                                                                       
## What We Learned                                                                     
                                                                                         
  - How to craft AI prompts that maintain character consistency across conversations     
  - The importance of "hidden state" in game design—advisors knowing things the player doesn't                                                                               
  - That Roman history is full of fascinating "what if" moments we'd never heard of before                                                                                        
                                                                                         
## What's Next                                                                         
                                                                                         
  - **More civilizations** - French Revolution, Various Kingdoms of India
  - **Enable Movements** - Allow players to immerse in a 2D map like environment where they can move around and explore the era.               
  - **Advisor memory** - Advisors remember past conversations and hold grudges           
  - **Voice acting** - Bring advisors to life with period-appropriate accents

## Installation Instructions
  
  To run frontend:
  1. First install dependencies (ensure you have npm and Node.js installed)
  ```bash
  cd frontend  
  npm install
  ```
  2. Run the frontend: `npm run dev`

  To run backend:
  1. First create the environment
  ```bash
  cd backend

  # On MacOS/Linux
  python3 -m venv .venv

  # On Windows
  python -m venv .venv
  ```
  2. Install dependencies
  ```bash
  # On MacOs/Linux
  source .venv/bin/activate
  # On Windows
  .venv\Scripts\activate.bat

pip install -r requirements.txt
```
3. Run the server (Might fail for now)
```bash
uvicorn main:app --reload --port 8000
```
