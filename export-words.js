result = [];
table = document.querySelectorAll("table tbody tr")
for ( let line of  table) {
  let Hieroglyph =  line.querySelectorAll('p')[1] ? line.querySelectorAll('p')[1].innerText : ''
  let Pinyin =      line.querySelectorAll('p')[2] ? line.querySelectorAll('p')[2].innerText : ''
  let Translate =   line.querySelectorAll('p')[3] ? line.querySelectorAll('p')[3].innerText : ''
  let Sample =      line.querySelectorAll('p')[4] ? line.querySelectorAll('p')[4].innerText : ''
  let Level =       1;
  result.push(`('${Hieroglyph}', '${Pinyin}', '${Translate}', '${Sample}', '${Level}')`)
}

result.shift()

console.log("INSERT INTO words(`Hieroglyph`, `Pinyin`, `Translate`, `Sample`, `Level`) VALUES "+result.join(',\n'))