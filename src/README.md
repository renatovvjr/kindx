🌍 KindX
<p align="center"> <img src="assets/logo.png" width="180" /> </p> <p align="center"> <strong>Connecting people who need help with people willing to help nearby.</strong> </p>
📱 About the Project

KindX is a community-driven mobile application focused on social impact, local collaboration, and real-time help requests.

The platform allows users to:

Request help
Offer help
Discover nearby community needs
Explore requests and offers through an interactive map

Built with React Native, Expo, and Supabase, the project combines geolocation, modern UI/UX principles, and scalable architecture to create a digital chain of kindness.

🚀 Main Technologies
React Native (Expo)
TypeScript
React Navigation (Stack + Tabs)
Supabase (Auth + PostgreSQL + RLS)
React Native Maps
🧱 Architecture
src/
  screens/
  components/
  lib/
  context/
  hooks/
  theme/
  assets/

docs/
Structure Highlights
Organized UI by screens and reusable components
lib/supabase.ts centralizes backend connection
UserContext prepared for future authentication flow
Documentation-first approach using /docs
🔐 Database (Supabase)
Main Tables
requests
field	type
id	uuid
title	text
description	text
category	text
location	text
latitude	float
longitude	float
created_at	timestamp
offers
field	type
id	uuid
type	text
description	text
location	text
latitude	float
longitude	float
created_at	timestamp
Security
Row Level Security (RLS) configured
Secure Supabase environment variables
Backend prepared for authentication expansion
🗺️ Interactive Map

The map experience includes:

Dynamic pins for requests and offers
Focused map mode
Floating preview card on pin selection
Navigation to detailed screens
Smooth camera animation
Future route integration support

Inspired by modern marketplace and booking applications.

✨ Current Features

✅ Community feed
✅ Help requests and offers
✅ Interactive map with geolocation
✅ Detailed item pages
✅ Floating action menu
✅ Request/offer filtering
✅ Pull-to-refresh support
✅ Real-time backend with Supabase
✅ Mobile-first responsive design
✅ Modular architecture
✅ Technical documentation

📄 Documentation

Inside /docs:

CHANGELOG.md → complete project history
DECISIONS.md → architectural and UX decisions
ROADMAP.md → future planning
README.md → project overview
🧭 Roadmap
Planned Features
Google / Apple Login
User profile system
Real-time messaging
Reputation and badges
Gamification system
Advanced map filters
Push notifications
Route integration with Google Maps / Apple Maps
AI-powered help suggestions
Community moderation tools
🚀 Getting Started
Clone repository
git clone https://github.com/renatovvjr/kindx.git
Install dependencies
npm install
Configure environment variables

Create a .env file:

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the project
npx expo start -c
🎯 Vision

KindX aims to become a modern social impact platform where technology strengthens human connection, local collaboration, and mutual support.

The long-term vision is to create a scalable ecosystem capable of connecting communities worldwide through acts of kindness and practical assistance.

👨‍💻 Creator
Renato Valle

Product & Business Analyst focused on user-centered digital solutions.

Information Systems Graduate
Economics & Finance Background
UX-focused technology enthusiast
Based in Sydney, Australia
📬 Contact
GitHub

https://github.com/renatovvjr

LinkedIn

https://www.linkedin.com/in/renato-valle-8455b23a/

Email

renatovvjr@gmail.com

📄 License

This project is currently under development and intended for portfolio and educational purposes.

⭐ Support

If you like this project, consider giving it a star on GitHub.