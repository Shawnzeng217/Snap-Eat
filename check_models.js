


async function listModels() {
    const apiKey = "AIzaSyDGzBU_uv2hF7IpgBOSSzmsoeWc9EMT4hI";
    if (!apiKey) {
        console.error("No API KEY found in .env");
        return;
    }

    console.log("Checking models with key: " + apiKey.substring(0, 10) + "...");

    try {
        // Direct REST call to avoid SDK ambiguity for ListModels if SDK is tricky
        // But let's try fetch first as it is universal
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("\nAvailable Models:");
            data.models.forEach(m => {
                // Filter for likely candidates
                if (m.name.includes("gemini") && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.error("Error listing models:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
