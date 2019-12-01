docker --version
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --no-include-email --region us-east-1)
docker build -t tracedemo-$1:$TRAVIS_BUILD_ID .
docker tag tracedemo-$1:$TRAVIS_BUILD_ID $AWS_ECR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/tracedemo-$1:$TRAVIS_BUILD_ID
docker push $AWS_ECR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/tracedemo-$1:$TRAVIS_BUILD_ID