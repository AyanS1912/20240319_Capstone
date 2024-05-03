// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const assert = chai.assert;
// const schema = require("../schema");
// const controllers = require("../controllers/flashcardControllers");
// const validator = require("../validators/index");
// const {
//   validateFrontText,
//   validateBackText,
//   validateTags,
//   validateVisibility,
// } = validator.flashcardValidator;

// const {token_provided} = validator.tokenValidator

// chai.use(chaiHttp);

// describe("Flashcard Controllers", () => {
//   describe("getAllFlashcards", (done) => {
//     it.only("should return all flashcards owned by the token owner and public flashcards", (done) => {
//       const token =
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vydgfggfd fg dfgdf gdfgebmFtZSI6IkF5YW4iLCJ1c2VySWQiOiI2NWZiMWIzYjEwMjQ2ZTg1N2MyODFkZjAiLCJpYXQiOjE3MTQ1NDM2NDYsImV4cCI6MTcxNDYyNjQ0Nn0.XSNCeNf3O3peexzrQkLiSOzxTbfRd5VIdAC_Pqxn3Sk";
//       chai
//         .request("http://localhost:8080")
//         .get("/flashcards/getAll")
//         .set("Authorization", `${token}`)
//         .end((err, res) => {
//           if (err) {
//             return done(err);
//           }
//           assert.equal(res.status, 200);
//           assert.isObject(res.body);
//           assert.property(res.body, "message");
//           assert.equal(res.body.message, "Retrieve Data Successfully");
//           assert.property(res.body, "data");
//           assert.isArray(res.body.data);
//           done();
//         });
//     });

//     it("should return 401 if token is not provided", (done) => {
//       chai
//         .request("http://localhost:8080")
//         .get("/flashcards/getAll")
//         .end((err, res) => {
//           if (err) {
//             return err;
//           }
//           assert.equal(res.status, 401);
//           assert.isObject(res.body);
//           assert.property(res.body, "error");
//           assert.equal(res.body.error, "Access denied. Token not provided.");
//           done();
//         });
//     });

//     it("should return 403 if token is invalid", (done) => {
//       chai
//         .request("http://localhost:8080")
//         .get("/flashcards/getAll")
//         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
//         .end((err, res) => {
//           assert.equal(res.status, 403);
//           assert.isObject(res.body);
//           assert.property(res.body, "message");
//           assert.equal(res.body.message, "Forbidden. Invalid token.");
//           done();
//         });
//     });
//   });

//   describe("getSingleFlashcard", () => {
//     it("should return a specific flashcard owned by the token owner or public", (done) => {
//       const token =
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF5YW4iLCJ1c2VySWQiOiI2NWZiMWIzYjEwMjQ2ZTg1N2MyODFkZjAiLCJpYXQiOjE3MTQ1NDM2NDYsImV4cCI6MTcxNDYyNjQ0Nn0.XSNCeNf3O3peexzrQkLiSOzxTbfRd5VIdAC_Pqxn3Sk";
//       const flashcardId = "65fbbfeee41d7dcc1b9938c6";

//       chai
//         .request("http://localhost:8080")
//         .get(`/flashcards/get/${flashcardId}`)
//         .set("Authorization", `${token}`)
//         .end((err, res) => {
//           assert.equal(res.status, 200);
//           assert.isObject(res.body);
//           assert.property(res.body, "message");
//           assert.equal(res.body.message, "Retrieved Data Successfully");
//           assert.property(res.body, "data");
//           assert.isObject(res.body.data);
//           done();
//         });
//     });

//     it("should return 401 if token is not provided", (done) => {
//       const flashcardId = "65fbbfeee41d7dcc1b9938c6";
//       chai
//         .request("http://localhost:8080")
//         .get(`/flashcards/get/${flashcardId}`)
//         .end((err, res) => {
//           assert.equal(res.status, 401);
//           assert.isObject(res.body);
//           assert.property(res.body, "error");
//           assert.equal(res.body.error, "Access denied. Token not provided.");
//           done();
//         });
//     });

//     it("should return 403 if token is invalid", (done) => {
//       const flashcardId = "65fbbfeee41d7dcc1b9938c6";
//       const token =
//         "Bearer eyJhbGciOiJIUzI1NiIsInRgbgb5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF5YW4iLCJ1c2VySWQiOiI2NWZiMWIzYjEwMjQ2ZTg1N2MyODFkZjAiLCJpYXQiOjE3MTQ1NDM2NDYsImV4cCI6MTcxNDYyNjQ0Nn0.XSNCeNf3O3peexzrQkLiSOzxTbfRd5VIdAC_Pqxn3Sk";
//       chai
//         .request("http://localhost:8080")
//         .get(`/flashcards/get/${flashcardId}`)
//         .set("Authorization", `${token}`)
//         .end((err, res) => {
//           assert.equal(res.status, 403);
//           assert.isObject(res.body);
//           assert.property(res.body, "message");
//           assert.equal(res.body.message, "Forbidden. Invalid token.");
//           done();
//         });
//     });
//   });

