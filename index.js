const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyHe5Q7ffoMXtsqxxrBcPHBTP-Sw-NrH3P3WTObYHvd3bNk1UiyiDYwtEMjwGOEmVFPfg/exec';

    try {
        const response = await axios.post(scriptUrl, new URLSearchParams({ id: id }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        res.send(`Sent user ID ${id} to Google Apps Script. Response: ${response.data}`);
    } catch (error) {
        res.send(`Error sending user ID ${id} to Google Apps Script: ${error}`);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://api.mesmun.org:${port}`);
});
