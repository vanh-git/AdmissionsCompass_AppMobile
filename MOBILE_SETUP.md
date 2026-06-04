# Mobile App Environment Setup

## Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android) or Xcode (for iOS)
- Firebase account

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Copy your Firebase config

## Step 2: Setup Environment Variables

Create a `.env.local` file in the mobile folder:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 3: Create Firestore Collections

Create these collections in your Firestore database:

### 1. `users` collection
Fields:
- uid (string)
- email (string)
- displayName (string)
- credits (number)
- totalPurchased (number)
- createdAt (timestamp)

### 2. `community_messages` collection
Fields:
- text (string)
- author (string)
- userId (string)
- timestamp (timestamp)

## Step 4: Setup Firestore Security Rules

Copy these security rules to your Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Community messages - everyone authenticated can read/write
    match /community_messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                       request.resource.data.userId == request.auth.uid &&
                       request.resource.data.timestamp != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 5: Install Dependencies

```bash
cd mobile
npm install
```

## Step 6: Run the App

### For Web
```bash
npm run web
```

### For iOS
```bash
npm run ios
```

### For Android
```bash
npm run android
```

## Project Structure

```
mobile/
├── src/
│   ├── app/              # App entry point & routing
│   ├── screens/          # Main screens
│   │   ├── LoginScreen.tsx
│   │   ├── GuideScreen.tsx
│   │   ├── RIASECTestScreen.tsx
│   │   └── CommunityChatScreen.tsx
│   ├── components/       # Reusable components
│   │   └── BottomNavigation.tsx
│   ├── context/          # Auth context
│   │   └── AuthContext.tsx
│   ├── lib/              # Firebase setup
│   │   └── firebase.ts
│   └── data/             # RIASEC quiz data
│       ├── riasec-questions.ts
│       └── riasec-careers.ts
└── package.json
```

## Features

✅ **Authentication**
- Email/Password signup and login
- Firebase authentication
- User profile management

✅ **RIASEC Quiz**
- 60-question personality test
- Real-time progress tracking
- Detailed result analysis
- Career suggestions

✅ **Community Chat**
- Real-time messaging
- Firestore integration
- User profiles
- Message history

## Troubleshooting

### Firebase Connection Issues
- Check .env.local variables are correct
- Verify Firestore is enabled in Firebase Console
- Check security rules allow your operations

### Authentication Issues
- Ensure Email/Password auth is enabled in Firebase
- Check user permissions in Firestore

### Performance Issues
- Enable Firestore indexes if needed
- Check network connectivity

## Next Steps

1. Test all three features: Login → Guide → RIASEC Quiz → Community Chat
2. Customize colors/branding as needed (look for #059669 green color)
3. Deploy to Expo or build for app stores
