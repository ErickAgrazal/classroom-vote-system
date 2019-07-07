# Variables
export USER=vagrant

# Installing docker
apt-get update
apt-get -i -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Installing docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Fixing permissions
groupadd docker || echo 'Docker group already added.'
usermod -aG docker $USER || echo 'User $USER already added to docker group.'

# Workdir
cd /vagrant

# Docker building
docker-compose build

# Docker executing
docker-compose up
