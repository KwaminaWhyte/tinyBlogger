import React from "react";

const ListItemNode = ({ attributes, children }) => (
  <li {...attributes}>{children}</li>
);

const OrderedListNode = ({ attributes, children }) => (
  <ol {...attributes}>{children}</ol>
);

const UnorderedListNode = ({ attributes, children }) => (
  <ul {...attributes}>{children}</ul>
);

export { ListItemNode, OrderedListNode, UnorderedListNode };
