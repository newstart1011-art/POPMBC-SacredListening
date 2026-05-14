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

const preparationTips = [
    { title: "1. Begin with Deep Breaths", text: "Take a few slow breaths to calm your nervous system." },
    { title: "2. The 5-Minute Window", text: "Try starting with at least 5 minutes to let the noise quiet down." },
    { title: "3. Release the Agenda", text: "Don't feel pressured to 'hear' a specific answer. Just be present." },
    { title: "4. Acknowledge Distractions", text: "If a thought pops up, acknowledge it, then return to listening." },
    { title: "5. Listen with your Heart", text: "God often speaks through a sense of peace." }
];

let state = JSON.parse(localStorage.getItem('sacredSilenceState')) || {
    journeyLength: 0,
    selectedPractices: [],
    completedPractices: [],
    journeyLog: [],
    selectedMinutes: 0
};

let activeTimerInterval = null;
const chimeAudio = new Audio("https://assets.codepen.io/17078699/chime.mp3");
chimeAudio.preload = "auto";

function saveState() { localStorage.setItem('sacredSilenceState', JSON.stringify(state)); }

const churchFooter = `<footer style="margin-top:auto; padding:15px 0 5px 0; border-top:1px solid rgba(107, 86, 73, 0.1); width: 100%; text-align:center;"><p style="font-size:0.65rem; color:var(--brown); opacity:0.8; margin:0;">The Prince of Peace Missionary Baptist Church<br>Grand Rapids, MI | <strong>© 2026</strong></p></footer>`;

function restartApp() {
    if(activeTimerInterval) clearInterval(activeTimerInterval);
    localStorage.removeItem('sacredSilenceState');
    state = { journeyLength: 0, selectedPractices: [], completedPractices: state.completedPractices || [], selectedMinutes: 0, journeyLog: [] };
    showIntro();
}

function showIntro() {
  document.getElementById('screen-container').innerHTML = `
    <h1>Silence & Sacred Listening</h1>
    <p style="font-style:italic; margin-bottom:20px;">"Be still and know that I am God."<br>— Psalm 46:10</p>
    <button onclick="showInvitation()" style="background:var(--brown); color:white; width: 220px; padding:14px;">Enter the Sanctuary</button>
    ${churchFooter}`;
}

function showInvitation() {
  document.getElementById('screen-container').innerHTML = `
    <audio id="invitation-audio" src="https://assets.codepen.io/17078699/silence2.mp3" autoplay></audio>
    <h2 style="color:var(--sage);">Welcome To The Sanctuary</h2>
    <p style="font-size: 1rem; line-height: 1.6; margin-bottom:15px;">Where we encounter God through silence and sacred listening. Let the Holy Spirit guide you.</p>
    <button onclick="const a = document.getElementById('invitation-audio'); if(a) a.pause(); showListeningTips(0);" style="background:var(--sage); color:white; width: 220px; padding:14px;">View Listening Tips</button>`;
}

function showListeningTips(index) {
    const tip = preparationTips[index];
    const isLast = index === preparationTips.length - 1;
    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage);">Preparation</h2>
    <p style="font-size: 0.7rem;">Step ${index + 1} of 5</p>
    <div style="min-height: 140px; background: rgba(255,255,255,0.4); padding: 15px; border-radius: 12px; margin-bottom: 15px; text-align: left;">
        <h3 style="color: var(--brown); margin-bottom: 8px;">${tip.title}</h3>
        <p style="font-size: 0.9rem; line-height: 1.4;">${tip.text}</p>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center;">
        ${index > 0 ? `<button onclick="showListeningTips(${index - 1})" style="background: var(--charcoal); color:white; flex: 1; padding: 10px;">Back</button>` : ''}
        ${!isLast ? `<button onclick="showListeningTips(${index + 1})" style="background: var(--sage); color:white; flex: 1; padding: 10px;">Next</button>` : ''}
        ${isLast ? `<button onclick="showMainSelection()" style="background: var(--brown); color:white; flex: 2; padding: 10px;">Choose A Path</button>` : ''}
    </div>`;
}

function showMainSelection() {
    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage);">Choose Your Path</h2>
    <div style="display:flex; flex-direction:column; gap:12px; align-items:center;">
        <button onclick="startPracticeOfDay()" style="background: var(--sage); color:white; width: 280px; padding: 16px;">Practice Of The Day</button>
        <button onclick="saveOnboarding(1)" style="background: var(--charcoal); color:white; width: 280px; padding: 16px;">One-Day Practice</button>
        <button onclick="startOnboarding()" style="background: var(--brown); color:white; width: 280px; padding: 16px;">Multi-Day Journey</button>
        <button onclick="restartApp()" class="secondary-btn" style="width: 280px; margin-top: 10px;">Reset All Progress</button>
    </div>`;
}

