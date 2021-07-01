# icps-manage
ICP备案中心，方便查阅

> 本地数据库名 icpsexpress

### 初始化项目
* express 项目名

### run the app:
* $ DEBUG=icps-manage:* npm start



### 技术点
* 核心  express
* 代码检验 eslint
* 免启动 nodemon
* 模板 jade
* 样式表 express-stylus、 nib
* 通知 connect-flash
* 配置环境变量 NODE_ENV
* 修改端口
* 链接数据库  sequelize mysql2


### 热更新
* npm install nodemon --save-dev
* 修改package.json
```javascript
  "scripts":{
    ...
    "dev": "nodemon ./bin/www"
  }
```
* 运行 npm run dev


### 样式表 express-stylus
* 安装  express-stylus、 nib
  * npm install express-stylus nib --save
* 配置
```javascript
  ...
  var path = require('path');
  const publicDir = path.join(__dirname, '/public');
  ...
  app.use(stylus({
    src: publicDir,
    use: [nib()],
    import: ['nib']
  }))
  app.use(express.static(publicDir)); // 设置静态文件目录
  ...

```


### 通知  connect-flash
* 要与 express-session 搭配使用

### 配置环境变量 NODE_ENV
>在window下 用  set ,在linux下 用 export
```bash
  "dev": "set NODE_ENV=development && nodemon DEBUG=icps-manage:* ./bin/www",
  "pro": "set NODE_ENV=production && nodemon DEBUG=icps-manage:* ./bin/www"
```

### 修改端口号
* app.js 添加 process.env.PORT = 端口号;


### 链接数据库
* models.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
* models.sync({ force: true })  - 将创建表,如果表已经存在,则将其首先删除