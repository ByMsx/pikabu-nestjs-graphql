import { GraphQLScalarType } from 'graphql';

export type UUID = string;
export const UUIDConstructor = new GraphQLScalarType({
  name: 'UUID',
  description: 'String',
});

export type Markdown = string;
export const MarkdownConstructor = new GraphQLScalarType({
  name: 'Markdown',
  description: 'String formatted with Markdown',
});

export interface RequestUser {
  id: UUID;
}
