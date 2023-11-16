export default class QueryBuilder {
  private query: string;

  constructor() {
    this.query = "";
  }

  private addCondition(condition: string): QueryBuilder {
    this.query += condition + " ";
    return this;
  }
  private stringifyValue(value: string | number | boolean): string {
    if (typeof value === "string") {
      return `"${value}"`;
    }
    return value.toString();
  }

  equals(property: string, value: string | number | boolean): QueryBuilder {
    return this.addCondition(`${property} == ${this.stringifyValue(value)}`);
  }

  notEquals(property: string, value: string | number | boolean): QueryBuilder {
    return this.addCondition(`${property} != ${this.stringifyValue(value)}`);
  }

  greaterThan(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} > ${this.stringifyValue(value)}`);
  }

  lessThan(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} < ${this.stringifyValue(value)}`);
  }

  greaterThanOrEqual(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} >= ${this.stringifyValue(value)}`);
  }

  lessThanOrEqual(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} <= ${this.stringifyValue(value)}`);
  }

  startsWith(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} _= "${value}"`);
  }

  doesNotStartWith(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} !_= "${value}"`);
  }

  endsWith(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} _-= "${value}"`);
  }

  doesNotEndWith(property: string, value: string | number ): QueryBuilder {
    return this.addCondition(`${property} !_-= "${value}"`);
  }

  contains(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} @= "${value}"`);
  }

  doesNotContain(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} !@= "${value}"`);
  }

  soundsLike(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} ~~ "${value}"`);
  }

  doesNotSoundLike(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} !~ "${value}"`);
  }

  has(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} ^$ ${this.stringifyValue(value)}`);
  }

  doesNotHave(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} !^$ ${this.stringifyValue(value)}`);
  }

  in(property: string, values: (string | number)[]): QueryBuilder {
    const valueString = values
      .map((val) => this.stringifyValue(val))
      .join(", ");
    return this.addCondition(`${property} ^^ [${valueString}]`);
  }

  equalsCaseInsensitive(
    property: string,
    value: string | number
  ): QueryBuilder {
    return this.addCondition(`${property} ==* ${this.stringifyValue(value)}`);
  }

  notEqualsCaseInsensitive(
    property: string,
    value: string | number
  ): QueryBuilder {
    return this.addCondition(`${property} !=* ${this.stringifyValue(value)}`);
  }

  startsWithCaseInsensitive(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} _=* "${value}"`);
  }

  doesNotStartWithCaseInsensitive(
    property: string,
    value: string
  ): QueryBuilder {
    return this.addCondition(`${property} !_=* "${value}"`);
  }

  endsWithCaseInsensitive(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} _-=* "${value}"`);
  }

  doesNotEndWithCaseInsensitive(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} !_-=* "${value}"`);
  }

  containsCaseInsensitive(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} @=* "${value}"`);
  }

  doesNotContainCaseInsensitive(property: string, value: string): QueryBuilder {
    return this.addCondition(`${property} !@=* "${value}"`);
  }

  hasCaseInsensitive(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} ^$* ${this.stringifyValue(value)}`);
  }

  doesNotHaveCaseInsensitive(property: string, value: string | number): QueryBuilder {
    return this.addCondition(`${property} !^$* ${this.stringifyValue(value)}`);
  }

  inCaseInsensitive(
    property: string,
    values: (string | number)[]
  ): QueryBuilder {
    const valueString = values
      .map((val) => this.stringifyValue(val))
      .join(", ");
    return this.addCondition(`${property} ^^* [${valueString}]`);
  }

  and(): this {
    this.query = this.query.trim() + " && ";
    return this;
  }

  or(): this {
    this.query = this.query.trim() + " || ";
    return this;
  }

  openParen(): this {
    this.query += "(";
    return this;
  }

  closeParen(): this {
    this.query += ")";
    return this;
  }

  countGreaterThan(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #> ${value}`);
  }

  countLessThan(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #< ${value}`);
  }

  countGreaterThanOrEqual(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #>= ${value}`);
  }

  countLessThanOrEqual(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #<= ${value}`);
  }

  equalsCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #== ${value}`);
  }

  notEqualsCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #!= ${value}`);
  }

  greaterThanCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #> ${value}`);
  }

  lessThanCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #< ${value}`);
  }

  greaterThanOrEqualCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #>= ${value}`);
  }

  lessThanOrEqualCaseCount(property: string, value: number): QueryBuilder {
    return this.addCondition(`${property} #<= ${value}`);
  }

  build(): string {
    return this.query.trim();
  }
  
}

export { QueryBuilder };
