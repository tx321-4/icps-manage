# icps-manage
ICP备案中心，方便查阅

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