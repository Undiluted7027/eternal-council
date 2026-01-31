
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
pip install -r requirements.txt
```
3. Run the server (Might fail for now)
```bash
uvicorn main:app --reload --port 8000
```