function startPracticeOfDay() {
    state = { journeyLength: 1, selectedMinutes: 5, selectedPractices: [], journeyLog: [], completedPractices: state.completedPractices || [] };
    const randomIdx = Math.floor(Math.random() * practiceMenu.length);
    state.selectedPractices = [randomIdx];
    saveState(); launchDay();
}

function startOnboarding() {
  document.getElementById('screen-container').innerHTML = `
    <h2>Journey Settings</h2>
    <p>How many days would you like to commit to?</p>
    <div style="display:flex; gap:12px; justify-content:center; margin-bottom:25px;">
      <button onclick="saveOnboarding(3)" style="background:var(--sage); color:white; padding: 15px 25px;">3 Days</button>
      <button onclick="saveOnboarding(5)" style="background:var(--sage); color:white; padding: 15px 25px;">5 Days</button>
      <button onclick="saveOnboarding(7)" style="background:var(--sage); color:white; padding: 15px 25px;">7 Days</button>
    </div>
    <button onclick="showMainSelection()" style="background: var(--brown); color:white; width: 280px;">Back</button>`;
}

function saveOnboarding(days) {
  state.journeyLength = days; state.selectedPractices = []; state.journeyLog = [];
  saveState(); showSanctuaryBuilder();
}

function showSanctuaryBuilder() {
  const remaining = state.journeyLength - state.selectedPractices.length;
  document.getElementById('screen-container').innerHTML = `
    <h2>Your Sanctuary</h2>
    <p style="font-size: 0.85rem; font-style:italic;">${remaining > 0 ? `Select <strong>${remaining}</strong> areas.` : `Ready.`}</p>
    <div id="categorized-grid" style="overflow-y: auto; max-height: 42vh; width:100%; text-align: left;">
        ${renderCategorizedPractices()}
    </div>
    <div id="preview-area" style="font-size:0.75rem; min-height:40px; padding:10px; background:rgba(255,255,255,0.5); border-radius:8px; display:none; margin-top:10px;"></div>
    <div style="margin-top:15px; display: flex; flex-direction: column; align-items: center; gap: 8px;">
       ${remaining === 0 ? `<button onclick="launchDay()" style="background:var(--sage); color:white; width: 280px; padding: 14px;">Begin Practice</button>` : ''}
       <button onclick="showMainSelection()" style="background: var(--brown); color:white; width: 280px; padding:12px;">Back</button>
    </div>`;
}

function renderCategorizedPractices() {
    const categories = ["Silence In Motion", "Silence In Transition", "Deep Silence"];
    return categories.map(cat => `
        <div style="margin-bottom: 20px; padding: 10px; background: rgba(255,255,255,0.3); border-radius: 10px;">
            <h3 style="font-size: 0.95rem; color: var(--brown); margin:0;">${cat}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top:10px;">
                ${practiceMenu.filter(p => p.category === cat).map(p => {
                    const gIdx = practiceMenu.findIndex(item => item.name === p.name);
                    const isSelected = state.selectedPractices.includes(gIdx);
                    const isDone = state.completedPractices.includes(gIdx);
                    return `<div class="card ${isSelected ? 'selected' : ''}" onclick="togglePractice(${gIdx})"><strong style="font-size:0.75rem;">${p.name} ${isDone ? '✓' : ''}</strong></div>`;
                }).join('')}
            </div>
        </div>`).join('');
}

function togglePractice(idx) {
    if (state.selectedPractices.includes(idx)) state.selectedPractices = state.selectedPractices.filter(i => i !== idx);
    else if (state.selectedPractices.length < state.journeyLength) state.selectedPractices.push(idx);
    const p = practiceMenu[idx];
    const preview = document.getElementById('preview-area');
    preview.style.display = 'block'; preview.innerHTML = `<strong>Focus:</strong> ${p.guide}`;
    saveState(); showSanctuaryBuilder();
}

