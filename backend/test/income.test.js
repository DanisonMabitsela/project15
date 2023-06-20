const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Income = require("../models/IncomeModel");
chai.use(chaiHttp);
const expect = chai.expect;

describe("Income Routes", () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await Income.deleteMany({});
  });

  it("should add a new income", async () => {
    const incomeData = {
      title: "Income Title",
      amount: 500,
      category: "Income Category",
      description: "Income Description",
      date: "2023-06-16",
    };

    const res = await chai
      .request(app)
      .post("/api/v1/add-income")
      .send(incomeData);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal("Income Added");

    const incomes = await Income.find();
    expect(incomes).to.have.lengthOf(1);
    expect(incomes[0].title).to.equal("Income Title");
    // Add more assertions as needed
  });

  it("should get all incomes", async () => {
    const income1 = new Income({
      title: "Income 1",
      amount: 500,
      category: "Category 1",
      description: "Description 1",
      date: "2023-06-16",
    });
    const income2 = new Income({
      title: "Income 2",
      amount: 1000,
      category: "Category 2",
      description: "Description 2",
      date: "2023-06-17",
    });
    await income1.save();
    await income2.save();

    const res = await chai.request(app).get("/api/v1/get-incomes");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.have.lengthOf(2);
    // Add more assertions as needed
  });

  it("should delete an income", async () => {
    const income = new Income({
      title: "Income to delete",
      amount: 500,
      category: "Category",
      description: "Description",
      date: "2023-06-16",
    });
    await income.save();

    const res = await chai
      .request(app)
      .delete(`/api/v1/delete-income/${income._id}`);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal("Income Deleted");

    const deletedIncome = await Income.findById(income._id);
    expect(deletedIncome).to.be.null;
  });
});
