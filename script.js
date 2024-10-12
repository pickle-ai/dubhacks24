async function runCode() {
    const code = document.getElementById("code").value;
    const languageId = document.getElementById("language").value;

    // Judge0 API for running code
    const response = await fetch('https://api.judge0.com/submissions/?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            source_code: code,
            language_id: languageId
        })
    });

    const result = await response.json();
    document.getElementById("output").innerText = result.stdout || result.stderr || "Error running code";
}
