# Network Connection Fix Guide

## Issue Summary
Frontend browser se backend API timeout ho raha tha:
```
Error: timeout of 30000ms exceeded
ECONNABORTED - Network Error
```

---

## Root Cause

**Windows localhost routing issue** - Multiple services port 80 par listen kar rahe hain:
1. Docker (PID 14704) ✅ Correct service
2. wslrelay.exe (PID 16736) ⚠️ Interfering

Browser `localhost` resolve karte waqt wrong service se connect ho raha tha.

---

## ✅ SOLUTION APPLIED

### Fix 1: API URL Changed
**File:** `src/services/api.js`

**Changed:**
```javascript
// OLD
const API_BASE_URL = 'http://localhost/api';

// NEW
const API_BASE_URL = 'http://127.0.0.1/api';
```

**Why:** `127.0.0.1` direct IP address hai - Windows DNS/routing issues bypass kar deta hai.

---

## Testing Results

### Command Line Tests (All Passing ✅):

```bash
# Surahs API
curl http://127.0.0.1/api/surahs?per_page=3
Response: 200 OK
Data: 3 surahs returned
CORS Header: Access-Control-Allow-Origin: *

# Topics API
curl http://127.0.0.1/api/topics
Response: 200 OK
Data: 3 topics returned

# With CORS Origin
curl http://127.0.0.1/api/surahs -H "Origin: http://localhost:5173"
Response: 200 OK
CORS: Properly configured
```

---

## Additional Fixes Applied

### 1. Sample Topics Added
Database mein test topics insert kiye:
- Tawheed (Unity of God)
- Salah (Prayer)
- Zakat (Charity)

```sql
-- Check topics count
SELECT COUNT(*) FROM topics WHERE status='published';
-- Result: 3 topics
```

### 2. Docker Containers Status
```
✅ quran-app-laravel.test-1  Running (Port 80, 5173)
✅ quran-app-mysql-1         Running (Port 3306, healthy)
```

---

## What You Need to Do Now

### Step 1: Restart Frontend Dev Server

**IMPORTANT:** Frontend restart karna MUST hai kyunki API URL change hua hai.

```bash
# Current terminal mein Ctrl+C press karein
# Then restart:
npm run dev
```

### Step 2: Clear Browser Cache

**Option A - Hard Refresh:**
- Chrome/Edge: `Ctrl + Shift + R`
- Firefox: `Ctrl + F5`

**Option B - Clear Cache:**
1. Open DevTools (F12)
2. Right-click on refresh button
3. Select "Empty Cache and Hard Reload"

### Step 3: Test in Browser

Open: http://localhost:5173 (or your frontend port)

**Expected Results:**
- ✅ Surahs should load
- ✅ Topics should show (3 topics)
- ✅ No more timeout errors
- ✅ Data fetches quickly

---

## Troubleshooting

### Issue 1: Still getting timeout?

**Solution A - Check Docker:**
```bash
cd ../quran-app
docker compose ps
# Should show both containers running
```

**Solution B - Test API directly in browser:**
Open in browser: http://127.0.0.1/api/surahs
- Should show JSON response
- If this works but frontend doesn't, restart frontend server

**Solution C - Check Windows Firewall:**
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Docker API" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
```

### Issue 2: CORS errors in browser console?

**Check Headers:**
Open DevTools → Network tab → Check response headers:
- Should have: `Access-Control-Allow-Origin: *`

**If missing:**
```bash
cd ../quran-app
docker compose exec laravel.test php artisan config:clear
docker compose exec laravel.test php artisan config:cache
```

### Issue 3: Empty data / No topics?

**Verify Database:**
```bash
cd ../quran-app
docker compose exec -T mysql mysql -usail -ppassword quran -e "SELECT COUNT(*) FROM surahs; SELECT COUNT(*) FROM topics WHERE status='published';"
```

Expected:
- Surahs: 114
- Topics: 3

**If counts are 0:**
```bash
docker compose exec laravel.test php artisan db:seed --force
```

### Issue 4: Different error now?

**Check Laravel Logs:**
```bash
cd ../quran-app
docker compose logs -f laravel.test
# Press Ctrl+C to exit
```

---

## Alternative Solutions (If above doesn't work)

### Option 1: Use Different Port for Backend

**Edit:** `quran-app/.env`
```env
APP_PORT=8000
```

Then restart:
```bash
docker compose down
docker compose up -d
```

**Update Frontend:** `src/services/api.js`
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Option 2: Disable WSL Relay (Advanced)

If wslrelay.exe is causing issues:

1. Open Task Manager
2. Find "wslrelay.exe"
3. End Task
4. Restart Docker Desktop

---

## Verification Checklist

Before asking for help, verify:

- [ ] Docker containers running (`docker compose ps`)
- [ ] Backend API works in curl/browser directly
- [ ] Frontend dev server restarted after API URL change
- [ ] Browser cache cleared
- [ ] No firewall blocking port 80
- [ ] Using `127.0.0.1` instead of `localhost`

---

## Network Diagram

```
Browser (localhost:5173)
    ↓
