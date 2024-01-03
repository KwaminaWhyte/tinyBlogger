const ItalicNode = (props) => {
  return (
    <em {...props.attributes} className="italic">
      {props.children}
    </em>
  );
};

export default ItalicNode;
