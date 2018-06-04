# Capstone-EdThor-Frontend
工程目录主要在Capstone-EdThor <br/>
git clone 后，使用ide 打开Capstone-EdThor <br/>
该工程是ng6的工程，开发工程前，先安装nodejs，然后安装@angular/cli <br/>
IDE可以使用visual studio，也可以使用webstorm <br/>
前后台通信的host url写在src/environments/environment.ts文件中<br/>
一般使用http://localhost:[port]<br/>
前后台联调时，需要使用反向代理。一般使用nginx。上面所述port参数是反向代理listen的端口。<br/>
 example:<br/>
 ```
server {
        listen   55555;
        server_name localhost;
        #前台代码编译后部署位置。开发时使用proxy_pass代理到本地ng端口，例如 proxy_pass http://localhost:4200;
        location / {
                root /usr/local/var/www;
        }
        location /ws {
        proxy_pass http://localhost:8080;
        }

}
```
 
开发相关资料参见https://angular.io/docs <br/>
