


document.getElementById('leaderboard-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const teamNumber = document.getElementById('teamNumber').value;
    const score1 = parseInt(document.getElementById('score1').value) || 0;
    const score2 = parseInt(document.getElementById('score2').value) || 0;
    const score3 = parseInt(document.getElementById('score3').value) || 0;
    const time1String = document.getElementById('time1').value || '00:00';
    const time2String = document.getElementById('time2').value || '00:00';
    const time1InSeconds = convertTimeToSeconds(time1String);
    const time2InSeconds = convertTimeToSeconds(time2String);

    // Check if time exceeds 10 minutes (600 seconds)
    if (time1InSeconds > 600 || time2InSeconds > 600) {
        alert('Warning: Time should not exceed 10 minutes (600 seconds).');
        return;
    }

    const totalPoints = calculateTotalPoints(score1, score2, score3, time1InSeconds, time2InSeconds);

    addLeaderboardEntry(`Team ${teamNumber}`, score1, score2, score3, time1InSeconds, time2InSeconds, totalPoints);
    sortLeaderboard();
    clearForm();
});

function convertTimeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + (seconds || 0);
}

function calculateTotalPoints(score1, score2, score3, time1InSeconds, time2InSeconds) {
    let adjustedScore2 = 0;
    let adjustedScore3 = 0;

    if (score2 === 50) {
        adjustedScore2 = score2 - (score2 - 25) * (time1InSeconds / 600);
    }

    if (score3 === 50) {
        adjustedScore3 = score3 - (score3 - 25) * (time2InSeconds / 600);
    }

    return score1 + adjustedScore2 + adjustedScore3;
}

function addLeaderboardEntry(teamName, score1, score2, score3, time1InSeconds, time2InSeconds, totalPoints) {
    const table = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);

    cell1.textContent = teamName;
    cell2.textContent = score1;
    cell3.textContent = score2;
    cell4.textContent = score3;
    cell5.textContent = time1InSeconds;
    cell6.textContent = time2InSeconds;
    cell7.textContent = totalPoints.toFixed(2);
}

function sortLeaderboard() {
    const table = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);

    rows.sort((a, b) => {
        const pointsA = parseFloat(a.cells[6].textContent);
        const pointsB = parseFloat(b.cells[6].textContent);

        return pointsB - pointsA; // Sort by total points in descending order
    });

    rows.forEach(row => table.appendChild(row));
}

function clearForm() {
    document.getElementById('leaderboard-form').reset();
}
