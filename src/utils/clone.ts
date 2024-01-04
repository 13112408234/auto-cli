
//导入git插件，克隆git项目
import {simpleGit} from 'simple-git'
//下载时有进度条提示
import createLogger from 'progress-estimator'
//因为progress-estimato进度条颜色是白色，所以下载其他
//改变终端的字体颜色
import chalk from 'chalk'

// 初始化进度条
const logger = createLogger({
     spinner: {
        //隔几秒就刷新一下进度条的进度
        interval: 100, 
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((itme)=>{
        //打印出等待动画
          return itme
          
        }) 
     }

})
//simpleGit默认参数是以下这些，可以根据需求改变，然后作为参数传simpleGit里面
// const gitOptions:Partial<SimpleGitOptions> = {
//     baseDir: process.cwd(), //当前工作目录
//     binary: 'git', //指定git二进制文件路径
//     maxConcurrentProcesses: 6, //最大并发进程数
//     trimmed: false
// }


//从git上下载项目模板 
//url：克隆的地址，projectName：创建项目的名称  options：要克隆哪一个分支
export const clone = async (url:string, projectName: string, options: string[]) =>{
//   const git = simpleGit(gitOptions)
   const git = simpleGit()
  try{
     //logger进度条函数
     await logger(git.clone(url,projectName,options), '代码下载...',{
        //预计下载时间
         estimate: 7000,   
     })
  
     // 下面就是一些相关的提示
        console.log(chalk.green('代码下载成功'));  
        console.log()
        console.log(chalk.blueBright(`==================================`))
        console.log(chalk.blueBright(`=== 欢迎使用 auto-cli 脚手架 ===`))
        console.log(chalk.blueBright(`==================================`))
        console.log()
        console.log(chalk.blueBright(`==================================`))
        console.log(chalk.blueBright(`=== 使用 pnpm install 安装依赖 ===`))
        console.log(chalk.blueBright(`==================================`))
        console.log()
     
  }catch(error){
     //克隆失败
     console.error(chalk.red("代码下载失败"))
     console.log(error); 
  }
} 