const express = require('express');
const { google } = require('googleapis');
const app = express();

const KEY_FILE = 'mesmun-2f73b2f69341.json';
const SPREADSHEET_ID = '1qn3y692gvoOkFzhHZ3rQRONgmg1ClObmYnsInGZG9lU';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: SCOPES
  });
  const client = await auth.getClient();
  google.options({ auth: client });
}
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID:', id);

  await authenticate();

  const sheets = google.sheets('v4');
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split('T')[0];
  const currentTimeString = currentDate.toISOString().split('T')[1].split('.')[0];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Attendance!A2:C',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [[id, currentDateString + 'T' + currentTimeString, '']] },
  });
  res.send('User has arrived');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});