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

### `build()` — Full query string (URL-encoded with `Filters=` prefix)

Use `build()` when you need the complete query string for direct URL concatenation:

```typescript
import { QueryBuilder } from 'fluent-querykit';

const query = new QueryBuilder()
  .equals('name', 'John')
  .or()
  .startsWith('role', 'Admin')
  .build();

// Returns: "Filters%3D%20name%20%3D%3D%20%22John%22%20%7C%7C%20role%20_%3D%20%22Admin%22"
// Use directly in URL: `${apiUrl}?${query}`
```

### `buildFilterExpression()` — Raw filter expression (no encoding, no prefix)

Use `buildFilterExpression()` when passing filters to tools that handle their own URL encoding, such as `URLSearchParams`, Axios params, or code-generated API clients (e.g. orval, openapi-generator):

```typescript
import { QueryBuilder } from 'fluent-querykit';

const filter = new QueryBuilder()
  .contains('name', 'John')
  .and()
  .greaterThan('age', 18)
  .buildFilterExpression();

// Returns: 'name @= "John" && age > 18'

// Safe to use with URLSearchParams (no double-encoding):
const params = new URLSearchParams({ filters: filter });
fetch(`${apiUrl}?${params.toString()}`);
```

For more examples check the [Wiki](https://github.com/CLFPosthumus/fluent-querykit/wiki)

### Supported Node.js versions

CI tests against the current LTS and latest Node.js releases on Ubuntu and macOS.

### Contributing

If you'd like to contribute to Fluent QueryKit, please create a PR or issue on [github](https://github.com/CLFPosthumus/fluent-querykit).

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
