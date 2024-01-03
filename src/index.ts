import {Command} from 'commander';
import {version} from '../package.json'
import create from './command/create'
//dawei作为指令的名称
const program = new Command('dawei')   

program.version(version,'-v, --version')
//description：描述该命令的作用，argument：参数，创建命令时要输入的
//action执行一些操作
program.command('create').description('创建一个项目')
.argument('[name]', '项目名称').action(async (dirName)  =>{
    create(dirName)   
});
// 解析命令行参数
program.parse()