function launchDay() {
  const p = practiceMenu[state.selectedPractices[state.journeyLog.length]];
  const activeB = "#6B5649"; const inactiveT = "#C2B9B0"; 
  document.getElementById('screen-container').innerHTML = `
    <h2>${p.name}</h2>
    <div style="background: rgba(255,255,255,0.7); padding: 15px; border-radius: 15px; margin-bottom: 15px; text-align: left;">
        <p><strong>${p.verse}</strong>: <em>"${p.verseText}"</em></p>
    </div>
    <p style="font-size: 0.9rem; margin-bottom: 20px;">${p.guide}</p>
    <div id="timer-setup-area">
      <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-bottom:15px;">
        <button onclick="state.selectedMinutes=5; launchDay()" style="background:${state.selectedMinutes==5? activeB : inactiveT}; color:white; width:50px; padding:10px; border-radius:8px;">5m</button>
        <button onclick="state.selectedMinutes=10; launchDay()" style="background:${state.selectedMinutes==10? activeB : inactiveT}; color:white; width:50px; padding:10px; border-radius:8px;">10m</button>
        <button onclick="state.selectedMinutes=20; launchDay()" style="background:${state.selectedMinutes==20? activeB : inactiveT}; color:white; width:50px; padding:10px; border-radius:8px;">20m</button>
        <input type="number" id="customMins" placeholder="Min" min="1" onchange="state.selectedMinutes=this.value" style="width:60px; padding:10px; border-radius:8px; border:1px solid #ccc; text-align:center;">
      </div>
      <button onclick="beginSilence()" style="background:var(--sage); color:white; width: 280px; padding: 16px; margin-bottom:10px; font-size: 1.1rem;">Start App Timer</button>
      <button onclick="showReflection()" style="background:var(--charcoal); color:white; width: 280px; padding: 16px;">Using My Own Timer</button>
      <button onclick="showMainSelection()" class="secondary-btn" style="width: 280px; margin-top:10px;">Change Path / Exit</button>
    </div>
    <div id="active-timer-area" style="display:none;">
        <div id="timer-display" style="font-size: 4.5rem; margin: 25px 0; font-weight: bold; color: var(--brown);">00:00</div>
        <button onclick="showReflection()" style="background:var(--sage); color:white; width: 280px; padding:12px;">Finish Now</button>
    </div>`;
}

function beginSilence() {
  saveState();
  if(activeTimerInterval) clearInterval(activeTimerInterval);
  
  // CHIME PRIME
  chimeAudio.volume = 0;
  chimeAudio.play().then(() => {
      chimeAudio.pause();
      chimeAudio.currentTime = 0;
      chimeAudio.volume = 1;
  }).catch(e => console.log("Audio unlock failed"));

  document.getElementById('timer-setup-area').style.display = 'none';
  const timerArea = document.getElementById('active-timer-area');
  timerArea.style.display = 'block';
  let totalSeconds = state.selectedMinutes * 60;
  activeTimerInterval = setInterval(() => {
    let m = Math.floor(totalSeconds/60), s = totalSeconds%60;
    document.getElementById('timer-display').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (--totalSeconds < 0) { 
        clearInterval(activeTimerInterval); 
        showReflection(); 
    }
  }, 1000);
}

function showReflection() {
  if(activeTimerInterval) clearInterval(activeTimerInterval);
  
  // TRIGGER CHIME UPON ENTRY
  chimeAudio.play().catch(e => console.log("Manual finish chime blocked"));

  document.getElementById('screen-container').innerHTML = `
    <h2>How was your experience?</h2>
    <div style="display: flex; flex-direction: column; gap: 10px; align-items: center; width: 100%;">
      <button class="reflect-btn" style="background:var(--sage); color:white; width:280px; padding: 14px;" onclick="finishDay('I heard God speak to me.')">I heard God speak to me.</button>
      <button class="reflect-btn" style="background:var(--sage); color:white; width:280px; padding: 14px;" onclick="finishDay('I felt peaceful and grounded.')">I felt peaceful and grounded.</button>
      <button class="reflect-btn" style="background:var(--sage); color:white; width:280px; padding: 14px;" onclick="finishDay('I felt distracted but recentered.')">I felt distracted but recentered.</button>
      <button class="reflect-btn" style="background:var(--sage); color:white; width:280px; padding: 14px;" onclick="finishDay('My mind wandered; hard to focus.')">My mind wandered; hard to focus.</button>
    </div>`;
}

