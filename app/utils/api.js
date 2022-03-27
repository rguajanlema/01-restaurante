import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const auth = getAuth();
export function reauthenticate(password) {
  const user = auth.currentUser;

  const credentials = EmailAuthProvider.credential(user.email, password);

  return reauthenticateWithCredential(user, credentials);
}
