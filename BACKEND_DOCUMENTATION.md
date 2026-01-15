# Backend API Documentation - Quran App

## Overview
Yeh comprehensive documentation hai jo backend ki tamam functionalities ko detail mein explain karti hai.

**Backend Framework:** Laravel 11 (PHP 8.2)
**Database:** MySQL 8.0
**Docker:** Laravel Sail
**API Base URL:** `http://localhost/api`

---

## Database Statistics

| Entity | Count | Status |
|--------|-------|--------|
| Surahs | 114 | ✅ Complete |
| Ayahs | 6,236 | ✅ Complete |
| Juzs | 30 | ✅ Complete |
| Topics | 4 | 🟡 Sample Data |
| Users | 2 | 🟡 Test Data |
| Hizbs | - | ✅ Available |

---

## 1. Authentication APIs

### Base Path: `/api`

#### 1.1 User Registration
**Endpoint:** `POST /register`

**Purpose:** Naye user ko register karna

**Request Body:**
```json
{
  "name": "string (required, max:255)",
  "email": "string (required, email, unique)",
  "password": "string (required, min:8)"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

**File:** `app/Http/Controllers/laravel_example/AuthController.php:13`

---

#### 1.2 User Login
**Endpoint:** `POST /login`

**Purpose:** User ko authenticate karna aur token generate karna

**Request Body:**
```json
{
  "email": "string (required, email)",
  "password": "string (required)",
  "fcm_token": "string (optional)" // For push notifications
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "1|abcd1234...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "fcm_token": "firebase_token_here",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

**Features:**
- Password ko Hash ke saath verify karta hai
- Laravel Sanctum token generate karta hai
- FCM token save karta hai (optional) - notifications ke liye

**File:** `app/Http/Controllers/laravel_example/AuthController.php:34`

---

#### 1.3 User Logout
**Endpoint:** `POST /logout`

**Purpose:** User ko logout karna aur tokens delete karna

**Headers Required:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

**File:** `app/Http/Controllers/laravel_example/AuthController.php:66`

---

## 2. Surah (Chapter) APIs

### Base Path: `/api/surahs`

#### 2.1 Get All Surahs
**Endpoint:** `GET /surahs`

**Purpose:** Tamam Surahs ki list retrieve karna with pagination

**Query Parameters:**
- `per_page` - Items per page (default: 30)
- `page` - Page number
- `filter[name_ar]` - Arabic name se filter
- `filter[revelation_type]` - Meccan/Medinan se filter
- `include` - Relationships load karne ke liye (e.g., `ayahs`)
- `sort` - Sorting (default: `number`, available: `number`, `name_ar`, `created_at`)

**Response (200):**
```json
{
  "data": [
    {
      "number": 1,
      "name": "سُورَةُ ٱلْفَاتِحَةِ",
      "english_name": "Al-Faatiha",
      "english_name_translation": "The Opening",
      "number_of_ayahs": 7,
      "revelation_type": "Meccan",
      "ayahs": [] // Only if include=ayahs
    }
  ],
  "links": {
    "first": "http://localhost/api/surahs?page=1",
    "last": "http://localhost/api/surahs?page=4",
    "prev": null,
    "next": "http://localhost/api/surahs?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "per_page": 30,
    "to": 30,
    "total": 114
  }
}
```

**File:** `app/Http/Controllers/laravel_example/SurahController.php:22`

---

#### 2.2 Get Single Surah
**Endpoint:** `GET /surahs/{id}`

**Purpose:** Specific surah ki details with ayahs

**Response (200):**
```json
{
  "number": 1,
  "name": "سُورَةُ ٱلْفَاتِحَةِ",
  "english_name": "Al-Faatiha",
  "english_name_translation": "The Opening",
  "number_of_ayahs": 7,
  "revelation_type": "Meccan",
  "ayahs": [
    {
      "ayah_number": 1,
      "surah_number": 1,
      "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
      "number_in_surah": 1,
      "juz": 1,
      "page": 1
    }
  ]
}
```

**File:** `app/Http/Controllers/laravel_example/SurahController.php:68`

---

## 3. Ayah (Verse) APIs

### Base Path: `/api/ayahs`

#### 3.1 Get All Ayahs
**Endpoint:** `GET /ayahs`

**Purpose:** Ayahs retrieve karna with filtering

**Query Parameters:**
- `per_page` - Items per page (default: 30)
- `filter[surah_number]` - Surah ke ayahs filter karna
- `filter[juz]` - Juz ke ayahs filter karna
- `filter[hizb_quarter]` - Hizb quarter se filter
- `include` - Include relationships (e.g., `surah`)
- `sort` - Sorting (default: `ayah_number`)

**Response (200):**
```json
{
  "data": [
    {
      "ayah_number": 1,
      "surah_number": 1,
      "text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
      "english_text": "In the name of Allah, the Beneficent, the Merciful",
      "urdu_text": "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
      "number_in_surah": 1,
      "juz": 1,
      "manzil": 1,
      "page": 1,
      "ruku": 1,
      "hizb_quarter": 1,
      "sajda": false
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 30,
    "total": 6236
  }
}
```

**File:** `app/Http/Controllers/laravel_example/AyahController.php:23`

---

#### 3.2 Get Single Ayah
**Endpoint:** `GET /ayahs/{id}`

**Purpose:** Specific ayah ki details

**File:** `app/Http/Controllers/laravel_example/AyahController.php:70`

---

## 4. Juz APIs

### Base Path: `/api/juzs`

#### 4.1 Get All Juzs
**Endpoint:** `GET /juzs`

**Purpose:** Tamam 30 Juzs ki list

**Query Parameters:**
- `per_page` - Items per page (default: 30)
- `filter[name]` - Name se filter
- `sort` - Sorting options

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "juz_number": 1,
      "name": "الم",
      "created_at": "2024-01-01T00:00:00.000000Z"
    }
  ],
  "meta": {
    "total": 30
  }
}
```

**File:** `app/Http/Controllers/laravel_example/JuzController.php:23`

---

## 5. Topics APIs (Quran Bil Aunwan Feature)

### Base Path: `/api/topics`

#### 5.1 Get All Published Topics
**Endpoint:** `GET /topics`

**Purpose:** Published topics retrieve karna with ayahs aur hadiths

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "توحید",
    "alternative_name": "Tawheed",
    "description": "Topic description here",
    "ayahs": [
      {
        "id": 1,
        "surah_id": 1,
        "ayah_text": "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ",
        "ayah_english_text": "In the name of Allah...",
        "ayah_urdu_text": "شروع اللہ کے نام سے...",
        "description": "Ayah explanation"
      }
    ],
    "hadiths": [
      {
        "id": 1,
        "text_arabic": "Arabic hadith text",
        "text_urdu": "Urdu translation",
        "text_english": "English translation",
        "description": "Hadith explanation"
      }
    ]
  }
]
```

