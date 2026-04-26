module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "DISCORD_WEBHOOK_URL is not configured" }));
    return;
  }

  let payload = req.body;

  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_error) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid JSON body" }));
      return;
    }
  }

  if (!payload || typeof payload !== "object") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Request body is required" }));
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      res.statusCode = 502;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Discord webhook request failed",
          status: response.status,
          details: text
        })
      );
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Failed to reach Discord",
        details: error && error.message ? error.message : "Unknown error"
      })
    );
  }
};
