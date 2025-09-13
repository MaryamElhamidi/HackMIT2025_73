#!/bin/bash

# Start the Flask backend
echo "Starting Flask backend on port 6767..."
cd /Users/k3vnos/HackMIT2025_73/backend
/Users/k3vnos/HackMIT2025_73/venv/bin/python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start the React frontend
echo "Starting React frontend on port 5174..."
cd /Users/k3vnos/HackMIT2025_73/frontend
npm run dev &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Backend running at: http://localhost:6767"
echo "Frontend running at: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait
