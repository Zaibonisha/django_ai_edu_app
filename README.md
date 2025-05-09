# 🎓 AI-Powered Learning Companion

An innovative web application that delivers AI-generated educational content, personalized study plans, mental health support, and intelligent tutoring to students of all levels. Built with **Django REST Framework** (backend) and **React** (frontend), and deployed on **Render**.

---

## 🚀 Features

- **User Authentication**  
  Secure registration and JWT-based login.

- **Topic & Resource Management**  
  Browse and manage educational topics and resources (admin side), visible only to authenticated users.

- **AI-Powered Tools**  
  - ✍️ Educational content generation from custom prompts  
  - 📘 AI-curated learning resources  
  - 🗓 4-week study plan generator  
  - 🧠 Mental health tips  
  - 🧾 Flashcard creation  
  - 👩‍🏫 Smart AI tutoring engine

- **Responsive UI**  
  Built with React for an engaging and smooth user experience.

---

## 🛠 Tech Stack

| Layer     | Tech Used                   |
|-----------|-----------------------------|
| Frontend  | React, JavaScript, Tailwind CSS |
| Backend   | Django, Django REST Framework |
| AI        | OpenAI GPT (via API)        |
| Auth      | JWT (SimpleJWT)             |
| Hosting   | Render                      |
| Database  | PostgreSQL (via Render)     |

---

## 📦 Setup Instructions Client
   cd client
   npm install
   npm start

### 🔧 Backend Setup (Django)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver



1. **Clone the repo and navigate to the backend**
   ```bash
   git clone https://github.com/your-username/ai-education-app.git
   cd ai-education-app/backend
