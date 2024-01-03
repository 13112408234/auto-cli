
//导入终端交互的模块
import {input,select} from '@inquirer/prompts'
//下载git项目的配置文件
import { clone } from '../utils/clone';
//导入路径
import path  from 'path';
//专门处理文件的依赖(需要安装)
import fs from 'fs-extra'
export interface TemplateInfo {
    name: string; // 项目名称
    downloadUrl: string; // 下载地址 
    description: string; // 项目描述
    branch: string; // 项目分支
} 
// 这里保存了我写好了咱们的之前开发的模板
export const templates: Map<string, TemplateInfo> = new Map(
  [
    ["Vite4-Vue3-Typescript-template", {
      name: "admin-template",
      //要下载git模板地址
      downloadUrl: 'https://github.com/13112408234/denglu.git',
      //描述
      description: 'Vue3技术栈开发模板',
      //分支
      branch: 'master'  
    }],
    ["webpack5-Vue2-template", {
        name: "admin-template",
        //要下载git模板地址
        downloadUrl: 'https://github.com/13112408234/denglu.git',
        //描述
        description: 'Vue2技术栈开发模板',
        //分支
        branch: 'fu'
      }]
  ]
)
//当项目存在，让用户自行选择是否覆盖项目的函数
export const isOverwrite = async (fileName: string) => {
    console.warn(`${fileName} 文件已存在 !`)
    return select({
      message: '是否覆盖原文件: ',
      choices: [
        {name: '覆盖', value: true},
        {name: '取消', value: false}
      ]
    });
  }



//projectName?:string 代表可以传一个文件的名称或者不传名称也可以
export default async function create(projectName?: string) {
    // ...
  
    // 我们需要将我们的 map 处理成 @inquirer/prompts select 需要的形式
    // 大家也可以封装成一个方法去处理
    //给用户选择要克隆哪一个git模板
    const templateList = [...templates.entries()].map((item: [string, TemplateInfo]) => {
      const [name, info] = item;
      console.log('name:'+name)
      console.log(info)
      return {
        name,
        value: name,
        description: info.description
      }
    });
    //如果用户没有输入项目名称，提醒用户输入
    if(!projectName){
       projectName = await input({message:'请输入项目名称'})
    }
     
    //relative:将传入的参数进行合并为路径
    //process.cwd()：是node.js内置方法，返回当前工作目录的绝对路径
    //projectName：项目名称
    const filePath = path.relative(process.cwd(),projectName)
    //如果要创建的项目已经存在，让用户选择是否覆盖之前项目
    //fs.existsSync是node.js中的一个内置方法。用于判断一个文件或目录是否存在
    if(fs.existsSync(filePath)){
        const run = await isOverwrite(projectName)
        //用户选择覆盖
        if(run){
            //删除之前的项目
            await fs.remove(filePath)
        }else{
            //不覆盖，直接退出
            return
        }
    }
    
    
    //询问用户选择下载哪一个模板
    const templateName = await select({
        message:'请选择模板',
        choices:templateList
    })
    //用户选择完模板，获取到用户在终端上选择的模板
    const info = templates.get(templateName);
     console.log(info);
    //从githuob上下载项目模板
    if(info){
      //info.downloadUrl：git克隆地址
      //projectName：用项目名作为目录，将要克隆的文件放入该文件中
      //-b  是 git 命令的参数，它表示要切换到指定的分支
      //info.branch  是  git.clone  方法的返回值，它是一个对象，包含了仓库的信息，包括分支信息。
       //所以， ['-b',info.branch]  表示要切换到  info.branch  指定的分支
      clone(info.downloadUrl,projectName,['-b',info.branch])

    } 
    
    console.log('create',projectName );
    
    
}