import { QueryBuilder } from "../index";

describe("QueryBuilder", () => {
  let queryBuilder: QueryBuilder;

  beforeEach(() => {
    queryBuilder = new QueryBuilder();
  });

  it('should generate correct query for "Count of Property > 5"', () => {
    const query = queryBuilder.countGreaterThan("Property", 5).build();

    expect(query).toBe("Property #> 5");
  });

  it('should generate correct query for "City starts with "New" && (Population > 1000000 || Country == "USA)"', () => {
    const query = queryBuilder
      .startsWith("City", "New")
      .and()
      .openParen()
      .greaterThan("Population", 1000000)
      .or()
      .equals("Country", "USA")
      .closeParen()
      .build();

    expect(query).toBe(
      'City _= "New" && (Population > 1000000 || Country == "USA" )'
    );
  });

  it('should generate correct query for "Price in [20, 30, 40] && (Category == "Electronics" || Category == "Appliances)"', () => {
    const query = queryBuilder
      .in("Price", [20, 30, 40])
      .and()
      .openParen()
      .equals("Category", "Electronics")
      .or()
      .equals("Category", "Appliances")
      .closeParen()
      .build();

    expect(query).toBe(
      'Price ^^ [20, 30, 40] && (Category == "Electronics" || Category == "Appliances" )'
    );
  });

  it('should generate correct query for "Name contains "book" && (Author starts with "A" || PublishedYear >= 2020)"', () => {
    const query = queryBuilder
      .contains("Name", "book")
      .and()
      .openParen()
      .startsWith("Author", "A")
      .or()
      .greaterThanOrEqual("PublishedYear", 2020)
      .closeParen()
      .build();

    expect(query).toBe(
      'Name @= "book" && (Author _= "A" || PublishedYear >= 2020 )'
    );
  });

  it('should generate correct query for "Status has "completed" && (Priority != 1 || DueDate <= "2023-12-31)"', () => {
    const query = queryBuilder
      .has("Status", "completed")
      .and()
      .openParen()
      .notEquals("Priority", 1)
      .or()
      .lessThanOrEqual("DueDate", "2023-12-31")
      .closeParen()
      .build();

    expect(query).toBe(
      'Status ^$ "completed" && (Priority != 1 || DueDate <= "2023-12-31" )'
    );
  });

  it("should generate correct query for 'Count of Property < 3'", () => {
    const result = queryBuilder.countLessThan("Property", 3).build();
    expect(result).toEqual("Property #< 3");
  });

  it('should generate correct query for "ItemCount #> 10"', () => {
    const generatedQuery = queryBuilder
      .countGreaterThan("ItemCount", 10)
      .build();
    expect(generatedQuery).toBe("ItemCount #> 10");
  });

  it('should generate correct query for "ItemCount #<= 5"', () => {
    const generatedQuery = queryBuilder
      .countLessThanOrEqual("ItemCount", 5)
      .build();
    expect(generatedQuery).toBe("ItemCount #<= 5");
  });

  it('should generate correct query for "ItemName #==* "widget""', () => {
    const generatedQuery = queryBuilder
      .equalsCaseInsensitive("ItemName", "widget")
      .build();
    expect(generatedQuery).toBe('ItemName ==* "widget"');
  });

  it('should generate correct query for "ItemName !_=* "gadget""', () => {
    const generatedQuery = queryBuilder
      .doesNotContainCaseInsensitive("ItemName", "gadget")
      .build();
    expect(generatedQuery).toBe('ItemName !@=* "gadget"');
  });

  it('should generate correct query for "City ends with "burg" && (Population < 500000 || Country == "Germany")', () => {
    const query = queryBuilder
      .endsWith("City", "burg")
      .and()
      .openParen()
      .lessThan("Population", 500000)
      .or()
      .equals("Country", "Germany")
      .closeParen()
      .build();

    expect(query).toBe(
      'City _-= "burg" && (Population < 500000 || Country == "Germany" )'
    );
  });

  it('should generate correct query for "Category does not contain "Toys" && (Stock > 0 || Clearance == true)"', () => {
    const query = queryBuilder
      .doesNotContain("Category", "Toys")
      .and()
      .openParen()
      .greaterThan("Stock", 0)
      .or()
      .equals("Clearance", true)
      .closeParen()
      .build();

    expect(query).toBe(
      'Category !@= "Toys" && (Stock > 0 || Clearance == true )'
    );
  });

  it('should generate correct query for "Title sounds like "javascript" && (Author does not start with "B" || PublishedYear > 2015)"', () => {
    const query = queryBuilder
      .soundsLike("Title", "javascript")
      .and()
      .openParen()
      .doesNotStartWith("Author", "B")
      .or()
      .greaterThan("PublishedYear", 2015)
      .closeParen()
      .build();

    expect(query).toBe(
      'Title ~~ "javascript" && (Author !_= "B" || PublishedYear > 2015 )'
    );
  });

  it('should generate correct query for "Name hasCaseInsensitive "john" && (Category == "Books" || PublishedYear < 2000)"', () => {
    const query = queryBuilder
      .hasCaseInsensitive("Name", "john")
      .and()
      .openParen()
      .equals("Category", "Books")
      .or()
      .lessThan("PublishedYear", 2000)
      .closeParen()
      .build();

    expect(query).toBe(
      'Name ^$* "john" && (Category == "Books" || PublishedYear < 2000 )'
    );
  });

  it('should generate correct query for "ItemCount #> 10"', () => {
    const query = queryBuilder.countGreaterThan("ItemCount", 10).build();
    expect(query).toBe("ItemCount #> 10");
  });

  it('should generate correct query for "ItemCount #<= 5"', () => {
    const query = queryBuilder.countLessThanOrEqual("ItemCount", 5).build();
    expect(query).toBe("ItemCount #<= 5");
  });

  it('should generate correct query for "ItemCount #== 8"', () => {
    const query = queryBuilder.equalsCaseCount("ItemCount", 8).build();
    expect(query).toBe("ItemCount #== 8");
  });

  it('should generate correct query for "ItemCount #!= 3"', () => {
    const query = queryBuilder.notEqualsCaseCount("ItemCount", 3).build();
    expect(query).toBe("ItemCount #!= 3");
  });

  it('should generate correct query for "ItemCount #> 5 && ItemCount #<= 10"', () => {
    const query = queryBuilder
      .countGreaterThan("ItemCount", 5)
      .and()
      .countLessThanOrEqual("ItemCount", 10)
      .build();
    expect(query).toBe("ItemCount #> 5 && ItemCount #<= 10");
  });

  it('should generate correct query for "ItemCount #> 5 || ItemCount #<= 10"', () => {
    const query = queryBuilder
      .countGreaterThan("ItemCount", 5)
      .or()
      .countLessThanOrEqual("ItemCount", 10)
      .build();
    expect(query).toBe("ItemCount #> 5 || ItemCount #<= 10");
  });

  it('should add "(" and ")" to the query', () => {
    const query = new QueryBuilder()
      .openParen()
      .equals("FirstName", "John")
      .or()
      .equals("FirstName", "Jane")
      .closeParen()
      .and()
      .greaterThanOrEqual("Age", 25)
      .build();

    expect(query).toEqual(
      '(FirstName == "John" || FirstName == "Jane" ) && Age >= 25'
    );
  });

  it("should return the built query", () => {
    const query = new QueryBuilder()
      .equals("FirstName", "Jane")
      .and()
      .lessThan("Age", 10)
      .build();

    expect(query).toEqual('FirstName == "Jane" && Age < 10');
  });

  it("should add a does not end with condition to the query", () => {
    const expectedQuery = 'propertyName !_-= "value"';

    queryBuilder.doesNotEndWith("propertyName", "value");

    expect(queryBuilder.build()).toBe(expectedQuery);
  });

  it("should stringify numeric values", () => {
    const expectedQuery = 'propertyName !_-= "42"';

    queryBuilder.doesNotEndWith("propertyName", 42);

    expect(queryBuilder.build()).toBe(expectedQuery);
  });

  it("should handle special characters in the value", () => {
    const expectedQuery = 'propertyName !_-= "$pecial*Value"';

    queryBuilder.doesNotEndWith("propertyName", "$pecial*Value");

    expect(queryBuilder.build()).toBe(expectedQuery);
  });

  test("it should add the correct condition to the query", () => {
    queryBuilder.doesNotSoundLike("name", "example");
    const result = queryBuilder.build();
    expect(result).toBe('name !~ "example"');
  });

  test("it should handle numbers as well", () => {
    queryBuilder.doesNotSoundLike("age", 42);
    const result = queryBuilder.build();
    expect(result).toBe('age !~ "42"');
  });

  test("it should chain correctly with other methods", () => {
    queryBuilder
      .startsWith("name", "A")
      .and()
      .doesNotSoundLike("description", "bad");
    const result = queryBuilder.build();
    expect(result).toBe('name _= "A" && description !~ "bad"');
  });

  it("should generate correct query for doesNotHave", () => {
    const property = "name";
    const value = "John";

    const result = queryBuilder.doesNotHave(property, value).build();

    expect(result).toBe(`${property} !^$ "${value}"`);
  });

  it("should generate correct query for doesNotHaveCaseInsensitive", () => {
    const property = "name";
    const value = "John";

    const result = queryBuilder
      .doesNotHaveCaseInsensitive(property, value)
      .build();

    expect(result).toBe(`${property} !^$* "John"`);
  });

  it("should generate a not equals case-insensitive condition", () => {
    const condition = queryBuilder
      .notEqualsCaseInsensitive("name", "John")
      .build();
    expect(condition).toBe('name !=* "John"');
  });
  it("should create a query for doesNotStartWithCaseInsensitive", () => {
    const result = queryBuilder
      .doesNotStartWithCaseInsensitive("name", "John")
      .build();
    expect(result).toEqual('name !_=* "John"');
  });

  it("should create a query for endsWithCaseInsensitive", () => {
    const result = queryBuilder.endsWithCaseInsensitive("name", "Doe").build();
    expect(result).toEqual('name _-=* "Doe"');
  });

  it("should create a query for doesNotEndWithCaseInsensitive", () => {
    const result = queryBuilder
      .doesNotEndWithCaseInsensitive("email", "example.com")
      .build();
    expect(result).toEqual('email !_-=* "example.com"');
  });

  it("should create a query for containsCaseInsensitive", () => {
    const result = queryBuilder
      .containsCaseInsensitive("description", "awesome")
      .build();
    expect(result).toEqual('description @=* "awesome"');
  });

  it("startsWithCaseInsensitive should generate correct query", () => {
    const result = queryBuilder
      .startsWithCaseInsensitive("name", "John")
      .build();
    expect(result).toBe('name _=* "John"');
  });

  it("inCaseInsensitive should generate correct query", () => {
    const result = queryBuilder
      .inCaseInsensitive("status", ["active", "inactive"])
      .build();
    expect(result).toBe('status ^^* ["active", "inactive"]');
  });

  it("countGreaterThanOrEqual should generate correct query", () => {
    const result = queryBuilder.countGreaterThanOrEqual("comments", 5).build();
    expect(result).toBe("comments #>= 5");
  });

  it("greaterThanCaseCount should generate correct query", () => {
    const result = queryBuilder.greaterThanCaseCount("likes", 10).build();
    expect(result).toBe("likes #> 10");
  });

  it("lessThanCaseCount should generate correct query", () => {
    const result = queryBuilder.lessThanCaseCount("views", 100).build();
    expect(result).toBe("views #< 100");
  });

  it("greaterThanOrEqualCaseCount should generate correct query", () => {
    const result = queryBuilder
      .greaterThanOrEqualCaseCount("followers", 1000)
      .build();
    expect(result).toBe("followers #>= 1000");
  });

  it("lessThanOrEqualCaseCount should generate correct query", () => {
    const result = queryBuilder.lessThanOrEqualCaseCount("age", 30).build();
    expect(result).toBe("age #<= 30");
  });
});