function finishDay(mood) {
  const pIdx = state.selectedPractices[state.journeyLog.length];
  state.journeyLog.push({ name: practiceMenu[pIdx].name, verse: practiceMenu[pIdx].verse, mood: mood });
  if (!state.completedPractices.includes(pIdx)) state.completedPractices.push(pIdx);
  saveState();
  document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage); font-style:italic;">Grace and peace.</h2>
    <p>God honors your heart for seeking Him.</p>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top:20px;">
        ${state.journeyLog.length < state.journeyLength ? `<button onclick="launchDay()" style="background:var(--brown); color:white; width:280px; padding:12px;">Next Encounter</button>` : `<button onclick="showFinalCelebration()" style="background:var(--sage); color:white; width:280px; padding:12px;">Finish Journey</button>`}
    </div>`;
}

function showFinalCelebration() {
  document.getElementById('screen-container').innerHTML = `
    <h1 style="color:var(--sage);">Peace be with you.</h1>
    <p style="font-size: 0.95rem; margin-bottom: 20px;">Thank you for choosing this time.</p>
    <div style="display:flex; flex-direction:column; gap:10px; align-items:center; width: 100%;">
        <button onclick="downloadTips()" style="background:var(--sage); color:white; width: 280px; padding:12px;">Download 5 Preparation Tips</button>
        <button onclick="showEncountersMap()" style="background:var(--sage); color:white; width: 280px; padding:12px;">Visit Journey Map</button>
        <button onclick="showMainSelection()" style="background:var(--charcoal); color:white; width: 280px; padding:12px;">Return to Menu</button>
        <button onclick="inviteFriend()" style="background:var(--charcoal); color:white; width: 280px; padding:12px;">Share with A Friend</button>
        <button onclick="restartApp()" style="background:var(--brown); color:white; width: 280px; padding:12px;">Restart Entire Journey</button>
    </div>
    ${churchFooter}`;
}

function downloadTips() {
    let content = "Sacred Listening: 5 Preparation Tips\n\n";
    preparationTips.forEach(tip => { content += `${tip.title}\n${tip.text}\n\n`; });
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Sacred_Listening_Tips.txt'; a.click();
    URL.revokeObjectURL(url);
}

function showEncountersMap() {
    document.getElementById('screen-container').innerHTML = `
    <h2 style="color:var(--sage);">Your Encounters</h2>
    <div style="overflow-y: auto; max-height: 40vh; text-align: left; margin-bottom: 15px; padding: 12px; background: rgba(255,255,255,0.4); border-radius: 12px;">
        ${state.journeyLog.map((e, i) => `<p style="margin-bottom: 10px; border-bottom: 1px solid rgba(107,86,73,0.1);"><strong>Encounter ${i+1}: ${e.name}</strong><br>${e.mood}</p>`).join('')}
    </div>
    <button onclick="showLogOverlay()" style="background:var(--sage); color:white; width: 280px; padding:12px; margin-bottom:10px;">View & Copy Log</button>
    <button onclick="showFinalCelebration()" style="background:var(--brown); color:white; width: 280px; padding:12px;">Back</button>`;
}

function showLogOverlay() {
    const logText = state.journeyLog.map((e, i) => `Encounter ${i+1}: ${e.name}\nVerse: ${e.verse}\nReflection: ${e.mood}`).join('\n\n');
    const overlay = document.createElement('div');
    overlay.id = 'log-overlay';
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:1000; padding:20px;";
    overlay.innerHTML = `<div style="background:white; padding:20px; border-radius:15px; max-width:500px; width:100%; max-height:80vh; overflow-y:auto; text-align:center;"><h3 style="color:var(--brown);">Your Record</h3><textarea id="logTextarea" style="width:100%; height:200px; margin-bottom:15px; border-radius:8px; padding:10px;" readonly>${logText}</textarea><div style="display:flex; flex-direction:column; gap:10px;"><button onclick="copyFromOverlay()" style="background:var(--sage); color:white; padding:12px; border-radius:8px;">Copy to Clipboard</button><button onclick="document.getElementById('log-overlay').remove()" style="background:var(--charcoal); color:white; padding:12px; border-radius:8px;">Close</button></div></div>`;
    document.body.appendChild(overlay);
}

function copyFromOverlay() {
    const copyText = document.getElementById("logTextarea");
    copyText.select(); document.execCommand("copy");
    alert("Journey Log copied to clipboard!");
}

function inviteFriend() {
  const url = "https://newstart1011-art.github.io/POPMBC-SacredListening/"; 
  if (navigator.share) navigator.share({ title: 'Sacred Listening', url: url });
  else window.location.href = `mailto:?subject=Sacred Listening&body=${url}`;
}

showIntro();
