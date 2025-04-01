/* Regex Password:
  - ^ and $: Ensure the entire string follows the pattern.
  - (?=.*[A-Z]): Requires at least one uppercase letter.
  - (?=.*[a-z]): Requires at least one lowercase letter.
  - (?=.*\d): Requires at least one numeric digit (0-9).
  - (?=.*[^A-Za-z0-9]): Requires at least one special character (e.g., !@#$%^&*).
  - .{8,}: Ensures the password is at least 8 characters long. 
*/
export const regexPassword: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


/*  Regex Phone number:
  -  Ensure the entire string matches exactly 10 digits.
*/
export const regexPhoneNumber: RegExp = /(0[3|5|7|8|9])+([0-9]{8})\b/;  

/* Regex Email:
  -  ^ and $: Ensure the entire string matches the pattern.
  -  [a-zA-Z0-9._%+-]+: Matches the local part (before @), allowing letters, digits, dots (.), underscores (_), plus (+), and hyphens (-).
  -  @: The required "@" symbol separating the local part and domain.
  -  [a-zA-Z0-9.-]+: Matches the domain name, allowing letters, digits, dots (.), and hyphens (-).
  -  \.[a-zA-Z]{2,}: Matches the top-level domain (TLD), ensuring it consists of at least two letters (e.g., .com, .org, .net).
*/
export const regexEmail: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  