const chai = require("chai");
const sinon = require("sinon");
const controllers = require("../controllers");
const flashcardController = controllers.flashcardController;
const assert = chai.assert;
const schema = require("../schema");
const { Flashcard } = schema.Flashcard;
const { getAlldata, reqData } = require("./cardMockData");

describe("Flashcard Controllers", () => {
  describe("postFlashcard", () => {
    afterEach(() => {
      sinon.restore();
    });

    // it("should return No contetnt provided if body is not provided", async() => {
    //   const req = {
    //     headers : reqData.headers,
    //     body : {},
    //     params : reqData.params
    //   }
    //   // console.log(req)

    //   const res = {
    //     status : sinon.stub().returnsThis,
    //     send : sinon.stub()
    //   }

    //   await flashcardController.postFlashcard(req,res)

    //   assert(res.status.calledWith(204))
    //   assert(res.send.calledOnce)
    //   assert.deepStrictEqual(res.send.firstCall.args[0], { message : "Flashcard Data is not provided"})
    // })
    it("should create a flasgcard with response as success", async () => {
      const req = reqData;

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const saveData = {
        _id: "u5ygtrd89f7we2I45254R42RCkjvcd",
        deckId: req.params.deckid,
        userId: "tg5gkt28dew8d14kf4revwfbe",
        frontText: req.body.frontText,
        backText: req.body.backText,
        tags: req.body.tags,
        owner: true,
        visibility: req.body.visibility,
      };

      const saveStub = sinon
        .stub(Flashcard.prototype, "save")
        .resolves(saveData);

      await flashcardController.postFlashcard(req, res);
      assert(saveStub.calledOnce);
      assert(res.status.calledWith(201));
      assert(res.send.calledOnce);  
      assert.deepStrictEqual(res.send.firstCall.args[0], {
        message: "New flashcard created",
        data: saveData,
      });
    });

    it("should handle error while creating flashcard and respond with error status", async () => {
      const req = reqData;

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      const saveStub = sinon
        .stub(Flashcard.prototype, "save")
        .rejects(new Error("Failed to save flashcard"));

      await flashcardController.postFlashcard(req, res);

      assert(saveStub.calledOnce);
      assert(res.status.calledWith(500));
      assert(res.send.calledOnce);
      assert.deepStrictEqual(res.send.firstCall.args[0], {
        error: "Failed to create flashcard",
      });

      saveStub.restore();
    });
  });

  describe("getAllFlaschcard()", () => {
    afterEach(() => {
      Flashcard.find.restore();
    });
    it("return all the flashcard of owner/user or the flahcard that are publicly available", async () => {
      req = {
        headers: {
          authorization: reqData.headers.authorization
        },
      };

      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(Flashcard, "find").resolves(getAlldata);

      await flashcardController.getAllFlashcards(req, res);

      assert(res.status.calledWith(200));
      assert(res.send.calledOnce);
      assert.deepStrictEqual(res.send.firstCall.args[0], {
        message: "Retrieve Data Successfully",
        data: getAlldata,
      });
    });

    it("return error when unable to fetch the userData", async () => {
      const req = {
        headers: {
          authorization: reqData.headers.authorization
        },
      }

      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon
        .stub(Flashcard, "find")
        .rejects(new Error("Failed to fetch flashcards"));

      await flashcardController.getAllFlashcards(req, res);

      assert(res.status.calledWith(500));
      assert(res.send.calledOnce);
      assert.deepStrictEqual(res.send.firstCall.args[0], {
        error: "Failed to fetch flashcards",
      });
    });

    // it("return error 401, when no token is provided.", async () => {
    //     const req = {
    //       headers: {
    //         authorization:"",
    //       },
    //     }
        
    //     const res = {
    //       status: sinon.stub().returnsThis(),
    //       send: sinon.stub(),
    //     };

    //     await flashcardController.getAllFlashcards(req, res);
  
    //     assert(res.status.calledWith(401));
    //     assert(res.send.calledOnce);
    //     assert.deepStrictEqual(res.send.firstCall.args[0], {
    //       error: "Access denied. Token not provided. ",
    //     });
    //   });
  });
});
