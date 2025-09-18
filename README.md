# 🌱 [Green Roast](https://greenroastfront.vercel.app/) - Carbon Footprint Roaster for AI Prompts

A fun and educational web application that analyzes AI prompts for their carbon footprint and provides humorous feedback along with suggestions for more efficient alternatives.  

[Presentation Link](https://docs.google.com/presentation/d/184PHNW4bmlIh1W3O0RoM1Gxk-vOkOndLDarEW7f9k2s/edit?usp=sharing)

https://youtu.be/lggRMoP_o2g?si=GkA7-PKh60GkqSR-


---

## 🎯 Project Overview  

Green Roast makes carbon-conscious AI usage fun and accessible by:  
- Analyzing prompts for token usage and CO₂ emissions  
- Providing humorous "roasts" based on prompt efficiency  
- Suggesting greener, more efficient alternatives using Claude AI  
- Visualizing carbon footprint data in an engaging way  

Built for the **Infosys Carbon-Conscious Intelligence Challenge**.  

---

## ✨ Features  

- **Token Analysis:** Accurate token counting using `tiktoken`  
- **Carbon Footprint Calculation:** Real CO₂ emission estimates  
- **AI-Powered Roasting:** Funny feedback based on prompt wastefulness  
- **Smart Rewrites:** Claude AI suggests more efficient alternatives  
- **Beautiful UI:** Modern, responsive design with smooth animations  
- **Real-time Analysis:** Instant feedback on prompt efficiency  

---

## 🚀 Quick Start  

### Easiest Way  
No setup required! 🎉  
👉 [Click here to try Green Roast online](https://greenroastfront.vercel.app)  

### For Developers (Optional: Run Locally)  

#### Prerequisites  
- Python 3.8+  
- Node.js 16+  
- Anthropic API key  

#### Backend Setup  
```bash
cd HackMIT2025_73/backend
pip install -r ../requirements.txt

# Create a .env file in the project root
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env

python app.py
