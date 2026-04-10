const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MOMO_API_BASE_URL = "https://sandbox.momodeveloper.mtn.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  const MOMO_SUBSCRIPTION_KEY = Deno.env.get("MOMO_SUBSCRIPTION_KEY");
  const MOMO_API_USER = Deno.env.get("MOMO_API_USER");
  const MOMO_API_KEY = Deno.env.get("MOMO_API_KEY");

  if (!MOMO_SUBSCRIPTION_KEY || !MOMO_API_USER || !MOMO_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Server configuration error: Missing MoMo credentials." }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  try {
    const { amount, phoneNumber, referenceId, action } = await req.json();

    // Generate access token via Basic Auth
    const tokenResponse = await fetch(
      `${MOMO_API_BASE_URL}/collection/token/`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${MOMO_API_USER}:${MOMO_API_KEY}`)}`,
          "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
        },
      }
    );

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      console.error("Token error:", tokenResponse.status, err);
      return new Response(
        JSON.stringify({ error: "Failed to authenticate with MoMo API.", details: err }),
        { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const { access_token } = await tokenResponse.json();

    // Status check
    if (action === "status" && referenceId) {
      const statusRes = await fetch(
        `${MOMO_API_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
            "X-Target-Environment": "sandbox",
          },
        }
      );
      const statusData = await statusRes.json();
      return new Response(JSON.stringify(statusData), {
        status: statusRes.status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // Request to Pay
    if (!amount || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: "amount and phoneNumber are required." }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const xReferenceId = crypto.randomUUID();

    const payResponse = await fetch(
      `${MOMO_API_BASE_URL}/collection/v1_0/requesttopay`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-Reference-Id": xReferenceId,
          "X-Target-Environment": "sandbox",
          "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: String(amount),
          currency: "ZMW",
          externalId: xReferenceId,
          payer: {
            partyIdType: "MSISDN",
            partyId: phoneNumber,
          },
          payerMessage: "Donation to Mercy Seat",
          payeeNote: "Thank you for your generous donation!",
        }),
      }
    );

    if (payResponse.status === 202) {
      return new Response(
        JSON.stringify({
          message: "Check your phone for the USSD prompt.",
          referenceId: xReferenceId,
        }),
        { status: 202, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    } else {
      const errorText = await payResponse.text();
      console.error("MoMo requesttopay error:", payResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to initiate payment.", details: errorText }),
        { status: payResponse.status, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
