const CONFIG = {
  SUPABASE_URL: "https://mqnjneuircmudjqpdhze.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbmpuZXVpcmNtdWRqcXBkaHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyODIzNTYsImV4cCI6MjEwNzg1ODM1Nn0.0E1IFUpHzouBpoFqmrUnIkcIL36Lb3Peeoepg9t1qwA",   // der öffentliche "anon"-Key, NICHT der service_role-Key
  READER_EMAIL: "sabishiran@gmail.com",   // gemeinsames Lese-Konto (siehe README)
  // Zeiten für den Kalender-Export (bitte anpassen). Ganze Tage werden als ganztägiger Termin exportiert.
  TIMES: {
  ganztag:    ["09:30", "16:25"],   // Tage ohne Vormittag/Nachmittag-Teilung
  vormittag:  ["09:30", "12:25"],
  nachmittag: ["13:30", "16:25"]
},
};
