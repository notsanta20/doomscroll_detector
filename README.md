# 🚨 Doomscroll Detector

_A browser extension that politely bullies you into touching grass._

## 🧠 Overview

Doomscroll Detector tracks your scrolling habits on addictive websites and alerts you when you've been doomscrolling for too long.  
It identifies continuous scrolling, long sessions, and “zero-productivity moments,” then sends a **timely roast** to snap you out of it.

## ✨ Features

- ⏱️ **Doomscroll Timer** – tracks time spent on high-distraction sites
- 📜 **Scroll Activity Monitor** – detects endless scrolling patterns
- 🔥 **Roast Notifications** – sends a sarcastic insult when you over-scroll
- 🎛️ **Customizable Threshold** – choose how many minutes count as “too long”
- 🪄 **Lightweight + Privacy Friendly** – no data tracking, no uploads

## 🧩 How It Works

1. Background script monitors active tabs
2. If a tab matches the “doomscroll sites” list → inject scroll listener
3. Track:
   - scroll frequency
   - session duration
4. Compute a **doomscroll score**
5. If score crosses threshold → show roast popup or browser notification
6. Reset score when user hits reset

## 🛠️ Local Installation

1. Download and unzip the project.
2. Open **Google Chrome**
3. Navigate to: `chrome://extensions/`
4. Turn on **Developer mode**
5. Click **Load unpacked**
6. Select the **extracted folder** (not the ZIP file)
7. The extension will appear in your list and activate instantly
