// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title PostBoard - Simple posts storage on EVM where only the author can edit
contract PostBoard {
    struct Post {
        string title;
        string content;
        string imageUrl;
        string date;
        string others;
        address author; // who created the post
    }

    // postId => Post
    mapping(uint256 => Post) private posts;
    uint256 public postCount;

    event PostCreated(uint256 indexed postId, address indexed author, string title);
    event PostEdited(uint256 indexed postId, address indexed author, string title);

    /// @notice Create a new post
    function createPost(
        string memory title,
        string memory content,
        string memory imageUrl,
        string memory date,
        string memory others
    ) external {
        postCount++;
        posts[postCount] = Post({
            title: title,
            content: content,
            imageUrl: imageUrl,
            date: date,
            others: others,
            author: msg.sender
        });

        emit PostCreated(postCount, msg.sender, title);
    }

    /// @notice Edit an existing post (only the creator/author can edit)
    function editPost(
        uint256 postId,
        string memory title,
        string memory content,
        string memory imageUrl,
        string memory date,
        string memory others
    ) external {
        Post storage post = posts[postId];
        require(post.author == msg.sender, "Not the author");

        post.title = title;
        post.content = content;
        post.imageUrl = imageUrl;
        post.date = date;
        post.others = others;

        emit PostEdited(postId, msg.sender, title);
    }

    /// @notice Get a post (read-only, anyone can view)
    function getPost(uint256 postId)
        external
        view
        returns (
            string memory title,
            string memory content,
            string memory imageUrl,
            string memory date,
            string memory others,
            address author
        )
    {
        Post storage post = posts[postId];
        return (
            post.title,
            post.content,
            post.imageUrl,
            post.date,
            post.others,
            post.author
        );
    }

    /// @notice Get total number of posts
    function getPostCount() external view returns (uint256) {
        return postCount;
    }
}
