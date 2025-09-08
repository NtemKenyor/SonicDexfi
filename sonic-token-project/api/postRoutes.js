const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const router = express.Router();

const POST_ABI = [
  "function createPost(string,string,string,string,string) public",
  "function getPost(uint256) public view returns (tuple(string,string,string,string,string,address))",
  "function postCount() view returns (uint256)"
];

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL_TESTNET);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const postBoard = new ethers.Contract(process.env.POST_CONTRACT, POST_ABI, wallet);

// Create post
router.post("/create", async (req, res) => {
  try {
    const { title, content, imageUrl, date, others } = req.body;
    const tx = await postBoard.createPost(title, content, imageUrl, date, others);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await postBoard.getPost(req.params.id);
    res.json({
      id: req.params.id,
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      date: post.date,
      others: post.others,
      author: post.author
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const count = await postBoard.postCount();
    const posts = [];
    for (let i = 1; i <= count; i++) {
      const post = await postBoard.getPost(i);
      posts.push({
        id: i,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        date: post.date,
        others: post.others,
        author: post.author
      });
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
