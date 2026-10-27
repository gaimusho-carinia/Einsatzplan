const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
const $ = id => document.getElementById(id);
const clean = s => s.replace(/^\*/, "");
function parseCSV(text) {
  text = text.replace(/^\uFEFF/, "");
  const d = text.split(/\r?\n/)[0].includes(";") ? ";" : ",";
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c == '"') { if (text[i + 1] == '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c == '"') q = true;
    else if (c == d) { row.push(cur); cur = ""; }
    else if (c == "\n" || c == "\r") { if (c == "\r" && text[i + 1] == "\n") i++; row.push(cur); cur = ""; rows.push(row); row = []; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const head = rows.shift().map(h => h.trim().toLowerCase());
  return rows.filter(r => r.some(x => x.trim())).map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}
function normDate(s) {            // 2027-01-13 oder 13.01.2027 -> 2027-01-13
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/); if (m) return `${m[1]}-${m[2].padStart(2,"0")}-${m[3].padStart(2,"0")}`;
  m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/); if (m) return `${m[3]}-${m[2].padStart(2,"0")}-${m[1].padStart(2,"0")}`;
  throw new Error("Ungültiges Datum: " + s);
}
