/* Copyright (c) 2026 Enid A. Gaddis. 
   All Rights Reserved. 
*/

const practiceMenu = [
  { 
    category: "Silence In Motion",
    name: "Meal in Silence", 
    verse: "Acts 2:46", 
    verseText: "And they, continuing daily with one accord... did eat their meat with gladness and singleness of heart.",
    desc: "Gratitude & Presence.", 
    guide: "Invite God into your nourishment. Use the quiet of a meal to acknowledge His provision and listen for His presence in the ordinary." 
  },
  { 
    category: "Silence In Motion",
    name: "Clean in Silence", 
    verse: "Colossians 3:23", 
    verseText: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
    desc: "Sacred Service.", 
    guide: "In the mundane tasks of cleaning or chores, find a sacred quiet. Listen for God in the middle of your daily acts of service." 
  },
  { 
    category: "Silence In Motion",
    name: "Walk in Silence", 
    verse: "Psalm 119:105", 
    verseText: "Thy word is a lamp unto my feet, and a light unto my path.",
    desc: "Divine Direction.", 
    guide: "As you move, let your steps be a prayer. Listen for Him to light your path and direct your pace for the journey ahead." 
  },
  { 
    category: "Silence In Transition",
    name: "Waking Silence", 
    verse: "Psalm 5:3", 
    verseText: "My voice shalt thou hear in the morning, O Lord; in the morning will I direct my prayer unto thee, and will look up.",
    desc: "First fruits of the day.", 
    guide: "Before the world speaks to you, listen for God's voice. Dedicate your first waking moments to hearing His direction for your day." 
  },
  { 
    category: "Silence In Transition",
    name: "Engagement Silence", 
    verse: "Proverbs 1:5", 
    verseText: "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels.",
    desc: "Prep & Reflection.", 
    guide: "Before or after a meeting, conversation, or task, be still. Listen for God's wisdom to increase your understanding before you act." 
  },
  { 
    category: "Silence In Transition",
    name: "Bridge Silence", 
    verse: "Isaiah 30:15", 
    verseText: "In returning and rest shall ye be saved; in quietness and in confidence shall be your strength.",
    desc: "Strength in the gaps.", 
    guide: "In the spaces between your busy moments, stop. Use the silence to shift your focus from your tasks back to His peace." 
  },
  { 
    category: "Deep Silence",
    name: "Worship in Silence", 
    verse: "Psalm 95:6", 
    verseText: "O come, let us worship and bow down: let us kneel before the Lord maker.",
    desc: "Adoration & Awe.", 
    guide: "Beyond songs and words, practice the simple act of listening to His glory. Offer your heart in silent awe of His majesty." 
  },
  { 
    category: "Deep Silence",
    name: "Intercessory Silence", 
    verse: "Romans 8:26", 
    verseText: "The Spirit itself maketh intercession for us with groanings which cannot be uttered.",
    desc: "Standing in the gap.", 
    guide: "Hold others before God without words. When you run out of things to say, listen as the Holy Spirit continues the prayer for them." 
  },
  { 
    category: "Deep Silence",
    name: "Nature Silence", 
    verse: "Psalm 19:1", 
    verseText: "The heavens declare the glory of God; and the firmament sheweth his handywork.",
    guide: "Find a quiet spot outdoors or, if you're unable to go outside, find a window with a view of the sky or trees. In the stillness of creation, listen for the Creator’s whisper and observe His handiwork." 
  },
  { 
    category: "Deep Silence",
    name: "Devotional Silence", 
    verse: "1 Samuel 3:10", 
    verseText: "Speak, Lord; for thy servant heareth.",
    desc: "Ready to Hear.", 
    guide: "Before opening the Word, sit in stillness. Adopt the posture of a servant ready for instruction and wait for Him to speak to your heart." 
  }
];

const categoryInfo = {
    "Silence In Motion": "Listening for God’s whisper in the midst of activity.",
    "Silence In Transition": "Creating bridges of silence and sacred listening between tasks.",
    "Deep Silence": "Slowing down for undivided, intentional listening."
};

