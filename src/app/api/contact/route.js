export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name: body.name,
          email: body.email,
          message: body.message,
          subject: "New PUZEXA Contact Message",
          from_name: "PUZEXA Website",
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: result.message || "Submission failed",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}