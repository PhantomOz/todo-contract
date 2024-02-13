// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Todo {
    struct TodoList {
        uint256 id;
        string title;
        string description;
        uint256 createdAt;
        uint256 updatedAt;
        bool isDone;
    }

    TodoList[] public todoLists;

    function addTodo(
        string calldata _title,
        string calldata _description
    ) external {
        uint256 _id = todoLists.length;
        todoLists.push(
            TodoList(
                _id,
                _title,
                _description,
                block.timestamp,
                block.timestamp,
                false
            )
        );
    }

    function toggleDone(uint256 _id) external {
        require(_id < todoLists.length, "out of list");
        todoLists[_id].isDone = !todoLists[_id].isDone;
    }

    function editTodo(
        uint256 _id,
        string calldata _title,
        string calldata _description
    ) external {
        require(_id < todoLists.length, "out of list");
        todoLists[_id].title = _title;
        todoLists[_id].description = _description;
        todoLists[_id].updatedAt = block.timestamp;
    }
}
