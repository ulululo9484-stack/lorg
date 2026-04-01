const tools_container = document.getElementById('tools');

for (let tool of tools_container.children) {
    tool.addEventListener("click", () => {
        switch_tool(tool.id);
    });
}