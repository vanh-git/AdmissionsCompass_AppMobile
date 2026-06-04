# 📱 Admissions Compass Mobile App

> A mobile application to help Vietnamese high school students find suitable universities through RIASEC personality testing and community discussions.

## ✨ Features

### 🔐 Authentication
- Email/Password signup and login
- Secure Firebase authentication
- User profile with display name

### 📝 RIASEC Test
- 60 comprehensive questions
- Personality-based career guidance
- Real-time progress tracking
- Detailed results with score distribution
- Career suggestions based on profile
- 6 types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional

### 💬 Community Chat
- Real-time messaging
- Connect with other students
- Share experiences and advice
- Message history stored in Firestore
- User identification with names

### 🎨 User Experience
- Clean, intuitive mobile interface
- Onboarding guide on first login
- Smooth animations and transitions
- Dark & light mode support
- Bottom tab navigation

## 🛠️ Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase (Auth + Firestore)
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **Real-time**: Firestore Realtime Database

## 📦 Installation

### Prerequisites
- Node.js 18+
- Expo CLI
- Firebase account

### Quick Start

1. **Clone and setup**
```bash
cd mobile
npm install
```

2. **Configure Firebase**
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase credentials
   - See [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed instructions

3. **Run the app**
```bash
# Web
npm run web

# iOS
npm run ios

# Android
npm run android
```

## 📁 Project Structure

```
src/
├── app/                    # Entry point & routing
│   ├── index.tsx          # Main app with auth logic
│   └── _layout.tsx        # Theme setup
├── screens/               # Main feature screens
│   ├── LoginScreen.tsx    # Authentication
│   ├── GuideScreen.tsx    # Onboarding tutorial
│   ├── RIASECTestScreen.tsx   # Personality test
│   └── CommunityChatScreen.tsx # Real-time chat
├── components/
│   └── BottomNavigation.tsx    # Tab navigation
├── context/
│   └── AuthContext.tsx    # Firebase auth context
├── lib/
│   └── firebase.ts        # Firebase configuration
└── data/
    ├── riasec-questions.ts    # Quiz questions
    └── riasec-careers.ts      # Career recommendations
```

## 🔄 User Flow

```
1. Login/Signup
    ↓
2. Welcome Guide
    ↓
3. Bottom Navigation (2 tabs)
    ├─→ RIASEC Test
    │   ├─→ Intro
    │   ├─→ 60 Questions (with progress)
    │   └─→ Results with recommendations
    │
    └─→ Community Chat
        ├─→ Message history
        ├─→ Real-time updates
        └─→ Send messages
    ↓
4. Logout
```

## 🎯 Key Screens

### Login Screen
- Email/Password authentication
- Toggle between login and signup
- Firebase integration

### Guide Screen
- 3-step onboarding
- Feature introduction
- Navigation dots

### RIASEC Test Screen
- 60 questions paginated
- Answer options: "Rất đúng", "Khá đúng", "Bình thường", "Không đúng"
- Progress bar
- Result analysis with:
  - Top 2 personality types
  - Score distribution
  - Career recommendations

### Community Chat Screen
- Real-time message loading
- Send messages (authenticated only)
- User identification
- Firestore storage

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules limit data access
- Users can only edit/delete their own messages
- Community messages require authentication

## 🚀 Deployment

### Expo Preview
```bash
npm run web
```

### Build for App Stores
```bash
# Generate build
eas build

# Submit
eas submit
```

See [MOBILE_SETUP.md](./MOBILE_SETUP.md) for detailed deployment guide.

## 📚 Firebase Setup

See [MOBILE_SETUP.md](./MOBILE_SETUP.md) for complete Firebase configuration:
1. Create Firebase project
2. Enable authentication
3. Create Firestore database
4. Add security rules
5. Setup collections

## 🎨 Customization

### Colors
Main color: `#059669` (Emerald Green)

Modify in component `StyleSheet.create()`:
- Replace `#059669` with your brand color
- Update text colors in `RIASEC_LABELS`

### Text
All UI text is in Vietnamese. To translate:
- Modify strings in screen components
- Update guide items in `GuideScreen.tsx`
- Update RIASEC labels in `riasec-questions.ts`

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache
npm run reset-project

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection
- Verify `.env.local` configuration
- Check Firebase project settings
- Ensure Firestore database is created
- Review security rules

### Performance
- Check network connectivity
- Review Firestore indexes
- Monitor API quotas

## 📖 Documentation

- [Firebase Docs](https://firebase.google.com/docs)
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)

## 📝 License

This project is part of the Admissions Compass suite.

## 👥 Contributing

See parent project for contribution guidelines.

## 📞 Support

For issues and questions, refer to the main project repository.

---

**Made with ❤️ for Vietnamese high school students**

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
