const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'form_submission.json');
const body = path.join(__dirname, 'form_submission_body.json')
const contents = JSON.parse(fs.readFileSync(f, 'utf-8'));
const bodyContents = fs.readFileSync(body, 'utf-8');

contents.Records[0].body = bodyContents;

fs.writeFileSync(f, JSON.stringify(contents, null, 2), 'utf-8');