const preparationTips = [
    { title: "1. Begin with Deep Breaths", text: "Take a few slow breaths. This signals your nervous system to move into a state of calm." },
    { title: "2. The 5-Minute Window", text: "Try starting with at least 5 minutes. It takes time for internal noise to quiet down." },
    { title: "3. Release the Agenda", text: "Don't feel pressured to 'hear' a specific answer. Just be present with God." },
    { title: "4. Acknowledge Distractions", text: "If a thought pops up, acknowledge it, then gently return to listening." },
    { title: "5. Listen with your Heart", text: "God often speaks through a sense of peace or a quiet prompting." }
];

let state = JSON.parse(localStorage.getItem('sacredSilenceState')) || {};
state.journeyLength = state.journeyLength || 0;
state.selectedPractices = state.selectedPractices || [];
state.completedPractices = state.completedPractices || [];
state.journeyLog = state.journeyLog || [];
state.selectedMinutes = state.selectedMinutes || 5;

let activeTimerInterval = null;
const chimeAudio = new Audio("https://assets.codepen.io/17078699/chime.mp3");
chimeAudio.preload = "auto";

function saveState() { localStorage.setItem('sacredSilenceState', JSON.stringify(state)); }

const churchFooter = `
  <footer style="margin-top:auto; padding:15px 0 5px 0; border-top:1px solid rgba(107, 86, 73, 0.1); width: 100%;">
    <p style="font-size:clamp(0.55rem, 2vw, 0.65rem); color:var(--brown); opacity:0.8; text-align:center; line-height: 1.3; margin:0;">
      The Prince of Peace Missionary Baptist Church<br>Grand Rapids, MI | <strong>© 2026</strong>
    </p>
  </footer>`;

function restartApp() {
    if(activeTimerInterval) clearInterval(activeTimerInterval);
    const audio = document.getElementById('invitation-audio');
    if (audio) { audio.pause(); audio.currentTime = 0; }
    localStorage.removeItem('sacredSilenceState');
    state = { journeyLength: 0, selectedPractices: [], completedPractices: [], selectedMinutes: 5, journeyLog: [] };
    showIntro();
}

function showIntro() {
  document.getElementById('screen-container').innerHTML = `
    <h1 style="animation: fadeIn 1.5s; font-size: clamp(1.6rem, 8vw, 2.2rem); line-height: 1.1; margin-bottom: 10px;">Silence & Sacred Listening</h1>
    <p style="font-family:'Playfair Display'; font-style:italic; margin-bottom:20px; color:#333; animation: fadeIn 2s; font-size: clamp(0.9rem, 4vw, 1.1rem); padding: 0 10px;">
      "Be still and know that I am God."<br>— Psalm 46:10
    </p>
    <button onclick="showInvitation()" style="width: min(220px, 80%); padding: 14px; font-size: 1rem;">Enter the Sanctuary</button>
    ${churchFooter}
  `;
}

function showInvitation() {
  document.getElementById('screen-container').innerHTML = `
    <audio id="invitation-audio" src="https://assets.codepen.io/17078699/silence2.mp3" autoplay></audio>
    <h2 style="color:var(--sage); font-size: clamp(1.4rem, 6vw, 1.8rem); margin-top:0;">Welcome To The Sanctuary</h2>
    <p style="font-size: clamp(0.85rem, 3.8vw, 1rem); line-height: 1.6; padding: 0 10px; text-align: left; color: var(--charcoal); animation: fadeIn 1s; margin-bottom:15px;">
      Where we will encounter God through silence and sacred listening. There is no one right way to engage. Let the Holy Spirit guide you. You can choose to explore a single Practice of the Day, or commit to a more in-depth experience over three, five, or seven days. When you are ready, let’s begin.
    </p>
    <button onclick="const a = document.getElementById('invitation-audio'); if(a) a.pause(); showListeningTips(0);" style="background:var(--sage); width: min(220px, 80%);">View Listening Tips</button>
  `;
}

