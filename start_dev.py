#!/usr/bin/env python3
"""
Development startup script for Green Roast
Starts both backend and frontend servers
"""

import subprocess
import sys
import os
import time
import threading
from pathlib import Path

def run_backend():
    """Start the Flask backend server"""
    backend_dir = Path(__file__).parent / "backend"
    os.chdir(backend_dir)
    
    print("🌱 Starting Green Roast Backend...")
    print("📍 Backend will run on http://localhost:5000")
    
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend stopped")
    except Exception as e:
        print(f"❌ Backend error: {e}")

def run_frontend():
    """Start the React frontend server"""
    frontend_dir = Path(__file__).parent / "frontend"
    os.chdir(frontend_dir)
    
    print("⚛️  Starting Green Roast Frontend...")
    print("📍 Frontend will run on http://localhost:5173")
    
    try:
        subprocess.run(["npm", "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend stopped")
    except Exception as e:
        print(f"❌ Frontend error: {e}")

def check_requirements():
    """Check if required tools are installed"""
    print("🔍 Checking requirements...")
    
    # Check Python
    try:
        subprocess.run([sys.executable, "--version"], check=True, capture_output=True)
        print("✅ Python found")
    except:
        print("❌ Python not found")
        return False
    
    # Check Node.js
    try:
        subprocess.run(["node", "--version"], check=True, capture_output=True)
        print("✅ Node.js found")
    except:
        print("❌ Node.js not found")
        return False
    
    # Check npm
    try:
        subprocess.run(["npm", "--version"], check=True, capture_output=True)
        print("✅ npm found")
    except:
        print("❌ npm not found")
        return False
    
    return True

def main():
    """Main startup function"""
    print("🌱 Green Roast - Carbon Footprint Roaster for AI Prompts")
    print("=" * 60)
    
    if not check_requirements():
        print("\n❌ Missing requirements. Please install Python, Node.js, and npm")
        sys.exit(1)
    
    print("\n🚀 Starting development servers...")
    print("Press Ctrl+C to stop both servers\n")
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=run_backend, daemon=True)
    backend_thread.start()
    
    # Give backend time to start
    time.sleep(2)
    
    # Start frontend in main thread
    try:
        run_frontend()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down...")
        sys.exit(0)

if __name__ == "__main__":
    main()
