const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const allowedEvents = new Set([
  "visit",
  "save_palette",
  "save_share_image",
]);

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") return json(204, {});
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return json(500, { error: "Analytics is not configured" });
  }

  let input;
  try {
    input = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const eventType = String(input.eventType || "");
  if (!allowedEvents.has(eventType)) {
    return json(400, { error: "Unsupported event type" });
  }

  const row = {
    event_type: eventType,
    visitor_id: String(input.visitorId || "unknown").slice(0, 120),
    page: String(input.page || "/").slice(0, 300),
    referrer: String(input.referrer || "").slice(0, 500),
    user_agent: String(input.userAgent || "").slice(0, 500),
    language: String(input.language || "").slice(0, 80),
    screen: input.screen && typeof input.screen === "object" ? input.screen : {},
    payload: input.payload && typeof input.payload === "object" ? input.payload : {},
  };

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/analytics_events`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const details = await response.text();
    return json(500, { error: "Supabase insert failed", details });
  }

  return json(204, {});
};
