const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT
);

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["email", "profile"],
});

export const handler = async (event, context) => {
  const params = event.queryStringParameters;

  if (!params || !params.code) {
    return {
      statusCode: 200,
      body: /*html*/ `
        <html><body>
          <script type="application/javascript">
            window.location.replace("${url}")
          </script>
        </body></html>
      `,
      headers: { "content-type": "text/html" },
    };
  } else {
    return {
      statusCode: 200,
    };
  }
};
