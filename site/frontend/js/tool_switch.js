const tool_container = document.getElementById("tool-content");

async function switch_tool(tool_name) {
    const request = await fetch(`${window.ENV.API_URL}/tool/${tool_name}`);
    const tool = await request.text();

    tool_container.setHTML(tool);
}