const fs = require('fs');

const data = JSON.parse(fs.readFileSync("data.json", 'utf-8'));

for(let i = 0; i < 5000; i++) {
    data.push({
        "_id": "5f595957d16fa98e4fa8ecb2",
        "index": 0,
        "guid": "a829791e-be03-40ee-a06a-9c8a82aad20e",
        "isActive": false,
        "balance": "$2,914.70",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "green",
        "name": {
          "first": "Marilyn",
          "last": "Ortiz"
        },
        "company": "ACUMENTOR",
        "email": "marilyn.ortiz@acumentor.co.uk",
        "phone": "+1 (884) 560-2722",
        "address": "156 Fleet Street, Wakulla, Maine, 889",
        "about": "Labore proident eu aliquip excepteur do nostrud eiusmod duis anim. Ullamco cillum et laborum occaecat aliqua magna nisi ut. Occaecat ex est commodo labore deserunt anim eu irure enim amet aute.",
        "registered": "Friday, September 19, 2014 8:53 AM",
        "latitude": "89.013355",
        "longitude": "-149.855929",
        "tags": [
          "dolor",
          "reprehenderit",
          "id",
          "adipisicing",
          "ipsum"
        ],
        "range": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ],
        "friends": [
          {
            "id": 0,
            "name": "Amanda Francis"
          },
          {
            "id": 1,
            "name": "Reyna Rush"
          },
          {
            "id": 2,
            "name": "Luella Cunningham"
          }
        ],
        "greeting": "Hello, Marilyn! You have 7 unread messages.",
        "favoriteFruit": "strawberry"
      },
      {
        "_id": "5f59595774509445836f4d5b",
        "index": 1,
        "guid": "f2f889de-3394-4a38-8327-7caa19a7afb6",
        "isActive": true,
        "balance": "$2,529.34",
        "picture": "http://placehold.it/32x32",
        "age": 28,
        "eyeColor": "blue",
        "name": {
          "first": "Rios",
          "last": "Jarvis"
        },
        "company": "COMSTRUCT",
        "email": "rios.jarvis@comstruct.net",
        "phone": "+1 (964) 547-2850",
        "address": "585 Kossuth Place, Roland, Missouri, 5384",
        "about": "Voluptate pariatur nostrud incididunt officia id in velit. Quis cillum nostrud sint aliquip incididunt veniam esse velit. Dolor sit minim excepteur id reprehenderit tempor nostrud. Sint nulla consequat occaecat commodo laborum exercitation. Anim est nostrud excepteur in dolore commodo ut occaecat non. Irure sit duis sunt in aute culpa minim cillum non enim exercitation mollit nisi ex. Nisi amet qui veniam mollit et laborum.",
        "registered": "Sunday, June 2, 2019 12:49 PM",
        "latitude": "48.510385",
        "longitude": "-0.199497",
        "tags": [
          "cupidatat",
          "aliquip",
          "eiusmod",
          "non",
          "aliquip"
        ],
        "range": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9
        ],
        "friends": [
          {
            "id": 0,
            "name": "Lilia Crane"
          },
          {
            "id": 1,
            "name": "Thomas Olsen"
          },
          {
            "id": 2,
            "name": "Susie Love"
          }
        ],
        "greeting": "Hello, Rios! You have 8 unread messages.",
        "favoriteFruit": "strawberry"
      })
}

fs.writeFileSync("data.json", JSON.stringify(data))
