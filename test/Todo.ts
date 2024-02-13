import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Todo", function () {
  async function deployTodo() {


    const Todo = await ethers.getContractFactory("Todo");
    const todo = await Todo.deploy();

    return { todo};
  }

  it("Should Add todo to list", async function() {
    const { todo } = await loadFixture(deployTodo);
    await todo.addTodo("HW", "Hello World");
    const {title, description} = await todo.todoLists(0);
    expect(title).to.equal("HW");
    expect(description).to.equal("Hello World");
  });
  it("Should toggle todo on list", async function() {
    const { todo } = await loadFixture(deployTodo);
    await todo.addTodo("HW", "Hello World");
    await todo.toggleDone(0);
    const {isDone} = await todo.todoLists(0);
    expect(isDone).to.equal(true);
  });
  it("Should edit todo on list", async function() {
    const { todo } = await loadFixture(deployTodo);
    await todo.addTodo("HW", "Hello World");
    await todo.editTodo(0,"HWe", "Hello World");
    const {title, description} = await todo.todoLists(0);
    expect(title).to.equal("HWe");
    expect(description).to.equal("Hello World");
  });
  it("Should delete todo on list", async function() {
    const { todo } = await loadFixture(deployTodo);
    await todo.addTodo("HW", "Hello World");
    await todo.addTodo("HWe", "Hello Worlde");
    await todo.addTodo("DA", "Do Assignment");
    await todo.deleteTodo(1);
    const {title, description} = await todo.todoLists(1);
    expect(title).to.equal("");
    expect(description).to.equal("");
  });

})