// Supabase Edge Function "notify": schickt dir eine Mail, wenn jemand den Plan bestätigt oder ein Problem meldet.
// Wird von einem Database Webhook auf der Tabelle "confirmations" (INSERT + UPDATE) aufgerufen.
Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("forbidden", { status: 403 });
  }
  const { record: r } = await req.json();
  if (!r) return new Response("nothing to do");
  // Nur bei Problemen mailen: Secret NOTIFY_ONLY_PROBLEMS = true setzen
  if (Deno.env.get("NOTIFY_ONLY_PROBLEMS") === "true" && r.status !== "problem") {
    return new Response("skipped (kein Problem)");
  }

  let planName = "";
  try {
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const res = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/plans?id=eq.${r.plan_id}&select=name`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    planName = (await res.json())[0]?.name ?? "";
  } catch (_) { /* Planname ist nur Zusatzinfo */ }

  const problem = r.status === "problem";
  const when = new Date(r.confirmed_at).toLocaleString("de-DE", { timeZone: "Asia/Tokyo" });
  const subject = problem ? `⚠ ${r.name}: Problem im Plan gemeldet` : `✓ ${r.name} hat den Plan bestätigt`;
  const text = [
    `Plan: ${planName}`,
    `Name: ${r.name}`,
    `Status: ${problem ? "NICHT OK" : "Alles OK"}`,
    problem ? `Kommentar: ${r.kommentar}` : "",
    `Zeit: ${when} (Tokyo)`,
  ].filter(Boolean).join("\n");

  const mail = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Deutschkurs-Plan <onboarding@resend.dev>", to: [Deno.env.get("NOTIFY_EMAIL")], subject, text }),
  });
  return new Response(await mail.text(), { status: mail.ok ? 200 : 500 });
});