**Features:**
- Sirf published topics return karta hai
- Ayahs aur Hadiths ke saath complete data

**File:** `app/Http/Controllers/form_validation/Validation.php:23`

---

#### 5.2 Create New Topic
**Endpoint:** `POST /topics`

**Purpose:** Naya topic create karna with ayahs aur hadiths

**Request Body:**
```json
{
  "name": "string (required, max:255)",
  "alternative_name": "string (optional, max:255)",
  "description": "string (required)",
  "status": "draft|published (required)",
  "ayahs": [
    {
      "ayah_id": 1,
      "description": "Explanation of why this ayah is included"
    }
  ],
  "hadiths": [
    {
      "hadith_text_arabic": "string (required)",
      "hadith_text_urdu": "string (optional)",
      "hadith_text_english": "string (optional)",
      "description": "string (optional)"
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Topic created successfully",
  "topic": {
    "id": 5,
    "name": "توحید",
    "alternative_name": "Tawheed",
    "description": "...",
    "ayahs": [...],
    "hadiths": [...]
  }
}
```

**File:** `app/Http/Controllers/form_validation/Validation.php:62`

---

#### 5.3 Delete Topic
**Endpoint:** `DELETE /topics/{topic}`

**Purpose:** Topic delete karna

**Response (200):**
```json
{
  "success": true
}
```

