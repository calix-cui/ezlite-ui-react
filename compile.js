const { exec } = require('child_process')
// const fs = require('fs')
const path = require('path')
// const glob = require('glob')

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
  // absolute path
  // const filePath = path.resolve(__dirname, `${srcDir}/${item}/index.sass`)
  // const outputPath1 = path.resolve(__dirname, `${esmDir}/${item}/index.css`)
  // const outputPath2 = path.resolve(__dirname, `${cjsDir}/${item}/index.css`)

  // relative path
  const filePath = `./${srcDir}/${item}/index.scss`
  const outputPath1 = `./${esmDir}/${item}/index.css`
  const outputPath2 = `./${cjsDir}/${item}/index.css`

  const cmd1 = `npx sass ${filePath} ${outputPath1}`
  const cmd2 = `npx sass ${filePath} ${outputPath2}`

  // Execute the command
  exec(cmd1, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling ${filePath}:`, stderr)
      return
    }
    console.log(`Compiled ${filePath} to ${outputPath1}`)
  })

  // Execute the command
  exec(cmd2, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compiling ${filePath}:`, stderr)
      return
    }
    console.log(`Compiled ${filePath} to ${outputPath2}`)
  })
})
