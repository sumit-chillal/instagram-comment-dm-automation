# 🚀 Instagram Comment-to-DM Automation

A full-stack automation platform that automatically responds to Instagram comments with personalized Direct Messages and public replies using the Instagram Graph API.

Built for creators, businesses, agencies, and marketers who want to increase engagement and automate lead generation directly from Instagram Reels.

---

## ✨ Features

### 🎯 Comment-to-DM Automation

* Detect custom keywords in Instagram comments
* Automatically send personalized DMs
* Automatically reply to comments publicly
* Configure automation per Reel/Post
* Enable or disable automation instantly

### 📊 Automation Dashboard

* View all Instagram Reels in one place
* Configure automation settings visually
* Real-time Reel statistics
* Modern responsive UI
* Mobile-friendly management dashboard

### ⚡ Production Ready

* Instagram Graph API integration
* Secure webhook verification
* Environment-based configuration
* FastAPI backend architecture
* JSON-based configuration storage
* Railway & Vercel deployment support

---

## 🏗️ System Architecture

```text
Instagram Comment
        │
        ▼
Instagram Webhook
        │
        ▼
FastAPI Backend
        │
 ┌──────┴──────┐
 ▼             ▼
Send DM    Reply Comment
        │
        ▼
Instagram User
```

---

## 🛠️ Tech Stack

### Backend

* FastAPI
* Python
* Instagram Graph API
* Requests
* Uvicorn

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Deployment

* Railway (Backend)
* Vercel (Frontend)

---

## 📂 Project Structure

```text
CommentDMAutomation/
│
├── backend/
│   ├── routers/
│   ├── services/
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── app/
│   └── public/
│
└── README.md
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
VERIFY_TOKEN=your_verify_token
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
IG_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id
```

| Variable               | Description                         |
| ---------------------- | ----------------------------------- |
| VERIFY_TOKEN           | Token used for webhook verification |
| INSTAGRAM_ACCESS_TOKEN | Instagram Graph API Access Token    |
| IG_BUSINESS_ACCOUNT_ID | Instagram Business Account ID       |

---

## 🚀 Local Development

### Clone Repository

```bash
git clone https://github.com/your-username/CommentDMAutomation.git
cd CommentDMAutomation
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 🌐 Deployment

### Backend Deployment (Railway)

1. Connect GitHub repository to Railway
2. Select the backend directory
3. Add environment variables
4. Deploy

Required variables:

```env
VERIFY_TOKEN=
INSTAGRAM_ACCESS_TOKEN=
IG_BUSINESS_ACCOUNT_ID=
```

---

### Frontend Deployment (Vercel)

1. Import GitHub repository
2. Configure environment variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

3. Deploy

---

## 🔗 Instagram Webhook Configuration

Configure your webhook in Meta Developer Dashboard.

### Callback URL

```text
https://your-backend-domain.com/webhook
```

### Verify Token

```text
your_verify_token
```

### Subscribe To

```text
comments
```

---

## ⚙️ Automation Workflow

1. User comments on a Reel
2. Instagram sends webhook event
3. Backend receives comment event
4. Keyword is matched
5. Automated DM is sent
6. Public reply is posted
7. User receives instant response

---

## 🎯 Example Configuration

```json
{
  "trigger_keyword": "info",
  "dm_message": "Thanks for your interest! Check your DMs.",
  "comment_reply": "Sent you a DM!",
  "active": true
}
```

---

## 🔒 Security

* Webhook verification support
* Environment-based secrets
* No hardcoded credentials
* Instagram Graph API authentication
* Secure production deployment

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project useful, consider giving it a star.

It helps others discover the project and supports future development.
 
🚀 Built with FastAPI, Next.js, TypeScript, and the Instagram Graph API by Sumit Chillal.

👨‍💻 Built By

Sumit Chillal

Passionate Software Developer focused on Full-Stack Development, AI-powered Applications, Cloud Technologies, and Automation Solutions.