**File:** `app/Http/Controllers/form_validation/Validation.php:46`

---

#### 5.4 Set Topic of the Day
**Endpoint:** `POST /topics/set-topic-of-the-day/{id}`

**Purpose:** Topic ko "Topic of the Day" set karna

**Features:**
- Pehle wali topic of the day ko unset kar deta hai
- Nayi topic ko set karta hai

**Response (200):**
```json
{
  "success": true
}
```

**File:** `app/Http/Controllers/form_validation/Validation.php:52`

---

#### 5.5 Get Topic of the Day by ID
**Endpoint:** `GET /topics-of-the-day/{topic_id}`

**Purpose:** Specific topic retrieve karna (published only)

**Response (200):**
```json
{
  "success": true,
  "topic": {
    "id": 1,
    "name": "توحید",
    "alternative_name": "Tawheed",
    "description": "...",
    "ayahs": [...],
    "hadiths": [...]
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Topic not found or not published."
}
```

**File:** `app/Http/Controllers/form_validation/Validation.php:27`

---

## 6. Topic Progress APIs

### Base Path: `/api/topic-progress`

#### 6.1 Save User Progress
**Endpoint:** `POST /topic-progress`

**Purpose:** User ki topic reading progress save karna

**Request Body:**
```json
{
  "user_id": 1,
  "topics": [
    {
      "topic_id": 1,
      "progress": 50
    },
    {
      "topic_id": 2,
      "progress": 100
    }
  ]
}
```

**Validation:**
- `user_id` - required, must exist in users table
- `topics` - required array
- `topic_id` - required, must exist in topics table
- `progress` - required, integer, 0-100

**Response (200):**
```json
{
  "message": "Progress saved successfully."
}
```

**File:** `app/Http/Controllers/laravel_example/TopicProgressController.php:11`

---

#### 6.2 Get User Progress
**Endpoint:** `GET /topic-progress/{user_id}`

**Purpose:** User ki tamam topics ki progress retrieve karna

**Response (200):**
```json
{
  "user_id": 1,
  "progress": [
    {
      "topic_id": 1,
      "topic_title": "توحید",
      "progress": 50
    },
    {
      "topic_id": 2,
      "topic_title": "نماز",
      "progress": 100
    }
  ]
}
```

**File:** `app/Http/Controllers/laravel_example/TopicProgressController.php:35`

---

## 7. Database Schema

### Main Tables

#### 7.1 users
```
- id (primary key)
- name (string)
- email (string, unique)
- password (hashed)
- fcm_token (nullable) - For push notifications
- created_at
- updated_at
```

#### 7.2 surahs
```
- id (primary key)
- number (integer, unique) - 1 to 114
- name (string) - Arabic name
- english_name (string)
- english_name_translation (string)
- number_of_ayahs (integer)
- revelation_type (string) - Meccan/Medinan
- created_at
- updated_at
```

#### 7.3 ayahs
```
- id (primary key)
- ayah_number (integer) - Global ayah number
- surah_number (foreign key -> surahs)
- text (text) - Arabic text
- english_text (text) - English translation
- urdu_text (text) - Urdu translation
- number_in_surah (integer)
- juz (integer)
- manzil (integer)
- page (integer)
- ruku (integer)
- hizb_quarter (integer)
- sajda (boolean)
- created_at
- updated_at
```

#### 7.4 juzs
```
- id (primary key)
- juz_number (integer)
- name (string)
- created_at
- updated_at
```

#### 7.5 topics
```
- id (primary key)
- name (string) - Main topic name
- alternative_name (string) - Secondary name/translation
- description (text)
- ayah_count (integer)
- hadith_count (integer)
- status (enum: draft, published)
- topic_of_the_day (boolean)
- created_at
- updated_at
```

#### 7.6 topic_ayahs
```
- id (primary key)
- topic_id (foreign key -> topics)
- ayah_id (foreign key -> ayahs)
- description (text) - Why this ayah is relevant
- created_at
- updated_at
```

#### 7.7 topic_hadiths
```
- id (primary key)
- topic_id (foreign key -> topics)
- hadith_text_arabic (text)
- hadith_text_urdu (text, nullable)
- hadith_text_english (text, nullable)
- description (text, nullable)
- created_at
- updated_at
```

