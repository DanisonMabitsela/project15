const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Expense = require("../models/ExpenseModel");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Expense Routes", () => {
  // Increase the timeout to 5000ms for the "before each" hook
  // This allows more time for the hook to complete
  beforeEach(async function () {
    this.timeout(5000);
    await Expense.deleteMany({});
  });
  it("should add a new expense", async () => {
    const expenseData = {
      title: "Expense Title",
      amount: 100,
      category: "Expense Category",
      description: "Expense Description",
      date: "2023-06-16",
    };

    const res = await chai
      .request(app)
      .post("/api/v1/add-expense")
      .send(expenseData);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal("Expense Added");

    const expenses = await Expense.find();
    expect(expenses).to.have.lengthOf(1);
    expect(expenses[0].title).to.equal("Expense Title");
    // Add more assertions as needed
  });

  it("should get all expenses", async () => {
    const expense1 = new Expense({
      title: "Expense 1",
      amount: 100,
      category: "Category 1",
      description: "Description 1",
      date: "2023-06-16",
    });
    const expense2 = new Expense({
      title: "Expense 2",
      amount: 200,
      category: "Category 2",
      description: "Description 2",
      date: "2023-06-17",
    });
    await expense1.save();
    await expense2.save();

    const res = await chai.request(app).get("/api/v1/get-expenses");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.have.lengthOf(2);
    // Add more assertions as needed
  });

  it("should delete an expense", async () => {
    const expense = new Expense({
      title: "Expense to delete",
      amount: 100,
      category: "Category",
      description: "Description",
      date: "2023-06-16",
    });
    await expense.save();

    const res = await chai
      .request(app)
      .delete(`/api/v1/delete-expense/${expense._id}`);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal("Expense Deleted");

    const deletedExpense = await Expense.findById(expense._id);
    expect(deletedExpense).to.be.null;
  });
});
