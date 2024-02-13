// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Todo {
    struct TodoList {
        string title;
        string description;
        uint256 createdAt;
        uint256 updatedAt;
        bool isDone;
    }

    TodoList[] public todoLists;
}