#### 7.8 topic_user_progress
```
- id (primary key)
- user_id (foreign key -> users)
- topic_id (foreign key -> topics)
- progress (integer, 0-100)
- created_at
- updated_at
```

#### 7.9 personal_access_tokens (Laravel Sanctum)
```
- id (primary key)
- tokenable_type
- tokenable_id
- name
- token (hashed)
- abilities
- last_used_at
- expires_at
- created_at
- updated_at
```

---

## 8. Models & Relationships

### 8.1 Surah Model
**File:** `app/Models/Surah.php`

**Relationships:**
- `hasMany(Ayah)` - Ek surah mein multiple ayahs

### 8.2 Ayah Model
**File:** `app/Models/Ayah.php`

**Relationships:**
- `belongsTo(Surah)` - Ayah belongs to one surah
- `belongsTo(Juz)` - Ayah belongs to one juz
- `belongsTo(Hizb)` - Ayah belongs to one hizb

**Features:**
- Laravel Scout search enabled

### 8.3 Topic Model
**File:** `app/Models/Topic.php`

**Relationships:**
- `hasMany(TopicAyah)` - Topic mein multiple ayahs
- `hasMany(TopicHadith)` - Topic mein multiple hadiths

### 8.4 TopicUserProgress Model
**File:** `app/Models/TopicUserProgress.php`

**Relationships:**
- `belongsTo(User)`
- `belongsTo(Topic)`

---

## 9. What's COMPLETE ✅

### Fully Implemented Features:

1. **Authentication System**
   - Registration with validation
   - Login with Sanctum tokens
   - Logout functionality
   - FCM token support for notifications

2. **Quran Data Management**
   - All 114 Surahs loaded
   - All 6,236 Ayahs loaded
   - All 30 Juzs loaded
   - Arabic, English, Urdu translations available
   - Surah/Ayah filtering & pagination
   - Advanced query builder with Spatie package

3. **Topics System (Quran Bil Aunwan)**
   - Create topics with ayahs & hadiths
   - Publish/Draft system
   - Topic of the Day feature
   - Delete topics
   - Get topics with relationships

4. **Progress Tracking**
   - Save user reading progress (0-100%)
   - Retrieve user progress
   - Per-topic progress tracking

5. **Database Schema**
   - All migrations created
   - Proper relationships defined
   - Indexes on key columns

---

## 10. What's MISSING / TODO 🚧

### Backend Features to Implement:

#### 10.1 High Priority

1. **User Profile Management**
   - Update profile API
   - Change password API
   - Profile picture upload
   - **Status:** ❌ Not Implemented

2. **Bookmark System**
   - Bookmark ayahs
   - Bookmark topics
   - Get user bookmarks
   - Delete bookmarks
   - **Status:** ❌ Not Implemented

3. **Search Functionality**
   - Full-text search in Quran (Arabic/English/Urdu)
   - Search in topics
   - Search suggestions
   - **Status:** ⚠️ Partially implemented (Scout enabled but not tested)

4. **Reading History**
   - Track which surahs/ayahs user read
   - Last read position
   - Reading statistics
   - **Status:** ❌ Not Implemented

5. **Favorites System**
   - Favorite surahs
   - Favorite topics
   - Get favorites list
   - **Status:** ❌ Not Implemented

#### 10.2 Medium Priority

6. **Notifications System**
   - Daily reminders
   - Topic of the Day notifications
   - Push notifications via FCM
   - **Status:** ⚠️ FCM token saved but notifications not implemented

7. **Topic Management Enhancements**
   - Update existing topics
   - Bulk operations
   - Topic categories/tags
   - **Status:** ⚠️ Create/Delete done, Update missing

8. **Audio Integration**
   - Ayah recitation audio URLs
   - Multiple reciters support
   - Audio playback tracking
   - **Status:** ❌ Not Implemented (audio column exists but empty)

9. **Analytics & Stats**
   - User reading statistics
   - Most read topics
   - Daily reading streaks
   - **Status:** ❌ Not Implemented

