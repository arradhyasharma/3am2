# CYBER // REFLEX ARCADE

A high-tech neural response benchmark tool built with vanilla HTML, CSS, and modern JavaScript. Measure reaction speed across a multi-round test to calculate real-time average speed and assign a performance rank.

---

## Features

* **5-Round Average Mode:** Evaluates overall speed and consistency by calculating your mean reaction time across five sequential rounds.
* **Neural Rank System:** Automatically computes and displays a performance tier based on your 5-round average score:
  * **S-Tier (< 200 ms):** Cyber God
  * **A-Tier (200 - 249 ms):** Neural Synapse
  * **B-Tier (250 - 319 ms):** Human Standard
  * **C-Tier (320 - 449 ms):** Lagging System
  * **D-Tier (450+ ms):** System Failure
* **Visual Progress Tracker:** Displays a 5-step progress indicator showing completed and active rounds.
* **False-Start Penalty:** Instantly aborts and resets the sequence if clicked during the red waiting phase.
* **Persistent Best Score:** Saves your top 5-round average automatically to browser `localStorage`.

---

## Tech Stack

| Technology | Role |
| :--- | :--- |
| **HTML5** | Application architecture and layout components |
| **CSS3** | Dynamic state themes, layout grids, and glowing HUD styling |
| **JavaScript (ES6+)** | Multi-round state management, arithmetic averaging, and DOM updates |

---

## File Structure

```text
├── index.html     # Application layout & round indicators
├── style.css      # Dark mode theme & visual states
└── script.js     # Round engine, scoring, & ranking logic