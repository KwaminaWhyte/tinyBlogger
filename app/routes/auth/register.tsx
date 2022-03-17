import { Link } from "remix";

function Register() {
  return (
    <div>
      <h1>Registration Page</h1>
      <Link to="/auth">Already have an Account?</Link>
    </div>
  );
}

export default Register;
