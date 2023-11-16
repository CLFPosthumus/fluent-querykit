# fluent-querykit

[![Build Status](https://github.com/CLFPosthumus/fluent-querykit/actions/workflows/codecov.yml/badge.svg?branch=main)](https://github.com/CLFPosthumus/fluent-querykit/actions?query=workflow%3ABuild+branch%3Amain)
[![codecov](https://codecov.io/gh/CLFPosthumus/fluent-querykit/graph/badge.svg?token=76HGM8YP8L)](https://codecov.io/gh/CLFPosthumus/fluent-querykit)


🚀 Welcome to the Beta Launch! 🚀

This project is currently soaring through the beta phase!  Feel free to explore, experiment, and provide your feedback. 

## Getting Started

Fluent QueryKit is a TypeScript package that provides a Fluent API for constructing queries using pdevito3/QueryKit. It simplifies the process of building complex queries by offering a chainable and expressive syntax.

## Installation

Install Fluent QueryKit using npm:

```bash
npm install fluent-querykit
```

## Usage

```typescript
import { QueryBuilder } from 'fluent-querykit';

const query = new QueryBuilder()
  .equals('name', 'John')
  .or()
  .startsWith('role', 'Admin')
  .build();

console.log(query);
```

## API

### Constructor

```typescript
new QueryBuilder(encodeUri: boolean = true, addFilterStatement = true)
```

- `encodeUri` (optional): If set to `true`, the resulting query string will be URI-encoded. Default is `true`.
- `addFilterStatement` (optional): If set to `true`, the query string will start with "Filters=". Default is `true`.

### Conditions

The following methods add conditions to the query:

- `equals(property: string, value: string | number | boolean): QueryBuilder`
- `notEquals(property: string, value: string | number | boolean): QueryBuilder`
- `greaterThan(property: string, value: string | number): QueryBuilder`
- `lessThan(property: string, value: string | number): QueryBuilder`
- `greaterThanOrEqual(property: string, value: string | number): QueryBuilder`
- `lessThanOrEqual(property: string, value: string | number): QueryBuilder`
- `startsWith(property: string, value: string): QueryBuilder`
- `doesNotStartWith(property: string, value: string): QueryBuilder`
- `endsWith(property: string, value: string): QueryBuilder`
- `doesNotEndWith(property: string, value: string | number): QueryBuilder`
- `contains(property: string, value: string): QueryBuilder`
- `doesNotContain(property: string, value: string): QueryBuilder`
- `soundsLike(property: string, value: string): QueryBuilder`
- `doesNotSoundLike(property: string, value: string | number): QueryBuilder`
- `has(property: string, value: string): QueryBuilder`
- `doesNotHave(property: string, value: string): QueryBuilder`
- `in(property: string, values: (string | number)[]): QueryBuilder`

### Case-Insensitive Conditions

Similar to the conditions above, but case-insensitive:

- `equalsCaseInsensitive(property: string, value: string | number): QueryBuilder`
- `notEqualsCaseInsensitive(property: string, value: string | number): QueryBuilder`
- `startsWithCaseInsensitive(property: string, value: string): QueryBuilder`
- `doesNotStartWithCaseInsensitive(property: string, value: string): QueryBuilder`
- `endsWithCaseInsensitive(property: string, value: string): QueryBuilder`
- `doesNotEndWithCaseInsensitive(property: string, value: string): QueryBuilder`
- `containsCaseInsensitive(property: string, value: string): QueryBuilder`
- `doesNotContainCaseInsensitive(property: string, value: string): QueryBuilder`
- `hasCaseInsensitive(property: string, value: string | number): QueryBuilder`
- `doesNotHaveCaseInsensitive(property: string, value: string | number): QueryBuilder`
- `inCaseInsensitive(property: string, values: (string | number)[]): QueryBuilder`

### Logical Operators

- `and(): QueryBuilder`: Adds the "&&" logical operator.
- `or(): QueryBuilder`: Adds the "||" logical operator.

### Parentheses

- `openParen(): QueryBuilder`: Adds an open parenthesis "(".
- `closeParen(): QueryBuilder`: Adds a close parenthesis ")".

### Count Conditions

Count-based conditions:

- `countGreaterThan(property: string, value: number): QueryBuilder`
- `countLessThan(property: string, value: number): QueryBuilder`
- `countGreaterThanOrEqual(property: string, value: number): QueryBuilder`
- `countLessThanOrEqual(property: string, value: number): QueryBuilder`
- `equalsCaseCount(property: string, value: number): QueryBuilder`
- `notEqualsCaseCount(property: string, value: number): QueryBuilder`
- `greaterThanCaseCount(property: string, value: number): QueryBuilder`
- `lessThanCaseCount(property: string, value: number): QueryBuilder`
- `greaterThanOrEqualCaseCount(property: string, value: number): QueryBuilder`
- `lessThanOrEqualCaseCount(property: string, value: number): QueryBuilder`

### Building the Query

- `build(): string`: Constructs the final query string based on the added conditions. If `encodeUri` is set to `true`, the result will be URI-encoded.

## Examples

```typescript
const query = new QueryBuilder()
  .equals('name', 'John')
  .or()
  .startsWith('role', 'Admin')
  .and()
  .openParen()
  .contains('department', 'Engineering')
  .or()
  .endsWith('title', 'Developer')
  .closeParen()
  .build();
```

This example builds a query string for filtering data where the name is 'John' or the role starts with 'Admin' and the department contains 'Engineering' or the title ends with 'Developer'.

## Supported and tested Node.js versions:
- 14.x
- 15.x
- 16.x
- 17.x
- 18.x
- 19.x
- 20.x
- 21.x
  
## Contributing

If you'd like to contribute to Fluent QueryKit, please create a PR or issue on [github](https://github.com/CLFPosthumus/fluent-querykit). 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
