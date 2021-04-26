module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "plugin:vue/essential",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      "no-multiple-empty-lines": [2, {"max": 1}],//空行最多不能超过1行
    }
};
