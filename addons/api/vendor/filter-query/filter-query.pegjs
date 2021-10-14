// A PEG for Boundary API's filter query language:
// https://www.boundaryproject.io/docs/concepts/filtering

{
  function buildBinaryExpression(opcode, left, right) {
    return { opcode, left, right };
  }
}

root = _ expression:Expression _ { return expression; }

Expression
  = BooleanExpression
  / MatchExpression
  / ParentheticalExpression

ParentheticalExpression
  = '(' _ expression:Expression _ ')' {
    return expression;
  }

// =Boolean Expressions
// Boolean Expressions are binary expressions that take two other expressions
// as input.

BooleanExpression
  = AndExpression
  / OrExpression

AndExpression
  = left:(MatchExpression / ParentheticalExpression) _ 'and' _ right:Expression {
    return buildBinaryExpression('and', left, right);
  }

OrExpression
  = left:(MatchExpression / ParentheticalExpression) _ 'or' _ right:Expression {
    return buildBinaryExpression('or', left, right);
  }

// =Match Expressions
// Match Expressions are binary expressions that take either a string literal or
// an item attribute reference as input.

MatchExpression
  = InExpression
  / NotInExpression
  / EqualsExpression
  / NotEqualsExpression

InExpression
  = left:StringLiteral _ 'in' _ right:ItemAttributeReference {
    return buildBinaryExpression('in', left, right);
  }

NotInExpression
  = left:StringLiteral _ 'not in' _ right:ItemAttributeReference {
    return buildBinaryExpression('notIn', left, right);
  }

EqualsExpression
  = left:ItemAttributeReference _ '==' _ right:StringLiteral {
  	return buildBinaryExpression('equals', left, right);
  }

NotEqualsExpression
  = left:ItemAttributeReference _ '!=' _ right:StringLiteral {
  	return buildBinaryExpression('notEquals', left, right);
  }

// =Item Attribute Reference
// This is a string representing an dotted attribute name.

ItemAttributeReference
  = '"/item/' str:([^"]+) '"' {
    return str.join('').replace('/', '.');
  }

// =Strings

StringLiteral = '"' str:([^"]+) '"' { return str.join(''); }
_ = WhiteSpace*
WhiteSpace
  = "\t"
    / "\r"
    / "\n"
    / " "
