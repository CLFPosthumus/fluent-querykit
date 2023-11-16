# fluent-querykit

[![Build Status](https://github.com/CLFPosthumus/fluent-querykit/actions/workflows/codecov.yml/badge.svg?branch=main)](https://github.com/CLFPosthumus/fluent-querykit/actions?query=workflow%3ABuild+branch%3Amain)
[![codecov](https://codecov.io/gh/CLFPosthumus/fluent-querykit/graph/badge.svg?token=76HGM8YP8L)](https://codecov.io/gh/CLFPosthumus/fluent-querykit)

Fluent QueryKit is a TypeScript package that provides a Fluent API for constructing queries using pdevito3/QueryKit. It simplifies the process of building complex queries by offering a chainable and expressive syntax.

## Installation

Install Fluent QueryKit using npm:

```bash
npm install fluent-querykit
```

## Getting Started

To use Fluent QueryKit, create a `QueryBuilder` instance and chain methods to construct your query. Here are some examples:

### Example 1: Count of Property > 5

```typescript
import { QueryBuilder } from 'fluent-querykit';

const query = new QueryBuilder().countGreaterThan('Property', 5).build();
// Result: 'Property #> 5'
```

### Example 2: Complex Query with Logical Operators

```typescript
import { QueryBuilder } from 'fluent-querykit';

const query = new QueryBuilder()
  .startsWith('City', 'New')
  .and()
  .openParen()
  .greaterThan('Population', 1000000)
  .or()
  .equals('Country', 'USA')
  .closeParen()
  .build();
// Result: 'City _= "New" && (Population > 1000000 || Country == "USA" )'
```

## Usage

Fluent QueryKit supports a variety of conditions and operators. Here are some examples:

### String Conditions

```typescript
const query = new QueryBuilder()
  .contains('Name', 'book')
  .and()
  .openParen()
  .startsWith('Author', 'A')
  .or()
  .greaterThanOrEqual('PublishedYear', 2020)
  .closeParen()
  .build();
// Result: 'Name @= "book" && (Author _= "A" || PublishedYear >= 2020 )'
```

### Numeric Conditions

```typescript
const query = new QueryBuilder()
  .countLessThan('Property', 3)
  .build();
// Result: 'Property #< 3'
```

### Logical Operators

```typescript
const query = new QueryBuilder()
  .countGreaterThan('ItemCount', 10)
  .and()
  .countLessThanOrEqual('ItemCount', 5)
  .build();
// Result: 'ItemCount #> 10 && ItemCount #<= 5'
```

## Supported and tested Node.js versions:
- 14.x
- 15.x
- 16.x
- 17.x
- 18.x
- 19.x
- 20.x
  
## Beta Notice

Fluent QueryKit is currently in beta, and we welcome feedback from developers. Please report any issues or suggestions on the GitHub repository.

## Contributing

If you'd like to contribute to Fluent QueryKit, please create a PR or issue on [github](https://github.com/CLFPosthumus/fluent-querykit). 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
