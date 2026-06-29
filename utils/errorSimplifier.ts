export default function simplifyError(error: string | undefined) {
  switch (error) {
    case "Invalid login credentials":
      return "Account couldn't be found, or the password was incorrect. Maybe try creating an account?";
      break;
    default:
      return "An unknown error occured.";
      break;
  }
}
