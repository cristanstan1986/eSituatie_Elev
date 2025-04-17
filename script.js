
function updatePercentages() {
    const rows = document.querySelectorAll("#gradesTable tbody tr");
    const labels = [];
    const data = [];

    rows.forEach(row => {
        const tds = row.querySelectorAll("td");
        const note1 = parseFloat(tds[1].innerText) || 0;
        const note2 = parseFloat(tds[2].innerText) || 0;
        const note3 = parseFloat(tds[3].innerText) || 0;
        const avg = (note1 + note2 + note3) / 3;
        const percent = Math.round((avg / 10) * 100);
        tds[4].innerText = percent + "%";

        labels.push(tds[0].innerText);
        data.push(percent);
    });

    updateChart(labels, data);
}

function updateChart(labels, data) {
    const ctx = document.getElementById("gradesChart").getContext("2d");
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Procente",
                data: data,
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

document.querySelectorAll("#gradesTable td[contenteditable='true']").forEach(cell => {
    cell.addEventListener("input", updatePercentages);
});

window.onload = updatePercentages;
