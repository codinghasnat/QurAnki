# QurAnki – Learning Mode Implementation Brief

## Objective

Learning Mode provides a **structured, interactive** approach to Quran memorization. Users progressively learn Surahs by mastering individual ayahs before combining them into larger sections. The difficulty dynamically scales based on user input, ensuring an optimal balance between challenge and reinforcement.

---

## User Flow

1. **Surah Selection**

    - User selects a **Surah** and chooses the display format (**Arabic or English Translation**).

2. **Progressive Learning**

    - Each Surah is split into **smaller sections** until individual ayahs are reached.
    - Users **master ayahs** before merging them into larger sections.

3. **Difficulty Scaling**

    - Users **adjust difficulty (0-10) using a slider** to control how many words are blanked.
    - Users **tap blanked words** and select the correct answer from **6 multiple-choice options**.

4. **Adaptive Learning**

    - Difficult words are **repeated more often** until mastered.
    - Users can **request a hint** (word translation shown but earns fewer points).

5. **Completion & Progression**
    - Once an **ayah is mastered at difficulty 10**, the user moves to the next ayah.
    - Completed ayahs are **merged into larger sections** for further testing.
    - Users **track their Surah progress** within the app.

---

## Core Features

### 1. Adjustable Difficulty & Word Blanking

-   **Slider (0-10) to control difficulty:**
    -   **0:** No Arabic words blanked.
    -   **5:** Half of the Arabic words blanked.
    -   **10:** All Arabic words blanked.  
        The words chosen to be blanked are done so randomly.

#### Example (Pretend this is Arabic):

-   **Difficulty 1:**

    -   "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ"

-   **Difficulty 5:**

    -   "**\_** **\_** عَلَيْكُمْ وَرَحْمَةُ**\_\_**"

-   **Difficulty 10:**

    -   "**\_** **\_** **\_** **\_** **\_\_**"

-   Users **tap a blanked word** and select the correct answer from **6 multiple-choice options**.

---

### 2. Adaptive Learning & Assistance

-   **Hint System:**
-   Users can **see the translation** of a blanked word upon request.
-   **Hint usage reduces points earned** if the correct answer is chosen afterward.
-   **Adaptive Algorithm:**
-   Words the user struggles with **stay in the review pool longer** until consistently answered correctly.
-   If they correctly guess the blank word, move on to the next blank word.
-   Once the whole verse is completed, repeat but increment the difficulty by 1.

---

### 3. Progression & Completion

-   Users must **master an ayah at difficulty 10** before moving on.
    -   So effectively, while loop on the same ayah until the user gets it right at difficulty 10.
-   Completed ayahs are **merged into larger sections** and re-tested.
-   Users can **track their Surah completion status** in the app.

---

## Technical Considerations

### Frontend

-   **Framework:** Expo (React Native)
-   **State Management:** Context API / Redux
-   **UI:** Animated components for seamless difficulty transitions

---

This structured approach ensures a **focused** and **incremental** development process. Let me know if adjustments are needed! 🚀