Frontend React App
    ↓
API Request to: http://127.0.0.1/api
    ↓
Windows Network Layer
    ↓
Docker Desktop (Port 80)
    ↓
Laravel Container (quran-app-laravel.test-1)
    ↓
MySQL Container (quran-app-mysql-1)
```

---

## Expected API Response Times

| Endpoint | First Request | Subsequent |
|----------|--------------|------------|
| GET /api/surahs | 2-4 seconds | 0.5-1 second |
| GET /api/topics | 1-2 seconds | 0.3-0.5 second |
| POST /api/login | 2-3 seconds | 2-3 seconds (password hash) |

**Note:** First request slow hota hai Docker mein - This is NORMAL!

---

## Common Windows-Specific Issues

### 1. Multiple localhost Services
**Symptom:** Timeout ya wrong response
**Fix:** Use `127.0.0.1` instead of `localhost`

### 2. Windows Defender Firewall
**Symptom:** Connection refused
**Fix:** Add firewall exception for Docker

### 3. WSL2 Networking
**Symptom:** Intermittent connectivity
**Fix:** Restart Docker Desktop

### 4. IIS Conflict
**Symptom:** Wrong service responds
**Fix:** Stop IIS or use different port

---

## Quick Test Commands

Test these in browser console (F12):

```javascript
// Test 1: Surahs
fetch('http://127.0.0.1/api/surahs?per_page=3')
  .then(r => r.json())
  .then(d => console.log('Surahs:', d.data));

// Test 2: Topics
fetch('http://127.0.0.1/api/topics')
  .then(r => r.json())
  .then(d => console.log('Topics:', d.data));

// Test 3: With timeout
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
fetch('http://127.0.0.1/api/surahs', { signal: controller.signal })
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Error:', e));
```

---

## Success Indicators

Your frontend is working if you see:

✅ **Console Logs:**
```
🔍 API Request: {url: "/surahs", method: "get", ...}
✅ API Response: {url: "/surahs", status: 200, ...}
```

✅ **Network Tab:**
- Status: 200 OK
- Response time: < 5 seconds
- Response headers include: `Access-Control-Allow-Origin: *`

✅ **UI:**
- Surahs list loads
- Topics show up
- No error messages
- Data displays correctly

---

## Files Changed

1. ✅ `src/services/api.js` - API URL updated to `127.0.0.1`
2. ✅ Database - 3 sample topics added
3. ✅ Backend already had proper CORS config

---

## Next Steps After Fix Works

1. **Test All Features:**
   - Login/Register
   - Reading Quran
   - Topics loading
   - Progress tracking

2. **Add More Topics:**
   Use the Topics API to create more content

3. **Performance Testing:**
   Monitor response times

4. **Error Handling:**
   Test offline scenarios

---

## Support

If still facing issues:

1. **Check Docker Logs:**
   ```bash
   docker compose logs -f laravel.test
   ```

2. **Check Browser Console:**
   F12 → Console tab → Look for errors

3. **Network Tab:**
   F12 → Network tab → Look for failed requests

4. **Backend Direct Test:**
   Open: http://127.0.0.1/api/surahs in browser

---

**Fix Applied:** 2026-01-11
**Status:** ✅ Complete
**Action Required:** Restart frontend dev server + clear browser cache