function showListeningTips(index) {
    const tip = preparationTips[index];
    const isLast = index === preparationTips.length - 1;
    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage); font-size: clamp(1.1rem, 5vw, 1.3rem); margin-bottom: 5px;">Preparation</h2>
    <p style="font-size: 0.7rem; color: var(--brown); margin-bottom: 10px;">Step ${index + 1} of 5</p>
    <div style="min-height: 140px; display: flex; flex-direction: column; justify-content: center; background: rgba(255,255,255,0.4); padding: 15px; border-radius: 12px; margin: 0 5px 15px 5px; border: 1px solid rgba(255,255,255,0.6); text-align: left;">
        <h3 style="font-size: 1rem; color: var(--brown); margin-bottom: 8px;">${tip.title}</h3>
        <p style="font-size: 0.9rem; line-height: 1.4; color: var(--charcoal);">${tip.text}</p>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center; width: 100%; padding: 0 10px;">
        ${index > 0 ? `<button onclick="showListeningTips(${index - 1})" style="background: var(--charcoal); flex: 1; padding: 10px;">Back</button>` : ''}
        ${!isLast ? `<button onclick="showListeningTips(${index + 1})" style="background: var(--sage); flex: 1; padding: 10px;">Next</button>` : ''}
        ${isLast ? `<button onclick="showMainSelection()" style="background: var(--brown); flex: 2; padding: 10px;">Choose A Path</button>` : ''}
    </div>`;
}

function showMainSelection() {
    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage); font-size: 1.6rem; margin-top:0;">Choose Your Path</h2>
    <div style="display:flex; flex-direction:column; gap:12px; align-items:center;">
        <button onclick="showQuickPractice()" style="width: min(280px, 85%); background: var(--sage); padding: 16px;">Practice Of The Day</button>
        <button onclick="startOnboarding()" style="width: min(280px, 85%); background: var(--brown); padding: 16px;">Multi-Day Journey</button>
    </div>`;
}

