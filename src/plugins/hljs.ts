import hljs from 'highlight.js/lib/core';

// languages
// most commonly used
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import stylus from 'highlight.js/lib/languages/stylus'
import markdown from 'highlight.js/lib/languages/markdown'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

// uncommon
import java from 'highlight.js/lib/languages/java'
import go from 'highlight.js/lib/languages/go'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import cpp from 'highlight.js/lib/languages/cpp'
import shell from 'highlight.js/lib/languages/shell'
const languages = {
  javascript,
  typescript,
  css,
  less,
  stylus,
  markdown,
  xml,
  yaml,

  java,
  go,
  python,
  ruby,
  cpp,
  shell,
}
Object.keys(languages).forEach((key) => {
  //@ts-ignore
  hljs.registerLanguage(key, languages[key])
})

export default hljs
