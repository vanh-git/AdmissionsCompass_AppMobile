# 🎯 Quick Start Guide - Admissions Compass Mobile App

## What Was Created

Your web project has been successfully converted into a mobile app with:

✅ **2 Main Features:**
1. **📝 RIASEC Personality Test** - 60 questions to discover career paths
2. **💬 Community Chat** - Real-time messaging with other students

✅ **Authentication System:**
- Email/Password login & signup
- Firebase secure authentication
- User profiles

✅ **Onboarding Flow:**
1. Login/Signup screen
2. Welcome guide (first time only)
3. Bottom tab navigation between 2 features
4. User can logout from header

---

## 📋 Files Created

```
mobile/src/
├── screens/
│   ├── LoginScreen.tsx          # 🔐 Email/Password auth
│   ├── GuideScreen.tsx          # 🎨 Welcome onboarding
│   ├── RIASECTestScreen.tsx     # 📝 60 question quiz
│   └── CommunityChatScreen.tsx  # 💬 Real-time chat
├── components/
│   └── BottomNavigation.tsx     # 🎛️ Tab navigation
├── context/
│   └── AuthContext.tsx          # 🔑 Auth logic
├── lib/
│   └── firebase.ts              # 🔥 Firebase config
└── data/
    ├── riasec-questions.ts      # 📚 Quiz data
    └── riasec-careers.ts        # 🎯 Career recommendations
```

---

## 🚀 Getting Started (3 Steps)

### Step 1: Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** (Email/Password method)
4. Create **Firestore Database**
5. Copy your project credentials

### Step 2: Configure Environment Variables

In `mobile` folder, create `.env.local`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Need help?** See `.env.local.example` for details

### Step 3: Run the App

```bash
cd mobile
npm install
npm run web          # Start on web
# OR
npm run ios          # Start on iOS simulator
npm run android      # Start on Android emulator
```

---

## 📱 App Flow

```
User opens app
    ↓
🔐 Login/Signup (Email)
    ↓
🎨 Welcome Guide (first time)
    ↓
📱 Main App (Bottom Navigation)
    ├─ Left: 📝 RIASEC Test
    │  ├─ Intro page
    │  ├─ 60 questions
    │  └─ Results + recommendations
    │
    └─ Right: 💬 Community Chat
       ├─ Load messages
       ├─ Type & send
       └─ Real-time updates
    ↓
👤 Logout (via header)
```

---

## 🎨 Screen Details

### 1. Login Screen
- Sign up with email/password/name
- Login with email/password
- Form validation
- Firebase integration

### 2. Guide Screen
- 3 introduction slides
- Each explains a feature
- "Start" button to continue
- Progress dots

### 3. RIASEC Test Screen
- **Intro phase**: Feature explanation, type colors
- **Quiz phase**: 
  - Progress bar (shows %)
  - One question per screen
  - 4 answer options
  - Previous/Next buttons
  - Auto-advance after answer
- **Result phase**:
  - Top 2 personality types
  - Score distribution chart
  - Recommended majors
  - Tips and hints
  - Share/Restart buttons

### 4. Community Chat Screen
- Real-time message loading
- Messages from all users
- Your messages on right (green)
- Others on left (white)
- Time display ("5m ago", "2h ago")
- Message guidelines reminder
- Requires authentication

### 5. Bottom Navigation
- 📝 RIASEC tab
- 💬 Chat tab
- Active tab highlighted in green
- Header shows user name
- Logout button in header

---

## 🔥 Firebase Setup (Detailed)

### Collections Needed

**1. users**
- uid (string)
- email (string)
- displayName (string)
- credits (number, default: 0)
- totalPurchased (number, default: 0)
- createdAt (timestamp)

**2. community_messages**
- text (string)
- author (string)
- userId (string)
- timestamp (timestamp)

### Security Rules

Copy this to Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /community_messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🎨 Customization

### Colors
Main color is **#059669** (Emerald Green)

To change, search in files:
- `LoginScreen.tsx`
- `GuideScreen.tsx`
- `RIASECTestScreen.tsx`
- `CommunityChatScreen.tsx`
- `BottomNavigation.tsx`

Replace `#059669` with your color.

### Text
All text is in Vietnamese. To change language:
1. Update strings in each screen
2. Modify `RIASEC_LABELS` in `riasec-questions.ts`
3. Update guide items in `GuideScreen.tsx`

---

## 🐛 Common Issues

### "Firebase not configured"
- ✅ Check `.env.local` has all values
- ✅ Verify keys match Firebase Console
- ✅ No spaces in values

### "Authentication failed"
- ✅ Enable Email/Password in Firebase Auth
- ✅ Check internet connection
- ✅ Verify Firestore created

### "Messages not loading"
- ✅ Check Firestore security rules
- ✅ Verify user is logged in
- ✅ Check Firestore has data

### "App won't start"
```bash
# Clear cache
npm run reset-project

# Reinstall
rm -rf node_modules
npm install
npm run web
```

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `LoginScreen.tsx` | Email auth UI |
| `GuideScreen.tsx` | Onboarding tutorial |
| `RIASECTestScreen.tsx` | 60-question personality test |
| `CommunityChatScreen.tsx` | Real-time chat |
| `BottomNavigation.tsx` | Tab switching |
| `AuthContext.tsx` | Firebase auth state |
| `firebase.ts` | Firebase initialization |
| `riasec-questions.ts` | Quiz questions & types |
| `riasec-careers.ts` | Career recommendations |

---

## 🚀 Next Steps

1. **Setup Firebase** (Steps above)
2. **Run locally** (`npm run web`)
3. **Test all features**:
   - Create account
   - See guide
   - Take RIASEC test
   - Send chat message
   - Logout
4. **Customize** colors/text as needed
5. **Deploy** to iOS/Android or web

---

## 📖 Helpful Links

- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Detailed setup guide
- [README.md](./README.md) - Full documentation
- [Firebase Docs](https://firebase.google.com/docs)
- [Expo Docs](https://docs.expo.dev/)

---

## 💡 Tips

✨ **For Development:**
- Use browser DevTools when running `npm run web`
- Use Expo Go for quick testing on phone
- Check browser console for errors
- Firestore console shows messages in real-time

✨ **Best Practices:**
- Test on both web and mobile
- Verify auth works before deployment
- Monitor Firestore usage
- Keep `.env.local` secure (never commit)

---

## 📞 Support

If you encounter issues:
1. Check error message in console
2. Review relevant setup section above
3. Check Firebase Console settings
4. Restart the app/CLI

---

**Ready? Start with Firebase setup, then run `npm run web` in the mobile folder!** 🎉
