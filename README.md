<div align="center">
<h1>use-deep-compare-effect</h1>

<p>It's react's useEffect hook, except using deep comparison on the inputs, not
reference equality</p>

</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## The problem

React's built-in `useEffect` hook has a second argument called the "dependencies
array" and it allows you to optimize when React will call your effect callback.
React will do a comparison between each of the values (via `Object.is`) to
determine whether your effect callback should be called.

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

## This solution

This is a drop-in replacement for `React.useEffect` for this use-case only.

> Note, if you try to use `useDeepCompareEffect` with only primitive values, you
> will receive an error because you should use `React.useEffect` instead.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Inspiration](#inspiration)
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
> Otherwise you should just use `React.useEffect`.

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

## Inspiration

I built this as part of a demonstration in my course on egghead.io:
[Simplify React Apps with React Hooks](https://egghead.io/courses/simplify-react-apps-with-react-hooks).
It was iterated on in the comments of
[this video](https://egghead.io/lessons/react-deeply-compare-inputs-in-a-custom-react-hook-for-useeffect)
and I packaged it up so people wouldn't have to worry about it.

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds "Code") [📖](https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds "Documentation") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/kentcdodds/use-deep-compare-effect/commits?author=kentcdodds "Tests") |
| :---: |

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
