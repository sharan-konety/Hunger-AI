# 🍱 Hunger – AI-Powered Food Delivery Platform

Hunger is a full-stack food delivery web app powered by OpenAI. Users can browse restaurants, explore menus, manage a real-time cart, simulate order tracking, and get personalized food suggestions via AI.

Built with **Next.js (App Router)**, **Tailwind CSS**, **OpenAI GPT-3.5**, and deployed on **Vercel**.

![Hunger AI Preview](./preview.png)

---

## 🚀 Features

- 🛍️ Browse restaurants with interactive cards
- 📋 View menus, add to cart, and manage orders in real time
- 🤖 Get smart food recommendations via OpenAI
- 🚚 Simulate order tracking with dynamic status updates
- 🌗 Fully responsive design with dark mode
- 🧠 Built with App Router, server components, and AI APIs

---

## 🧰 Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **AI Integration:** OpenAI GPT-3.5 (`/api/recommend`)
- **Deployment:** Vercel
- **State Management:** React Context (for Cart)
- **Animations & Icons:** Heroicons, Framer Motion

---

## ⚙️ Getting Started

```bash
git clone https://github.com/sharan-konety/Hunger-AI.git
cd Hunger-AI
npm install
```

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_key_here
```

Then run locally:

```bash
npm run dev
```

---

## 📁 Project Structure

```
app/
├── restaurants/       → Menu + Listings
├── recommend/         → OpenAI-powered chat
├── order/tracking/    → Order simulation
├── api/recommend/     → GPT-3.5 API route
components/            → UI Components
lib/data.ts            → Mock restaurants/menus
styles/                → Tailwind CSS
```

---

## 🧠 AI Integration

Food recommendations are generated using `gpt-3.5-turbo`. Users can enter prompts like:

- "I'm craving something spicy"
- "Show me protein-heavy options"
- "What should I eat post-workout?"

---

## 🖥️ Live Demo

[➡️ View Demo on Vercel](https://your-vercel-url.vercel.app)

---

## 🙌 Acknowledgments

- [OpenAI](https://openai.com/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
