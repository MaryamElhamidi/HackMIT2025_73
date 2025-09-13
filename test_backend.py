#!/usr/bin/env python3
"""
Simple test script for Green Roast backend
Tests the API without requiring Claude API key
"""

import requests
import json
import time

def test_backend():
    """Test the backend API endpoints"""
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Green Roast Backend...")
    print("=" * 40)
    
    # Test health endpoint
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on port 5000")
        return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False
    
    # Test analyze endpoint with a simple prompt
    print("\n2. Testing analyze endpoint...")
    test_prompt = "Hello, can you help me write a short email?"
    
    try:
        response = requests.post(
            f"{base_url}/analyze",
            json={"prompt": test_prompt},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Analysis successful")
            print(f"   Tokens: {data.get('tokens', 'N/A')}")
            print(f"   Carbon: {data.get('carbon', 'N/A')}g CO₂")
            print(f"   Roast Level: {data.get('roast_level', 'N/A')}")
            print(f"   Roast: {data.get('roast', 'N/A')[:100]}...")
        else:
            print(f"❌ Analysis failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Analysis error: {e}")
        return False
    
    # Test with a longer, more wasteful prompt
    print("\n3. Testing with wasteful prompt...")
    wasteful_prompt = "Hello there, I hope you're having a wonderful day! I was wondering if you could please kindly help me write a very detailed and comprehensive email to my boss about the project status update that I need to send tomorrow morning. I would really appreciate it if you could make it sound professional and include all the important details about our progress so far. Thank you so much for your help!"
    
    try:
        response = requests.post(
            f"{base_url}/analyze",
            json={"prompt": wasteful_prompt},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Wasteful prompt analysis successful")
            print(f"   Tokens: {data.get('tokens', 'N/A')}")
            print(f"   Carbon: {data.get('carbon', 'N/A')}g CO₂")
            print(f"   Roast Level: {data.get('roast_level', 'N/A')}")
            print(f"   Token Savings: {data.get('token_savings', 'N/A')}")
            print(f"   Carbon Savings: {data.get('carbon_savings', 'N/A')}g CO₂")
        else:
            print(f"❌ Wasteful prompt analysis failed: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Wasteful prompt analysis error: {e}")
        return False
    
    print("\n🎉 All tests passed! Backend is working correctly.")
    return True

if __name__ == "__main__":
    print("Make sure the backend is running before running this test!")
    print("Run: python backend/app.py")
    print()
    
    input("Press Enter when backend is ready...")
    test_backend()
