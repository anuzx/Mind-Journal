import crypto from "crypto";

export function random(len: number) {
  const bytes = crypto.randomBytes(len);
  const options = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let ans = "";
  for (let i = 0; i < len; i++) {
    ans += options[bytes[i]! % options.length];
  }
  return ans;
}
