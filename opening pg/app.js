const form = document.getElementById('generateForm');
const promptInput = document.getElementById('prompt');
const responseOutput = document.getElementById('responseOutput');

const sampleAnswers = [
  'Sure! Here is an AI-generated response that is clear, helpful, and tailored to your request.',
  'Based on your prompt, the AI suggests a concise response with practical examples and a friendly tone.',
  'This answer explains the concept step-by-step and provides a useful summary to help you move forward.',
  'Here is a creative and polished reply crafted from your prompt, ready to use or refine further.'
];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();
  if (!prompt) {
    responseOutput.textContent = 'Please enter a prompt before generating a response.';
    responseOutput.style.color = '#dc2626';
    return;
  }

  responseOutput.style.color = '#0f172a';
  responseOutput.textContent = 'Generating response...';

  setTimeout(() => {
    const answer = sampleAnswers[Math.floor(Math.random() * sampleAnswers.length)];
    responseOutput.textContent = `${answer}\n\nPrompt received:\n${prompt}`;
  }, 600);
});
