// Demo data for testing the frontend without backend
export const demoPrompts = [
  {
    prompt: "Explain quantum computing in detail with examples",
    tokens: 12,
    carbon_cost: 0.1,
    roast: "Nice and concise! The planet approves 🌱",
    rewrite: "What is quantum computing?"
  },
  {
    prompt: "Write a comprehensive analysis of the economic implications of climate change on global markets, including detailed case studies from different countries, statistical analysis of market trends, and predictions for the next decade with supporting data and expert opinions",
    tokens: 314,
    carbon_cost: 2.1,
    roast: "Bro, you're choking the planet with that prompt!",
    rewrite: "Explain how convection ovens work"
  },
  {
    prompt: "Create a detailed business plan for a sustainable energy startup including market research, financial projections, competitive analysis, marketing strategy, operational plans, risk assessment, and implementation timeline with specific milestones and budget allocations",
    tokens: 89,
    carbon_cost: 0.6,
    roast: "That's a lot of words for 'make money from green energy'",
    rewrite: "How do I start a green energy business?"
  }
];

export const getRandomDemoData = () => {
  return demoPrompts[Math.floor(Math.random() * demoPrompts.length)];
};
