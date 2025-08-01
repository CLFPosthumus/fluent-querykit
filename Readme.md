# Fluent-Querykit

[![Build Status](https://github.com/CLFPosthumus/fluent-querykit/actions/workflows/codecov.yml/badge.svg?branch=main)](https://github.com/CLFPosthumus/fluent-querykit/actions?query=workflow%3ABuild+branch%3Amain)
[![minzip](https://img.shields.io/bundlejs/size/fluent-querykit)](https://bundlephobia.com/package/fluent-querykit)

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
For more examples check the [Wiki](https://github.com/CLFPosthumus/fluent-querykit/wiki)

### Supported and tested Node.js versions:
- 14.x - 21.x
  
### Contributing

If you'd like to contribute to Fluent QueryKit, please create a PR or issue on [github](https://github.com/CLFPosthumus/fluent-querykit). 

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
