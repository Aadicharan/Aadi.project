// Game State
let teamA = { runs: 0, wickets: 0, overs: 0 };
let teamB = { runs: 0, wickets: 0, overs: 0 };

let maxOvers = 2;      // 2 overs per innings
let maxWickets = 3;    // 3 wickets allowed
let currentTeam = "A"; // A bats first

function bat() {
  let team = currentTeam === "A" ? teamA : teamB;

  if (team.overs >= maxOvers || team.wickets >= maxWickets) {
    alert(`Innings over for Team ${currentTeam}!`);
    return;
  }

  let run = Math.floor(Math.random() * 7); // 0–6 runs
  if (run === 0) {
    team.wickets++;
    alert(`Team ${currentTeam} lost a wicket!`);
  } else {
    team.runs += run;
  }

  // Every 6 balls = 1 over
  team.overs += 0.1;
  if (Number(team.overs.toFixed(1)) % 0.6 === 0) {
    team.overs = Math.floor(team.overs) + 1;
  }

  updateScoreboard();
}

function bowl() {
  alert(`Team ${currentTeam === "A" ? "B" : "A"} bowls!`);
}

function switchInnings() {
  if (currentTeam === "A") {
    currentTeam = "B";
    document.getElementById("turn-display").textContent = "🏏 Team B batting...";
  } else {
    endGame();
  }
}

function updateScoreboard() {
  document.getElementById("runsA").textContent = teamA.runs;
  document.getElementById("wicketsA").textContent = teamA.wickets;
  document.getElementById("oversA").textContent = teamA.overs.toFixed(1);

  document.getElementById("runsB").textContent = teamB.runs;
  document.getElementById("wicketsB").textContent = teamB.wickets;
  document.getElementById("oversB").textContent = teamB.overs.toFixed(1);
}

function endGame() {
  let resultText = "";
  if (teamA.runs > teamB.runs) {
    resultText = `🏆 Team A wins by ${teamA.runs - teamB.runs} runs!`;
  } else if (teamB.runs > teamA.runs) {
    resultText = `🏆 Team B wins by ${teamB.runs - teamA.runs} runs!`;
  } else {
    resultText = "🤝 It's a tie!";
  }

  document.getElementById("turn-display").textContent = "Match Over!";
  document.getElementById("result").textContent = resultText;
}

function resetGame() {
  teamA = { runs: 0, wickets: 0, overs: 0 };
  teamB = { runs: 0, wickets: 0, overs: 0 };
  currentTeam = "A";

  updateScoreboard();
  document.getElementById("turn-display").textContent = "🏏 Team A batting...";
  document.getElementById("result").textContent = "";
}
