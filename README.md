# read-more-read-less-toggler

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Hasham-dev_read-more-read-less-toggler&metric=alert_status)](https://sonarcloud.io/dashboard?id=Hasham-dev_read-more-read-less-toggler)

It's truncate children text & visible Read More button to expand the collapse on specific pre-defined line overflow with collapse gradient effect.

> Turncate Text with Read More Button

[![NPM](https://img.shields.io/npm/v/read-more-read-less-toggler.svg)](https://www.npmjs.com/package/read-more-read-less-toggler) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [Demo](https://hasham-dev.github.io/read-more-read-less-toggler/)

## [Codesandbox Link](https://codesandbox.io/s/read-more-read-less-toggler-demo-s22iu?file=/src/App.js)

## Install

```bash
npm install --save read-more-read-less-toggler
```

## Usage

```jsx
import React from 'react'
import { ReadMoreToggler } from 'read-more-read-less-toggler'

const App = () => {
  return (
    <ReadMoreToggler>
      Some demo text...
    </ReadMoreToggler>
  )
}

export default App
```

## The Options:


|     Props        |  type   | Default Value |                       Defination                       |
| :-----------:    | :-----: | :-----------: | :----------------------------------------------------: |
| mobileBreakLines | number  |  5  |Number of line from which you want to turncate text for mobile view     |
|desktopBreakLines | number  |  3  |Number of line from which you want to turncate text for web view |
|   topGradient    | string  |#FFFFFF|Top gradient color on the turncate collapse view      |
| bottomGradient   | string  |#25232363|Bottom gradient color on the turncate collapse view  |
|   buttonColor    | string  |Parent Defined|Read More / Read Less button & caret icon color    |


## Contributing

Pull requests are always welcome, but not all suggested features will get merged. Feel free to contact me if you have an idea for a feature.

## License

MIT © [Hasham-dev](https://github.com/Hasham-dev)