function showQuickPractice() {
    const randomIdx = Math.floor(Math.random() * practiceMenu.length);
    const p = practiceMenu[randomIdx];
    state.journeyLength = 1;
    state.selectedPractices = [randomIdx];
    // We don't reset completedPractices here because it tracks history
    saveState();

    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage); font-size: 1.4rem; margin-top:0;">Practice Of The Day</h2>
    <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: left;">
        <h3 style="margin-top:0; color: var(--brown); font-size: 1.1rem;">${p.name}</h3>
        <p style="font-size: 0.85rem; font-style:italic; margin-bottom: 10px; color: var(--sage); font-weight: bold;">${p.verse}</p>
        <p style="font-size: 0.9rem; line-height: 1.4; color: var(--charcoal);">${p.guide}</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px; align-items:center; width: 100%;">
        <button onclick="launchDay()" style="width: min(280px, 85%);">Accept Practice</button>
        <button onclick="showQuickPractice()" style="width: min(280px, 85%); background: var(--charcoal);">Suggest Something Different</button>
        <button onclick="showMainSelection()" style="width: min(280px, 85%); background: var(--brown);">Back to Path Options</button>
    </div>`;
}

function startOnboarding() {
  document.getElementById('screen-container').innerHTML = `
    <h2 style="font-size: 1.6rem; margin-top:0;">Journey Settings</h2>
    <p style="font-size:0.9rem; margin-bottom:15px;">How many days would you like to commit to?</p>
    <div style="display:flex; gap:12px; justify-content:center; margin-bottom:25px;">
      <button onclick="saveOnboarding(3)" style="padding: 15px 25px;">3 Days</button>
      <button onclick="saveOnboarding(5)" style="padding: 15px 25px;">5 Days</button>
      <button onclick="saveOnboarding(7)" style="padding: 15px 25px;">7 Days</button>
    </div>
    <button onclick="showMainSelection()" style="width: min(280px, 85%); background: var(--brown);">Back to Path Options</button>`;
}

function saveOnboarding(days) {
  state.journeyLength = days; 
  state.selectedPractices = []; 
  // Keep completedPractices for checkmark history
  state.journeyLog = [];
  saveState(); 
  showSanctuaryBuilder();
}

function showSanctuaryBuilder() {
  const remaining = state.journeyLength - state.selectedPractices.length;
  document.getElementById('screen-container').innerHTML = `
    <h2 style="font-size: 1.4rem; margin-top:0; margin-bottom:5px;">Your Sanctuary</h2>
    <p style="font-size: 0.85rem; color:var(--brown); font-style:italic; margin-bottom: 15px;">${remaining > 0 ? `Select <strong>${remaining}</strong> more focus areas.` : `Your journey is ready.`}</p>
    <div id="categorized-grid" style="overflow-y: auto; max-height: 48vh; width: 100%; text-align: left; scroll-behavior: smooth;">
        ${renderCategorizedPractices()}
    </div>
    <div id="preview-area" style="font-size:0.75rem; min-height:40px; padding:10px; background:rgba(255,255,255,0.5); border-radius:8px; display:none; margin-top:10px;"></div>
    <div style="margin-top:15px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
       ${remaining === 0 ? `<button onclick="launchDay()" style="width: min(280px, 85%); padding: 14px; font-size: 1.1rem;">Begin Your Practice</button>` : ''}
       <button onclick="startOnboarding()" style="width: min(280px, 85%); background: var(--charcoal); font-size:0.9rem;">Change Journey Length</button>
       <button onclick="showMainSelection()" style="width: min(280px, 85%); background: var(--brown); font-size:0.9rem;">Back to Path Options</button>
    </div>`;
}

function renderCategorizedPractices() {
    const categories = ["Silence In Motion", "Silence In Transition", "Deep Silence"];
    return categories.map((cat, index) => {
        const nextId = `cat-${categories[(index + 1) % categories.length].replace(/\s+/g, '-')}`;
        return `
        <div id="cat-${cat.replace(/\s+/g, '-')}" style="margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.3); border-radius: 10px;">
            <h3 style="font-size: 0.95rem; color: var(--brown); margin: 0;">${cat}</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top:10px;">
                ${practiceMenu.filter(p => p.category === cat).map((p) => {
                    const gIdx = practiceMenu.findIndex(item => item.name === p.name);
                    const isSelectedCurrent = state.selectedPractices.includes(gIdx);
                    // Check if this practice ID exists in the permanent history array
                    const hasBeenCompletedBefore = state.completedPractices.includes(gIdx);
                    
                    return `
                        <div class="card ${isSelectedCurrent ? 'selected' : ''}" 
                             style="${isSelectedCurrent ? 'border: 2px solid var(--sage); background: white;' : ''} padding: 10px; position: relative;" 
                             onclick="togglePractice(${gIdx})">
                            <strong style="font-size: 0.75rem;">
                                ${p.name} ${hasBeenCompletedBefore ? '<span style="color: var(--sage); margin-left: 4px;">✓</span>' : ''}
                            </strong><br>
                            <span style="font-size:0.6rem;">${p.verse}</span>
                        </div>`;
                }).join('')}
            </div>
            <button onclick="document.getElementById('${nextId}').scrollIntoView({behavior:'smooth'})" style="background:none; border:none; text-decoration:underline; color:var(--sage); font-size:0.7rem; margin-top:10px;">See More Options</button>
        </div>`;
    }).join('');
}

function togglePractice(idx) {
    // Allows toggling selection even if completed before
    if (state.selectedPractices.includes(idx)) {
        state.selectedPractices = state.selectedPractices.filter(i => i !== idx);
    } else if (state.selectedPractices.length < state.journeyLength) {
        state.selectedPractices.push(idx);
    }
    
    const p = practiceMenu[idx];
    const preview = document.getElementById('preview-area');
    preview.style.display = 'block'; 
    preview.innerHTML = `<strong>Focus:</strong> ${p.guide}`;
    saveState(); 
    showSanctuaryBuilder();
}

function launchDay() {
  const currentIdx = state.selectedPractices[state.completedPractices.filter(id => state.selectedPractices.includes(id)).length] || state.selectedPractices[0];
  const p = practiceMenu[currentIdx];
  const activeB = "#6B5649"; const inactiveT = "#C2B9B0"; 
  const progressionLabel = state.journeyLength > 1 ? `Focus Area` : `Today's Practice`;

  document.getElementById('screen-container').innerHTML = `
    <h4 style="margin:0; opacity:0.8; font-size:0.75rem;">${progressionLabel}</h4>
    <h2 style="margin-top:5px; font-size: 1.6rem;">${p.name}</h2>
    <div style="font-size: 0.95rem; line-height: 1.5; padding: 20px; background: rgba(255,255,255,0.7); border-radius: 15px; margin-bottom: 15px; text-align: left;">
        <p style="font-weight:bold; color:var(--brown);">${p.verse}</p>
        <p style="font-style:italic;">"${p.verseText}"</p>
    </div>
    <p style="font-size: 0.9rem; margin-bottom: 20px;">${p.guide}</p>
    <div id="timer-setup-area">
      <div style="display:flex; justify-content:center; gap:8px; margin-bottom:15px;">
        <button onclick="state.selectedMinutes=5; launchDay()" style="background:${state.selectedMinutes==5? activeB : inactiveT}; width:60px;">5m</button>
        <button onclick="state.selectedMinutes=10; launchDay()" style="background:${state.selectedMinutes==10? activeB : inactiveT}; width:60px;">10m</button>
        <button onclick="state.selectedMinutes=20; launchDay()" style="background:${state.selectedMinutes==20? activeB : inactiveT}; width:60px;">20m</button>
        <input type="number" id="customMins" placeholder="Min" onchange="state.selectedMinutes=this.value" style="width:60px; text-align:center; border-radius:8px; border:1px solid #ccc;">
      </div>
      <button onclick="beginSilence()" style="width: min(280px, 85%); padding: 16px; font-size: 1.1rem;">Start Silence Timer</button>
      <button onclick="forceFinish()" style="width: min(280px, 85%); background: var(--charcoal); margin-top:10px;">I used my own timer</button>
    </div>
    <div id="active-timer-area" style="display:none;">
        <div id="timer-display" style="font-size: 4.5rem; margin: 25px 0; font-weight: bold; color: var(--brown);">00:00</div>
        <div style="display:flex; flex-direction:column; gap:10px; align-items:center;">
             <button onclick="forceFinish()" style="width: min(280px, 85%); background:var(--sage);">I'm done for now</button>
             <button onclick="clearInterval(activeTimerInterval); showMainSelection()" style="width: min(280px, 85%); background:var(--brown);">Cancel Journey</button>
        </div>
    </div>`;
}

