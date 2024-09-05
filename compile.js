/*
 * @Author: cuixiang cuixiang405@gmail.com
 * @Date: 2024-08-02 15:51:34
 * @FilePath: /cui-react-lib/compile.js
 * @Description: compile all sass to css
 */
const { exec } = require('child_process')

// Directories
const srcDir = 'src'
const esmDir = 'dist/esm'
const cjsDir = 'dist/cjs'

const sassComponents = [
  'Calendar',
  'Icon',
  'Space',
  // "",
  // "",
]

sassComponents.forEach((item) => {
  // 构建文件路径和输出路径
  const filePath = `./${srcDir}/${item}/index.scss`
  const outputPath1 = `./${esmDir}/${item}/index.css`
  const outputPath2 = `./${cjsDir}/${item}/index.css`

  // 构建命令
  const cmd1 = `npx sass ${filePath} ${outputPath1}`
  const cmd2 = `npx sass ${filePath} ${outputPath2}`

  // 执行命令并处理输出
  exec(cmd1, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling ${filePath}:`, stderr)
      return
    }
    console.log(`Compiled ${filePath} to ${outputPath1}`)
  })

  exec(cmd2, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling ${filePath}:`, stderr)
      return
    }
    console.log(`Compiled ${filePath} to ${outputPath2}`)
  })
})
