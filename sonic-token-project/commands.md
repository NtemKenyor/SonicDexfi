# Install NVM if you don’t have it yet
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.nvm/nvm.sh

# Install Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20



npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts dotenv


# Deployment and Running
npx hardhat compile

deploy and run:
npx hardhat run scripts/token-ops.js --network somnia

using the custom script:
npx hardhat run scripts/do-ops.js --network somnia

using for db/postdata contract deployment
npx hardhat run scripts/deploy-postboard.js --network somnia