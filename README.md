# Deutschkurs-Plan

Webseite (GitHub Pages) + Datenbank (Supabase). Alle Namen im Plan sind anklickbar und leuchten auf;
Einsätze lassen sich als .ics in Apple/Google/Outlook-Kalender übernehmen.

## Einrichtung (einmalig, ca. 20 Min.)

1. **Supabase-Projekt** auf supabase.com anlegen (kostenlos).
2. Im Dashboard → *SQL Editor* → Inhalt von `supabase/schema.sql` einfügen → *Run*.
3. Dashboard → *Authentication → Users → Add user* (jeweils „Auto Confirm User" anhaken):
   - **Admin-Konto**: eigene E-Mail + eigenes Passwort.
   - **Lese-Konto**: z. B. `lehrer@deutschkurs.example` + das gemeinsame Passwort für alle Lehrkräfte.
4. Admin freischalten (SQL Editor, E-Mail anpassen):
   `insert into admins select id from auth.users where email = 'DEINE-ADMIN-MAIL';`
5. `config.js` ausfüllen: *Project Settings → API* → **Project URL** und **anon public key** (niemals den service_role-Key!).
   Dieselbe E-Mail wie in Schritt 3 bei `READER_EMAIL` eintragen. Kalenderzeiten bei `TIMES` anpassen.
6. Auf **GitHub** ein Repository anlegen, alle Dateien hochladen, *Settings → Pages → Deploy from branch (main)*.
7. `…github.io/REPO/admin.html` öffnen, anmelden, `sample/plan_2027_jan_feb.csv` hochladen. Fertig.

## Neuer Plan
CSV nach Vorlage erstellen (Excel → „Speichern unter → CSV"), in `admin.html` hochladen. Alte Pläne bleiben abrufbar.

## Sicherheit
Der Seitencode ist öffentlich, die Daten nicht: Ohne Login liefert Supabase nichts aus (Row Level Security).
Das gemeinsame Passwort ist bequem, aber nicht personenbezogen. Wird jemand ausgeschlossen, Passwort des
Lese-Kontos in Supabase ändern und neu verteilen.
