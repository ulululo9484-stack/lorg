const tool_container = document.getElementById("tool-content");

const setups = {
    "console": setup_console
}

async function switch_tool(tool_name) {
    const request = await fetch(`${window.ENV.API_URL}/tool/${tool_name}`);
    const tool = await request.text();

    tool_container.setHTMLUnsafe(tool);
    if (setups[tool_name]) {
        setups[tool_name]();
        console.log("Setup!");
    } else {
        console.log("Nain!ß")
    }
}