function forceFinish() {
    if(activeTimerInterval) clearInterval(activeTimerInterval);
    chimeAudio.play().catch(e => console.log("Audio play error"));
    showReflection();
}

function beginSilence() {
  const custom = document.getElementById('customMins')?.value;
  if(custom && custom > 0) state.selectedMinutes = parseInt(custom);
  saveState();
  chimeAudio.volume = 0;
  chimeAudio.play().then(() => { chimeAudio.pause(); chimeAudio.volume = 1; }).catch(e => console.log("Audio unlock fail"));
  document.getElementById('timer-setup-area').style.display = 'none';
  document.getElementById('active-timer-area').style.display = 'block';
  let timer = state.selectedMinutes * 60;
  activeTimerInterval = setInterval(() => {
    let m = Math.floor(timer/60), s = timer%60;
    document.getElementById('timer-display').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (--timer < 0) { 
        clearInterval(activeTimerInterval); 
        chimeAudio.play().catch(e => console.log("Chime play error"));
        showReflection(); 
    }
  }, 1000);
}

function showReflection() {
  document.getElementById('screen-container').innerHTML = `
    <p id="audio-note" style="font-size:0.7rem; color:var(--sage); font-weight:bold; margin-bottom:5px;">Silence and sacred listening period is complete.</p>
    <h2 style="font-size: 1.6rem; margin-top:0;">How was your experience?</h2>
    <div style="display: flex; flex-direction: column; gap: 10px; align-items: center; width: 100%;">
      <button class="reflect-btn" onclick="finishDay('I heard God speak to me.')">I heard God speak to me.</button>
      <button class="reflect-btn" onclick="finishDay('I felt peaceful and grounded in His presence.')">I felt peaceful and grounded in His presence.</button>
      <button class="reflect-btn" onclick="finishDay('I felt distracted but was able to recenter.')">I felt distracted but was able to recenter myself.</button>
      <button class="reflect-btn" onclick="finishDay('My mind wandered frequently; it was hard to focus.')">My mind wandered frequently and it was difficult to stay focused.</button>
      <button onclick="launchDay()" style="width: min(280px, 85%); background: var(--charcoal); margin-top: 5px;">Back</button>
    </div>`;
}

