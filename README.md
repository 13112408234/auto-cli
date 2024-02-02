 # fzp-cli
![Npm 版本](https://img.shields.io/badge/auto-cli_v0.01-green)
 ## 简介
 -用于快速搭建前端项目的命令行工具

 ## 模板
 -快速生成  Vue3 + TS+vite+elementPlus+Pinia+Axios+Mock的模板

 ## npm安装脚手架

 ```bash
npm install fzp-cli -g
```

## npm使用脚手架

```bash
#使用模板创建项目
fzp create

#执行项目文件夹名称并选择模板创建新项目
fzp create [projectName]

#查看脚手架版本
fzp -v
```

## github运行项目步骤

```bash
#使用git clone 拉取项目到本地时需执行以下命令才能成功运行项目
#安装该命令安装依赖
pnpm i

#使用该命令打包生成dist文件夹
npm run build

#使用该命令运行项目
node .\dist\ create
```