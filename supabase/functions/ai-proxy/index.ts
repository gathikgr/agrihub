import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req: Request) => {
  const payload = await req.json();
  const res = await fetch(`${Deno.env.get("ML_SERVICE_URL")}/storage-decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return new Response(await res.text(), {
    headers: { "Content-Type": "application/json" },
    status: res.status
  });
});
