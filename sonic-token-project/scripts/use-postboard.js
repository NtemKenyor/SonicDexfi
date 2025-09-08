const { ethers } = require("hardhat");

async function main() {
  const [user] = await ethers.getSigners();

  // Replace with your deployed contract address
  const contractAddress = "0x59A2F68F62A04A94E16F889C37c89804895FC124";
  const PostBoard = await ethers.getContractFactory("PostBoard");
  const postBoard = PostBoard.attach(contractAddress);

  // Create a new post
  const tx = await postBoard.createPost(
    "Hello EVM",
    "This is my first post on Somnia",
    "https://image.url/post.png",
    "2025-09-01",
    "extra info"
  );
  await tx.wait();
  console.log("✅ Post created");

  // Get the post back
  const post = await postBoard.getPost(1);
  console.log("📄 Post:", post);
}

main().catch(console.error);