10. **Admin Panel APIs**
    - User management
    - Content moderation
    - System statistics
    - **Status:** ❌ Not Implemented

#### 10.3 Low Priority

11. **Social Features**
    - Share verses
    - Share topics
    - Notes on ayahs/topics
    - **Status:** ❌ Not Implemented

12. **Advanced Filtering**
    - Filter by revelation place
    - Filter by topic categories
    - Filter by progress status
    - **Status:** ⚠️ Basic filtering exists

13. **Tafseer Integration**
    - Tafseer data for ayahs
    - Multiple tafseer options
    - **Status:** ❌ Not Implemented

14. **Export Features**
    - Export bookmarks
    - Export reading history
    - PDF generation
    - **Status:** ❌ Not Implemented

15. **Rate Limiting & Security**
    - API rate limiting
    - Email verification
    - Password reset
    - 2FA authentication
    - **Status:** ⚠️ Basic auth done, advanced security missing

---

## 11. API Response Codes

### Success Codes
- `200` - OK (GET, PUT, PATCH requests)
- `201` - Created (POST requests)
- `204` - No Content (DELETE requests)

### Error Codes
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (No permission)
- `404` - Not Found (Resource doesn't exist)
- `422` - Unprocessable Entity (Validation failed)
- `500` - Internal Server Error

---

## 12. Authentication Flow

### How to Use APIs:

1. **Register:** `POST /api/register`
2. **Login:** `POST /api/login` - Save the `access_token`
3. **Use Protected APIs:** Add header:
   ```
   Authorization: Bearer {access_token}
   ```
4. **Logout:** `POST /api/logout` with token

### Note:
Currently, most APIs are **PUBLIC** (line 17 in routes/api.php is commented).
Protected routes should be inside `auth:sanctum` middleware.

---

## 13. Performance Optimizations Done

1. ✅ Production mode enabled (`APP_ENV=production`)
2. ✅ Debug mode disabled (`APP_DEBUG=false`)
3. ✅ Config cached
4. ✅ Routes cached
5. ✅ Views cached
6. ✅ OPcache enabled
7. ✅ Query builder optimized with Spatie package
8. ✅ Pagination on all list endpoints

---

## 14. Docker Commands

### Useful Commands:

```bash
# Start containers
docker compose up -d

# Stop containers
docker compose down

# Run migrations
docker compose exec laravel.test php artisan migrate

# Seed database
docker compose exec laravel.test php artisan db:seed

# Clear cache
docker compose exec laravel.test php artisan cache:clear

# Rebuild cache
docker compose exec laravel.test php artisan optimize

# View logs
docker compose logs -f laravel.test

# Access MySQL
docker compose exec mysql mysql -usail -ppassword quran
```

---

## 15. Testing APIs

### Recommended Tools:
1. **Postman** - API testing
2. **Thunder Client** (VS Code Extension)
3. **cURL** - Command line testing

### Example cURL:
```bash
# Get all surahs
curl http://localhost/api/surahs

# Login
curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# Get topics with token
curl http://localhost/api/topics \
  -H "Authorization: Bearer {your_token}"
```

---

## 16. Summary

### Overall Backend Completion: ~60%

**Completed (60%):**
- ✅ Core Quran data structure (Surahs, Ayahs, Juzs)
- ✅ Basic authentication
- ✅ Topics system (Quran Bil Aunwan)
- ✅ Progress tracking
- ✅ Database schema

**Pending (40%):**
- ❌ User management features
- ❌ Bookmarks & Favorites
- ❌ Advanced search
- ❌ Notifications
- ❌ Audio integration
- ❌ Analytics
- ❌ Admin panel

### Next Steps Priority:
1. Implement Bookmark system
2. Complete Search functionality
3. Add Reading History
4. Setup Push Notifications
5. Add User Profile Management

---

## Support & Contact

For issues aur questions:
- Check Laravel logs: `storage/logs/laravel.log`
- Check Docker logs: `docker compose logs`
- Database issues: Check migrations aur seeders

---

**Documentation Generated:** 2026-01-10
**Backend Version:** Laravel 11
**Database:** MySQL 8.0
**Last Updated By:** Claude Code
