![npm](https://img.shields.io/npm/v/react-carouselize.svg)
<!-- ![travis build](https://travis-ci.org/one89/react-carouselize.svg?branch=master)
![Coveralls github branch](https://img.shields.io/coveralls/github/one89/react-carouselize/master.svg) -->

# React-Carouselize

The simplest carousel component you can find in the React ecosystem.

## Getting Started

1. Install the package with `yarn add react-carouselize` or `npm install --save react-carouselize`

2. Import the component
```javascript
import Carouselize from 'react-carouselize';
```
3. Wrap whatever you want to be a carousel
```javascript
<Carouselize>
  ....
</Carouselize>
```

## Properties
| Name | Type | Default value | Required | Description |
| ---- | ---- | ------------- | -------- | ----------- |
| duration | `number` | `5000` | no | Animation duration in milliseconds |
| animation | `string` | `v-scroll` | no | One of `v-scroll` (vertical scroll), `h-scroll` (horizontal scroll) or `fade` |
| navigation | `string` | `left` | no | Position of bullets, between `top`, `right`, `bottom`, `left` |
| enableNavigation | `boolean` | `true` | no | Enable/disable click on bullets |
| enableKeys | `boolean` | `true` | no | Enable/disable scrolling with left or right keys |

## Contibuting
Check the related file [CONTRIBUTING](https://github.com/one89/react-carouselize/blob/master/CONTRIBUTING.md)
