import registry, { Service } from "./Container";
import { Database } from "./infrastructure/persistence/Database";
import { v4 as uuidv4 } from 'uuid';
import { Form, Client, FormSubmission } from "./application/features/forms/models/Form";

async function run() {
  const data = {
    "address1": "8045 metcalf ave",
    "city": "op",
    "state": "KS",
    "zip": "66204"
  }
  const db = await registry
    .get<Database>(Service.Database);


const id = uuidv4();
const clientId = uuidv4();
const userId = uuidv4();

const submission : FormSubmission = {
id: uuidv4(),
submission: {
  address: {
    city: 'Overland Park'
  }
},
userId: uuidv4(),
timestamp: Date.now()
}

const form : Form = {
id,
submissions: [{
  id : submission.id,
  timestamp : submission.timestamp
}],
timestamp: Date.now(),
lastModified: Date.now(),
lastModifiedBy: userId,
createdBy: userId,
fields: [{
  label: "Name",
  value: { type: 'remote', value: 'https://jsonplaceholder.typicode.com/posts/1', selector: 'title' },
  name: "name",
  type: "name"
},
{
  name: "job",
  label: "Job",
  required: true,
  type: "string",
  value: { type: 'remote', value: 'https://jsonplaceholder.typicode.com/posts/1', selector: 'title' },
},
{
  name: "address",
  type: "address",
  label: "Address",
  value: {
    type: 'local', value: {
      address1: { type: 'remote', value: "https://api.airtable.com/v0/appEML20rXbrwtvQD/Table%201/recfrDgzRBLhrI76y?api_key=keyI6mPylSidabESr", "selector": "fields.Value" },
      address2: { type: "local", value: "416" },
      city: { type: "local", value: "OP" },
      state: { type: "local", value: "Kansas" },
      zip: { type: "local", value: "66140" }
    }
  },
  validations: ["address"],
  display: {
    condition: 'hasValue',
    target: 'form',
    parameter: 'job'
  }
}]
}

const client : Client = {
name : 'maddox',
label : 'Maddox',
forms : [{
  id : form.id,
  timestamp : form.timestamp
}],
users : [{
  email : 'jm@madev.me'
}],
created : Date.now(),
createdBy : userId
}

}


run().catch(err => {
  console.error(err);
});



 // 31852cb9-f4ed-49dd-abd0-c37f8fb0c52e
// 1596838514283
