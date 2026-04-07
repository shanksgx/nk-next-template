#!/usr/bin/env node

import { execSync } from 'child_process'
import readline from 'readline'

interface CommitType {
  value: string
  label: string
}

const TYPES: CommitType[] = [
  { value: 'feat', label: '新功能' },
  { value: 'fix', label: 'Bug 修复' },
  { value: 'docs', label: '文档更新' },
  { value: 'style', label: '代码格式' },
  { value: 'refactor', label: '重构' },
  { value: 'perf', label: '性能优化' },
  { value: 'test', label: '测试' },
  { value: 'chore', label: '构建/工具' },
  { value: 'revert', label: '回滚' },
  { value: 'ci', label: 'CI 配置' }
]

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question(prompt, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function main(): Promise<void> {
  console.log('=========================================')
  console.log('     Git 交互式提交工具')
  console.log('=========================================')
  console.log('')

  console.log('选择提交类型:')
  TYPES.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.value}: ${t.label}`)
  })
  console.log('')

  const typeChoice: string = await question('请输入选项 (1-10): ')
  const typeIndex: number = parseInt(typeChoice, 10) - 1

  if (typeIndex < 0 || typeIndex >= TYPES.length) {
    console.log('无效选择')
    process.exit(1)
  }

  const type: string = TYPES[typeIndex].value

  console.log('')
  let subject: string = await question('请输入提交描述 (必填): ')
  while (!subject.trim()) {
    console.log('描述不能为空！')
    subject = await question('请输入提交描述: ')
  }

  console.log('')
  const body: string = await question('请输入详细描述 (可选，直接回车跳过): ')

  const breakingAnswer: string = await question('是否包含破坏性变更? (y/n): ')
  const isBreaking: boolean = breakingAnswer.toLowerCase() === 'y'

  if (isBreaking) {
    subject = `! ${subject}`
  }

  let fullMsg: string = `${type}: ${subject}`
  if (body.trim()) {
    fullMsg += `\n\n${body}`
  }

  console.log('=========================================')
  console.log('提交信息预览:')
  console.log('=========================================')
  console.log(fullMsg)
  console.log('')

  const confirm: string = await question('确认提交? (y/n): ')
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 已取消提交')
    process.exit(0)
  }

  try {
    execSync('git add -A', { stdio: 'inherit' })
    execSync(`git commit -m "${fullMsg}"`, { stdio: 'inherit' })
    console.log('')
    console.log('✅ 提交成功！')

    console.log('')
    const push: string = await question('是否推送到远程? (y/n): ')
    if (push.toLowerCase() === 'y') {
      execSync('git push', { stdio: 'inherit' })
      console.log('🚀 已推送！')
    }
  } catch (error) {
    console.error('提交失败:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
