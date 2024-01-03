import clsx from "clsx";
import React from "react";

// FIXME: Needs to handle assets files to work with SSR
// if (require("exenv").canUseDOM) require("./EmbedNode.css");

const EmbedNode = ({ attributes, editor, children, node, isFocused }) => {
  return (
    <span
      {...attributes}
      className={clsx("slate-embed-plugin--node", { active: isFocused })}
      dangerouslySetInnerHTML={{ __html: node.data.get("embed") }}
    />
  );
};

export default EmbedNode;
