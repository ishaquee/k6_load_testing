jenkins ALL=(ALL) NOPASSWD: /usr/bin/apt-get update
jenkins ALL=(ALL) NOPASSWD: /usr/bin/apt-get install dirmngr --install-recommends
jenkins ALL=(ALL) NOPASSWD: /usr/bin/apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
jenkins ALL=(ALL) NOPASSWD: /usr/bin/tee /etc/apt/sources.list.d/k6.list
jenkins ALL=(ALL) NOPASSWD: /usr/bin/apt-get install k6
