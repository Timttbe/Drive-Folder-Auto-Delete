<h1 align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/960px-Google_Drive_logo.png" width="30" style="vertical-align: middle; margin-right: 10px;">
  Google Drive Auto-Delete Script
</h1>

A **Google Apps Script** that automatically removes files from a Google Drive folder after a defined period (default: 7 days).
This project was created to automate file cleanup in Google Drive, avoiding manual deletion of old files.

Deletion can be:
- 🗑️ **Moved to trash** (recoverable)
- ❌ **Permanently deleted** (non-recoverable)

> **How it works:** The script does **not** delete everything in the folder at once. Each file is deleted individually based on its own upload date — for example, with a 7-day window, a file added on January 1st will be deleted on January 8th, while a file added on January 5th will only be deleted on January 12th.

---

## 🚀 Features

- Automatically removes files after X days
- Each file is evaluated individually based on its own creation date
- Can be run manually or on a scheduled trigger
- Supports permanent deletion
- Easy to set up and configure

---

## 🧩 Prerequisites

- A Google account
- Access to the target Google Drive folder
- Edit permission in Google Apps Script

---

## ⚙️ Setup Guide

### 1. Create the script

1. Go to [https://script.google.com/](https://script.google.com/)
2. Click **New project**
3. Paste the code in main.gs

### 2. Get the folder ID

1. Open the folder in Google Drive
2. Copy the URL:
   ```
   https://drive.google.com/drive/folders/YOUR_FOLDER_ID
   ```
3. Extract just the ID:
   ```
   YOUR_FOLDER_ID
   ```
4. Replace it in the code:
   ```javascript
   var folderId = "YOUR_FOLDER_ID";
   ```

### 3. Enable the Google Drive API

**In Apps Script:**
1. Click **Services (+)**
2. Add **Drive API**

**In Google Cloud:**
1. Go to [https://console.cloud.google.com/home/](https://console.cloud.google.com/home/)
2. Navigate to **APIs & Services → Library**
3. Search for **Google Drive API**
4. Click **Enable**

### 4. Run for the first time

1. Select the function `deleteFilesOlderThanSevenDays`
2. Click ▶️ **Run**
3. Grant the requested permissions when prompted

### 5. (Optional) Schedule automatic execution

1. Click the clock icon ⏰ **(Triggers)**
2. Click **Add trigger**
3. Configure:
   - **Function:** `deleteFilesOlderThanSevenDays`
   - **Event source:** Time-driven
   - **Frequency:** Daily

---

## ⚠️ Warning

### Permanent deletion
```javascript
Drive.Files.remove(file.getId());
```
- ❌ Does not go to trash
- ❌ Cannot be recovered

### Move to trash (safer)
```javascript
file.setTrashed(true);
```
- ✅ Can be restored
- 🔒 Still accessible via direct link

---

## 💡 Customization

You can adapt the script to fit your needs:

**Change the number of days:**
```javascript
var daysToKeep = 7;
```

**Filter by file type:**
```javascript
if (file.getName().endsWith(".txt"))
```

**Ignore specific files:**
```javascript
if (file.getName() !== "important.pdf")
```

---

## 📊 Logs

To view execution history:

1. Open your Apps Script project
2. Go to **Executions**
3. Review the generated logs

---

## 🛡️ Recommendations

- Test with logs before enabling permanent deletion
- Avoid using on critical folders without a backup
- Use scheduled triggers with caution

---

## 👨‍💻 Author

Developed by **Davi Han Ko**