function finishDay(mood) {
  // Logic to find which practice was just done
  // We look for the first selected practice that hasn't been added to the log in THIS session
  const logCount = state.journeyLog.length;
  const pIdx = state.selectedPractices[logCount];
  
  if (pIdx !== undefined) {
    const p = practiceMenu[pIdx];
    state.journeyLog.push({ name: p.name, verse: p.verse, mood: mood });
    
    // Checkmark persistence: Add to completedPractices if not already there
    if (!state.completedPractices.includes(pIdx)) {
        state.completedPractices.push(pIdx);
    }
    saveState();
  }
  
  document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage); font-style:italic; font-size: 1.6rem; margin-top:0;">Grace and peace.</h2>
    <div style="font-size: 0.95rem; padding: 20px; background: white; border-radius: 15px; margin-bottom: 20px; text-align: left; color: var(--charcoal); box-shadow: 0 2px 10px rgba(0,0,0,0.06);">
        ${mood.includes('heard') || mood.includes('peaceful') ? 'What a gift to encounter Him.' : 'God honors your heart for seeking Him.'}
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        ${state.journeyLog.length < state.journeyLength ? `<button onclick="launchDay()" style="width: min(280px, 85%);">Next Encounter</button>` : `<button onclick="showFinalCelebration()" style="width: min(280px, 85%); background:var(--sage);">Finish Journey</button>`}
    </div>`;
}

function showFinalCelebration() {
  document.getElementById('screen-container').innerHTML = `
    <h1 style="color:var(--sage); font-size: 1.8rem; margin-top:0;">Peace be with you.</h1>
    <p style="font-size: 0.95rem; margin-bottom: 20px; padding: 0 10px; line-height: 1.5;">
        Thank you for choosing this time of silence and sacred listening. You are welcome to continue the journey at your own pace, as the Spirit leads you.
    </p>
    <div id="final-action-buttons" style="display:flex; flex-direction:column; gap:8px; align-items:center; width: 100%;">
        <button onclick="showEncountersMap()" style="background:var(--sage); width: min(280px, 85%);">Visit Your Journey Map</button>
        <button onclick="downloadCard()" style="background:var(--brown); width: min(280px, 85%);">Download 5 Listening Tips</button>
        <button onclick="inviteFriend()" style="background:var(--charcoal); width: min(280px, 85%); color:white;">Share with A Friend</button>
        <button onclick="showMainSelection()" style="background:var(--sage); width: min(280px, 85%); color:white; border:none; margin-top: 10px;">Choose A New Path</button>
        <button onclick="restartApp()" style="background:var(--brown); width: min(280px, 85%); color:white; border:none;">Restart Entire Journey</button>
    </div>
    ${churchFooter}`;
}

function showEncountersMap() {
    document.getElementById('screen-container').innerHTML = `
    <h1 style="color:var(--sage); font-size: 1.6rem; margin-top:0;">Your Encounters</h1>
    <div id="log-area" style="overflow-y: auto; max-height: 50vh; width: 100%; text-align: left; margin-bottom: 20px; padding: 12px; background: rgba(255,255,255,0.4); border-radius: 12px;">
        ${state.journeyLog.map((entry, i) => `
            <div style="margin-bottom: 15px; border-bottom: 1px solid rgba(107,86,73,0.1); padding-bottom: 5px;">
                <p style="font-weight: bold; color: var(--brown); margin: 0; font-size: 0.85rem;">Encounter ${i+1}: ${entry.name}</p>
                <p style="font-size: 0.7rem; margin: 2px 0; color: var(--sage); font-weight: bold;"><em>${entry.verse}</em></p>
                <p style="font-size: 0.75rem; color: var(--charcoal);">${entry.mood}</p>
            </div>
        `).join('')}
    </div>
    <button onclick="showFinalCelebration()" style="width: min(280px, 85%); background:var(--brown);">Back</button>`;
}

function inviteFriend() {
  const debugUrl = "https://cdpn.io/pen/debug/EaNjGGv";
  const shareText = "I've been practicing sacred listening and thought you'd find it peaceful. Join the journey here:";
  
  if (navigator.share) {
    navigator.share({ 
      title: 'Silence & Sacred Listening', 
      text: shareText, 
      url: debugUrl 
    }).catch(e => console.log('Share failed'));
  } else {
    window.location.href = `mailto:?subject=Sacred Listening&body=${encodeURIComponent(shareText + " " + debugUrl)}`;
  }
}

function downloadCard() {
    const imageUrl = "https://assets.codepen.io/17078699/5+Tips.png";
    const filename = "Sacred_Listening_Tips.png";
    fetch(imageUrl).then(response => response.blob()).then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl; link.setAttribute('download', filename);
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    }).catch(err => {
        window.open(imageUrl, '_blank');
    });
}

showIntro();
