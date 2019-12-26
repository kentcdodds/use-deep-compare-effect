<p align="center">
<a href="https://codefund.io/properties/498/visit-sponsor">
<img src="https://codefund.io/properties/498/sponsor" />
</a>
</p>

<div align="center">
<h1>use-deep-compare-effect 🐋</h1>

<p>It's React's useEffect hook, except using deep comparison on the inputs, not
reference equality</p>

</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

> WARNING: Please _only_ use this if you really can't find a way to use
> `React.useEffect`. There's often a better way to do what you're trying to do
> than do a deep comparison.

## The Problem

React's built-in [`useEffect`][react-hooks] hook has a second argument called
the "dependencies array" and it allows you to optimize when React will call your
effect callback. React will do a comparison between each of the values (via
[`Object.is`][object-is]) to determine whether your effect callback should be
called.

The problem is that if you need to provide an object for one of those
dependencies and that object is new every render, then even if none of the
properties changed, your effect will get called anyway.

Here's an example situation:

```jsx
function Query({query, variables}) {
  // some code...

  React.useEffect(
    () => {},
    // because of the way the Query component is used below, `variables` is a
    // new object every render. This is the problem.
    [query, variables],
  )

  return <div>{/* awesome UI here */}</div>
}

function QueryPageThing({username}) {
  const query = `
    query getUserData($username: String!) {
      user(login: $username) {
        name
      }
    }
  `
  const variables = {username}
  // poof! Every render `variables` will be a new object!
  return <Query query={query} variables={variables} />
}
```

> NOTE: you could also solve this problem if the `QueryPageThing` created the
> variables object like this:
> `const variables = React.useMemo(() => ({username}), [username])`. Then you
> wouldn't need this package. But sometimes you're writing a custom hook and you
> don't have control on what kinds of things people are passing you (or you want
> to give them a nice ergonomic API that can handle new objects every render).

If that `<Query />` component uses

## This Solution

This is a drop-in replacement for `React.useEffect` for this use-case only.

> Note, if you try to use `useDeepCompareEffect` with only primitive values, you
> will receive an error because you should use `React.useEffect` instead.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Other Solutions](#other-solutions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save use-deep-compare-effect
```

## Usage

You use it in place of `React.useEffect`.

> NOTE: Only use this if your values are objects or arrays that contain objects.
> Otherwise you should just use `React.useEffect`. In case of "polymorphic"
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

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://linkedin.com/in/edygar/en"><img src="https://avatars2.githubusercontent.com/u/566280?v=4" width="100px;" alt="Edygar de Lima Oliveira"/><br /><sub><b>Edygar de Lima Oliveira</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=edygar" title="Code">💻</a> <a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=edygar" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt="Justin Dorfman"/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="https://antonhalim.com"><img src="https://avatars1.githubusercontent.com/u/10498035?v=4" width="100px;" alt="Anton Halim"/><br /><sub><b>Anton Halim</b></sub></a><br /><a href="https://github.com/kentcdodds/use-deep-compare-effect/commits?author=antonhalim" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]:
  https://img.shields.io/travis/kentcdodds/use-deep-compare-effect.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/use-deep-compare-effect
[coverage-badge]:
  https://img.shields.io/codecov/c/github/kentcdodds/use-deep-compare-effect.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/use-deep-compare-effect
[version-badge]:
  https://img.shields.io/npm/v/use-deep-compare-effect.svg?style=flat-square
[package]: https://www.npmjs.com/package/use-deep-compare-effect
[downloads-badge]:
  https://img.shields.io/npm/dm/use-deep-compare-effect.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/use-deep-compare-effect
[license-badge]:
  https://img.shields.io/npm/l/use-deep-compare-effect.svg?style=flat-square
[license]:
  https://github.com/kentcdodds/use-deep-compare-effect/blob/master/LICENSE
[prs-badge]:
  https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[react-hooks]: https://reactjs.org/docs/hooks-effect.html
[object-is]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
[donate-badge]:
  https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]:
  https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]:
  https://github.com/kentcdodds/use-deep-compare-effect/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]:
  https://img.shields.io/github/watchers/kentcdodds/use-deep-compare-effect.svg?style=social
[github-watch]: https://github.com/kentcdodds/use-deep-compare-effect/watchers
[github-star-badge]:
  https://img.shields.io/github/stars/kentcdodds/use-deep-compare-effect.svg?style=social
[github-star]: https://github.com/kentcdodds/use-deep-compare-effect/stargazers
[twitter]:
  https://twitter.com/intent/tweet?text=Check%20out%20use-deep-compare-effect%20by%20%40kentcdodds%20https%3A%2F%2Fgithub.com%2Fkentcdodds%2Fuse-deep-compare-effect%20%F0%9F%91%8D
[twitter-badge]:
  https://img.shields.io/twitter/url/https/github.com/kentcdodds/use-deep-compare-effect.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
