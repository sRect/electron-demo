## electron demo

![](https://img.shields.io/badge/electron-^15.0.0-blue.svg)

## 本地开发

```
npm run start
# 相当于执行了下面两个命令
# npm run start:render // 运行渲染进程
# npm run electron // 运行主进程
```

## 打包

```
npm run build
# 相当于执行了下面三个个命令
# npm run build:render // 渲染进程打包
# npm run build:main // 主进程打包
# npm run pack // electron打包
```

## mac 上打包 exe

```
npm run build:win
```
