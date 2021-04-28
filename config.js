const port = 9527;

const NODE_ENV =process.env.NODE_ENV.trim();

if ( NODE_ENV == 'development' ) {
    module.exports = {
    post: port,
    session: {
      secret: 'icp',
      key: 'icp',
      // maxAge: 2592000000 // 30天
      maxAge: 86400000 // 1天
    },
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'icpsexpress'
    },
  }
} else if ( NODE_ENV == 'production' ) {
  module.exports = {
    post: port,
    session: {
      secret: 'icp',
      key: 'icp',
      // maxAge: 2592000000 // 30天
      maxAge: 86400000 // 1天
    }
  }
}

