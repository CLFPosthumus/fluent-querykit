import { ComparisonOperators } from "./models/ComparisonOperators";
import { LogicalOperator } from "./models/LogicalOperators";

export default class QueryBuilder {
  private encodeURi: boolean;
  private query: string = "";

  constructor(encodeUri: boolean = true, addFilterStatement = true) {
    this.encodeURi = encodeUri;
    if(addFilterStatement)  this.query += "Filters= "
  }

  private addCondition(condition: string): QueryBuilder {
    this.query += condition + " ";
    return this;
  }

  private stringifyValue(value: string | number | boolean): string {
    return typeof value === "string" ? `"${value}"` : value.toString();
  }
  
  private buildCondition(property: string, operator: ComparisonOperators, value: string | number | boolean): string {
    value = typeof(value) !== "number" ? this.stringifyValue(value) : value
    return `${property} ${operator} ${value}`;
  }
  
  private createCondition(operator: ComparisonOperators): (property: string, value: string | number | boolean) => QueryBuilder {
    return (property, value) => this.addCondition(this.buildCondition(property, operator, value));
  }

  private buildArrayCondition(property: string, operator: ComparisonOperators, values: (string | number)[]): string {
    const valueString = values.map((val) => this.stringifyValue(val)).join(", ");
    return `${property} ${operator} [${valueString}]`;
  }

  private createArrayCondition(operator: ComparisonOperators): (property: string, values: (string | number)[]) => QueryBuilder {
    return (property, values) => this.addCondition(this.buildArrayCondition(property, operator, values));
  }

  private addOperator(operator: LogicalOperator): this {
    this.query = this.query.trim() + ` ${operator} `;
    return this;
  }

  private appendQuery(value: string): this {
    this.query += value;
    return this;
  }

  equals = this.createCondition(ComparisonOperators.Equals);
  notEquals = this.createCondition(ComparisonOperators.NotEquals);
  greaterThan = this.createCondition(ComparisonOperators.GreaterThan);
  lessThan = this.createCondition(ComparisonOperators.LessThan);
  greaterThanOrEqual = this.createCondition(ComparisonOperators.GreaterThanOrEqual);
  lessThanOrEqual = this.createCondition(ComparisonOperators.LessThanOrEqual);

  startsWith = this.createCondition(ComparisonOperators.StartsWith);
  doesNotStartWith = this.createCondition(ComparisonOperators.DoesNotStartWith);
  endsWith = this.createCondition(ComparisonOperators.EndsWith);
  doesNotEndWith = this.createCondition(ComparisonOperators.DoesNotEndWith);
  contains = this.createCondition(ComparisonOperators.Contains);
  doesNotContain = this.createCondition(ComparisonOperators.DoesNotContain);
  soundsLike = this.createCondition(ComparisonOperators.SoundsLike);
  doesNotSoundLike = this.createCondition(ComparisonOperators.DoesNotSoundLike);
  has = this.createCondition(ComparisonOperators.Has);
  doesNotHave = this.createCondition(ComparisonOperators.DoesNotHave);

  endsWithCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveEndsWith);
  doesNotEndWithCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveDoesNotEndWith);
  containsCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveContains);
  doesNotContainCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveDoesNotContain);
  hasCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveHas);
  doesNotHaveCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveDoesNotHave);
  
  countGreaterThan = this.createCondition(ComparisonOperators.CountGreaterThan);
  countLessThan = this.createCondition(ComparisonOperators.CountLessThan);
  countGreaterThanOrEqual = this.createCondition(ComparisonOperators.CountGreaterThanOrEqual);
  countLessThanOrEqual = this.createCondition(ComparisonOperators.CountLessThanOrEqual);
  
  equalsCaseCount = this.createCondition(ComparisonOperators.CountEquals);
  notEqualsCaseCount = this.createCondition(ComparisonOperators.CountNotEquals);
  greaterThanCaseCount = this.createCondition(ComparisonOperators.CountGreaterThan);
  lessThanCaseCount = this.createCondition(ComparisonOperators.CountLessThan);
  greaterThanOrEqualCaseCount = this.createCondition(ComparisonOperators.CountGreaterThanOrEqual);
  lessThanOrEqualCaseCount = this.createCondition(ComparisonOperators.CountLessThanOrEqual);
  
  equalsCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveEquals);
  notEqualsCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveNotEquals);
  startsWithCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveStartsWith);
  doesNotStartWithCaseInsensitive = this.createCondition(ComparisonOperators.CaseInsensitiveDoesNotStartWith);
  in = this.createArrayCondition(ComparisonOperators.In);
  inCaseInsensitive = this.createArrayCondition(ComparisonOperators.CaseInsensitiveIn);

  and(): this {
    return this.addOperator(LogicalOperator.And);
  }

  or(): this {
    return this.addOperator(LogicalOperator.Or);
  }

  openParen(): this {
    return this.appendQuery("(");
  }
  
  closeParen(): this {
    return this.appendQuery(")");
  }  

  /**
   * Builds the full query string, optionally with `Filters=` prefix and URL encoding.
   *
   * By default, returns a URL-encoded string with the `Filters=` prefix, e.g.:
   * `Filters%3D%20name%20%3D%3D%20%22John%22`
   *
   * This is suitable for direct URL concatenation: `${apiUrl}?${query}`
   *
   * **Warning:** Do NOT pass the result of `build()` to `URLSearchParams` or similar
   * tools that perform their own URL encoding, as this will cause double-encoding.
   * Use `buildFilterExpression()` instead for those cases.
   */
  build(): string {
    this.query = this.query.trim()
    return this.encodeURi ? encodeURIComponent(this.query) : this.query;
  }

  /**
   * Returns the raw filter expression without the `Filters=` prefix and without URL encoding.
   *
   * Use this when passing filters to tools that handle their own URL encoding,
   * such as `URLSearchParams`, Axios params, or code-generated API clients (e.g. orval, openapi-generator).
   *
   * @example
   * ```typescript
   * const filter = new QueryBuilder().contains('name', 'John').buildFilterExpression()
   * // Returns: 'name @= "John"'
   *
   * // Safe to use with URLSearchParams:
   * const params = new URLSearchParams({ filters: filter })
   * // Correctly produces: filters=name+%40%3D+%22John%22
   * ```
   */
  buildFilterExpression(): string {
    this.query = this.query.trim()
    // Strip "Filters=" or "Filters= " prefix if present
    const raw = this.query.replace(/^Filters=\s*/, '')
    return raw;
  }

}

export { QueryBuilder };
