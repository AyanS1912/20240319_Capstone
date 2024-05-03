reqData = {
  params: { deckid: "vhguivkhrvbkv623rcvcw63" },
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF5YW4iLCJ1c2VySWQiOiI2NWZiMWIzYjEwMjQ2ZTg1N2MyODFkZjAiLCJpYXQiOjE3MTQ3MTYwNjIsImV4cCI6MTcxNDc5ODg2Mn0.6zyjz9e505tCiYaro28tflwPbOvTRnWonMOi-jTSkm4",
  },
  body: {
    frontText: "Mock frontText",
    backText: "Mock backText",
    tags: ["Mock1", "Mock2"],
    visibility: "public",
  },
};

getAlldata = [
  {
    _id: "65fbbf58e41d7dcc1b9938c3",
    deckId: "65fb8c0686a734e28f43ae86",
    userId: "65fb8beb86a734e28f43ae82",
    frontText: "Sample front text",
    backText: "Sample back text",
    tags: ["tag1", "tag2"],
    owner: true,
    visibility: "public",
    createdAt: "2024-03-21T05:02:16.899Z",
    __v: 0,
  },
  {
    _id: "65fbbfeee41d7dcc1b9938c6",
    deckId: "660142ba4a868f96daf71858",
    userId: "65fb1b3b10246e857c281df0",
    frontText: '<h1 style="text-align: right;">What is Mathscahcbahkc</h1>',
    backText: "<p>Math is Mathsc cv c c c c</p>",
    tags: ["Kuch bhi"],
    owner: true,
    visibility: "public",
    createdAt: "2024-03-21T05:04:46.407Z",
    __v: 3,
  },
];

module.exports = {
  reqData,
  getAlldata,
};
