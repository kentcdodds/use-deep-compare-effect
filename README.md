<div align="center">
<h1>use-deep-compare-effect 🐋</h1>

<p>It's React's useEffect hook, except using deep comparison on the inputs, not
reference equality</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

> WARNING: Please _only_ use this if you really can't find a way to use
> `React.useEffect`. There's often a better way to do what you're trying to do
> than a deep comparison.

## The Problem

React's built-in [`useEffect`][react-hooks] hook has a second argument called
the "dependencies array" and it allows you to optimize when React will call your
effect callback. React will do a comparison between each of the values (via
[`Object.is`][object-is]) to determine whether your effect callback should be
called.

The problem is that if you need to provide an object for one of those
dependencies and that object is new every render, then even if none of the
properties changed, your effect will get called anyway.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's dependencies:

```shell
npm install --save use-deep-compare-effect
```

## Usage

You use it in place of `React.useEffect`.

> NOTE: Only use this if your values are objects or arrays that contain objects.
> Otherwise, you should just use `React.useEffect`. In case of "polymorphic"
> values (eg: sometimes object, sometimes a boolean), use
> `useDeepCompareEffectNoCheck`, but do it at your own risk, as maybe there can
> be better approaches to the problem.

Example:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import useDeepCompareEffect from 'use-deep-compare-effect'

function Query({query, variables}) {
  // some code...

  useDeepCompareEffect(
    () => {
      // make an HTTP request or whatever with the query and variables
      // optionally return a cleanup function if necessary
    },
    // query is a string, but variables is an object. With the way Query is used
    // in the example above, `variables` will be a new object every render.
    // useDeepCompareEffect will do a deep comparison and your callback is only
    // run when the variables object actually has changes.
    [query, variables],
  )

  return <div>{/* awesome UI here */}</div>
}
```

## Other Solutions

[use-custom-compare-effect](https://github.com/sanjagh/use-custom-compare-effect)

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://linkedin.com/in/edygar/en"><img src="https://avatars2.githubusercontent.com/u/566280?v=4" width="100px;" alt=""/><br /><sub><b>Edygar de Lima Oliveira</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=edygar" title="Code">💻</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=edygar" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt=""/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="https://antonhalim.com"><img src="https://avatars1.githubusercontent.com/u/10498035?v=4" width="100px;" alt=""/><br /><sub><b>Anton Halim</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=antonhalim" title="Documentation">📖</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4" width="100px;" alt=""/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=MichaelDeBoey" title="Code">💻</a></td>
    <td align="center"><a href="http://linkedin.com/in/tbueschel"><img src="https://avatars3.githubusercontent.com/u/13087421?v=4" width="100px;" alt=""/><br /><sub><b>Tobias Büschel</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=tobiasbueschel" title="Documentation">📖</a></td>
    <td align="center"><a href="http://peter.hozak.info/"><img src="https://avatars0.githubusercontent.com/u/1087670?v=4" width="100px;" alt=""/><br /><sub><b>Peter Hozák</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/pulls?q=is%3Apr+reviewed-by%3AAprillion" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://ricardobusquet.com"><img src="https://avatars1.githubusercontent.com/u/7198302?v=4" width="100px;" alt=""/><br /><sub><b>Ricardo Busquet</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/pulls?q=is%3Apr+reviewed-by%3Arbusquet" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/daveisfera"><img src="https://avatars3.githubusercontent.com/u/1686193?v=4" width="100px;" alt=""/><br /><sub><b>Dave Johansen</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/issues?q=author%3Adaveisfera" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/samuel-knutson"><img src="https://avatars0.githubusercontent.com/u/2458585?v=4" width="100px;" alt=""/><br /><sub><b>Sam Knutson</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=samuel-knutson" title="Documentation">📖</a></td>
    <td align="center"><a href="https://albertlucianto.github.io"><img src="https://avatars0.githubusercontent.com/u/23165866?v=4" width="100px;" alt=""/><br /><sub><b>Albert Lucianto</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/issues?q=author%3AAlbertLucianto" title="Bug reports">🐛</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=AlbertLucianto" title="Code">💻</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=AlbertLucianto" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/kentcdodds/use-deep-compare-effect/validate?logo=github&style=flat-square
[build]: https://github.com/kentcdodds/use-deep-compare-effect/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/use-deep-compare-effect.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/use-deep-compare-effect
[version-badge]: https://img.shields.io/npm/v/use-deep-compare-effect.svg?style=flat-square
[package]: https://www.npmjs.com/package/use-deep-compare-effect
[downloads-badge]: https://img.shields.io/npm/dm/use-deep-compare-effect.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/use-deep-compare-effect
[license-badge]: https://img.shields.io/npm/l/use-deep-compare-effect.svg?style=flat-square
[license]: https://github.com/kentcdodds/use-deep-compare-effect/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/use-deep-compare-effect/blob/master/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/kentcdodds/use-deep-compare-effect?color=orange&style=flat-square
[bugs]: https://github.com/kentcdodds/use-deep-compare-effect/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/kentcdodds/use-deep-compare-effect/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/kentcdodds/use-deep-compare-effect/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
[react-hooks]: https://reactjs.org/docs/hooks-effect.html
[object-is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
<!-- prettier-ignore-end -->