//   describe("postFlashcard", () => {
//     // it("should return 400,if invalid frontText data is provided", (done) => {
//     //   const flashcardData = {
//     //     frontText: "dh",
//     //     backText: " cv cv  bfdkcnkdCvb vb vb",
//     //     tags: ["vdvfdv", "vdfvfdv"],
//     //     visibility: "public",
//     //   };
//     //   const deckid = "65fb883cbd8f7ba26d879545";
//     //   chai
//     //     .request("http://localhost:8080")
//     //     .post(`/flashcards/${deckid}`)
//     //     .send(flashcardData)
//     //     .end((err, res) => {
//     //       if (err) {
//     //         return err;
//     //       }
//     //       assert.isFalse(validateFrontText(flashcardData.frontText));
//     //       assert.isObject(flashcardData);
//     //       assert.property(res.body, "error");
//     //       assert.equal(
//     //         res.body.error,
//     //         "Invalid front text format. Front text can be alphanumeric or in HTML format."
//     //       );
//     //       done();
//     //     });
//     // });
//     // it("should return 400,if invalid BackText data is provided", (done) => {
//     //   const flashcardData = {
//     //     frontText: "dhh",
//     //     backText: "",
//     //     tags: ["vdvfdv", "vdfvfdv"],
//     //     visibility: "public",
//     //   };
//     //   const deckid = "65fb883cbd8f7ba26d879545";
//     //   chai
//     //     .request("http://localhost:8080")
//     //     .post(`/flashcards/${deckid}`)
//     //     .send(flashcardData)
//     //     .end((err, res) => {
//     //       if (err) {
//     //         return err;
//     //       }
//     //       assert.isFalse(validateBackText(flashcardData.backText));
//     //       assert.isObject(flashcardData);
//     //       assert.property(res.body, "error");
//     //       assert.equal(
//     //         res.body.error,
//     //         "Invalid back text format. Back text can be alphanumeric or in HTML format."
//     //       );
//     //       done();
//     //     });
//     // });
//     // it("should return 400,if invalid Tags Array is provided", (done) => {
//     //   const flashcardData = {
//     //     frontText: "dhh",
//     //     backText: " bv vb vb vb vb bv bvbgfbgfbg",
//     //     tags: ["vdvfdv$", "vdfvfd--v"],
//     //     visibility: "public",
//     //   };
//     //   const deckid = "65fb883cbd8f7ba26d879545";
//     //   chai
//     //     .request("http://localhost:8080")
//     //     .post(`/flashcards/${deckid}`)
//     //     .send(flashcardData)
//     //     .end((err, res) => {
//     //       if (err) {
//     //         return err;
//     //       }
//     //       assert.isFalse(validateTags(flashcardData.tags));
//     //       assert.isObject(flashcardData);
//     //       assert.isArray(flashcardData.tags);
//     //       assert.property(res.body, "error");
//     //       assert.equal(
//     //         res.body.error,
//     //         "Invalid tags format. Tags should be alphanumeric strings."
//     //       );
//     //       done();
//     //     });
//     // });

//     // it("should return 400,if invalid visibility status data is provided", (done) => {
//     //   const flashcardData = {
//     //     frontText: "dhh",
//     //     backText: " bvvb vb vb vb bv bvbgfbgfbg",
//     //     tags: ["vdvfdv", "vdfvfd"],
//     //     visibility: "publijgvghc",
//     //   };
//     //   const deckid = "65fb883cbd8f7ba26d879545";
//     //   chai
//     //     .request("http://localhost:8080")
//     //     .post(`/flashcards/${deckid}`)
//     //     .send(flashcardData)
//     //     .end((err, res) => {
//     //       if (err) {
//     //         return err;
//     //       }
//     //       assert.isFalse(validateVisibility(flashcardData.visibility));
//     //       assert.isObject(flashcardData);
//     //       assert.property(res.body, "error");
//     //       assert.equal(
//     //         res.body.error,
//     //         "Invalid visibility value. Visibility should be 'private' or 'public'."
//     //       );
//     //       done();
//     //     });
//     // });

//     it("should return 401 if token is not provided", (done) => {
//       const deckid = "65fb883cbd8f7ba26d879545";
//       const token = ""
//       const flashcardData = {
//         frontText: "dhh",
//         backText: " bv vb vb vb vb bv bvbgfbgfbg",
//         tags: ["vdvfdv", "vdfvfd"],
//         visibility: "public",
//       };
//       chai
//         .request("http://localhost:8080")
//         .post(`/flashcards/${deckid}`) 
//         .end((err, res) => {
//             if (err) {
//               return err;
//             }
//             assert.equal(res.status, 401);
//             assert.isObject(res.body);
//             assert.property(res.body, "error");
//             assert.equal(res.body.error, "Access denied. Token not provided.");
//             done();
//           });
//     });

//     it("should return 403 if token is invalid", (done) => {
//       const flashcardId = "65fbbfeee41d7dcc1b9938c6";
//       const flashcardData = {
//         frontText: "dhh",
//         backText: " bv vb vb vb vb bv bvbgfbgfbg",
//         tags: ["vdvfdv", "vdfvfd"],
//         visibility: "public",
//       };
//       const token =
//         "Bearer eyJhbGciOiJIUzI1NiIsInRgbgb5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkF5YW4iLCJ1c2VySWQiOiI2NWZiMWIzYjEwMjQ2ZTg1N2MyODFkZjAiLCJpYXQiOjE3MTQ1NDM2NDYsImV4cCI6MTcxNDYyNjQ0Nn0.XSNCeNf3O3peexzrQkLiSOzxTbfRd5VIdAC_Pqxn3Sk";
//       chai
//         .request("http://localhost:8080")
//         .get(`/flashcards/get/${flashcardId}`)
//         .set("Authorization", `${token}`)
//         .end((err, res) => {
//           assert.equal(res.status, 403);
//           assert.isObject(res.body);
//           assert.property(res.body, "message");
//           assert.equal(res.body.message, "Forbidden. Invalid token.");
//           done();
//         });
//     });
//   });
// });
