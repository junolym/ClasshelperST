# 安装步骤：

1. 安装Node.js和npm
2. 安装MySQL
3. 安装classhelper
4. 配置
5. 运行

---
## 1. 安装Node.js和npm
到[Node.js官网](https://nodejs.org/zh-cn/download/ "Node.js官网")下载Node.js，classhelper至少需要Node.js 6.10

以二进制包, v6.11.0, 64位版本安装为例:

假设将文件下载到 `/opt`下,

	$> cd /opt
	$> wget  https://nodejs.org/dist/v6.11.0/node-v6.11.0-linux-x64.tar.xz
	$> tar -xvf node-v6.11.0-linux-x64.tar.xz
进入`bin`目录查看

	$> cd node-v6.11.0-linux-x64/bin
	$> ls
目录下有两个文件: `node` 和`npm`

将`node`和`npm`软链接到`/usr/local/bin/`

	$> ln -s /opt/node-v6.11.0-linux-x64/bin/node /usr/local/bin/node
	$> ln -s /opt/node-v6.11.0-linux-x64/bin/npm /usr/local/bin/npm

查看Node.js是否安装成功:

	$> node -v
若出现类似以下信息证明安装成功：

	v6.11.0

---
## 2. 安装MySQL
classhelper至少需要MySQL 5.5.3
- `Debian/Ubuntu`
```
$> sudo apt-get install mysql-server
```
- `RedHat/CentOS`
```
$> yum install mysql
```
- 也可从官网下载合适的版本，详见[Installing MySQL on Linux](https://dev.mysql.com/doc/refman/5.7/en/linux-installation.html "Installing MySQL on Linux")

**安装过程中会提示设置MySQL的root密码**

安装完成后查看MySQL是否安装成功

	mysql -uroot -p

输入密码，看能否连上数据库。

---
## 3. 安装classhelper
下载classhelper的[源码](https://github.com/junolym/ClasshelperST "源码")，使用`npm`安装

	$> npm install

---
## 4. 配置
### 4.1 配置MySQL
#### 方法一(推荐方法):
使用`initMySQL.sh`脚本初始化数据库

	$> chmod +x initMySQL.sh
	$> ./initMySQL.sh -p 您设置的root密码
可选参数：
-u 用户名(默认root)
-p 密码(密码为空时不需要)
-P 端口号(默认3306)
-d 数据库名称(默认classhelper)

脚本会自动创建参数指定的数据库，并进行初始化。

#### 方法二:
手工初始化数据库。
1. 为classhelper创建数据库

```
CREATE DATABASE 数据库名字 ;
```

2. 指定编码格式为`utf8mb4`
```
ALTER DATABASE 数据库名字 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
```
3. 建表。建表代码存放在`dao/crebas.sql`中，拷贝使用即可。

### 4.2 配置classhelper
classhelper在`config.yml`中进行配置

**强烈建议您完整阅读配置文件，并修改其中你想要改变的设置。**

MySQL配置是必需的

	host: ip or host
	user: username
	password: password
	database: databasename
	charset: utf8mb4_unicode_ci

---
## 5 运行
	$> npm start

