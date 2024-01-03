const CodeBlockNode = (props) => {
  return (
    <pre {...props.attributes} className="bg-gray-200 p-1 rounded-sm">
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeBlockNode;
