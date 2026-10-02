import { supabase } from "./supabase";
import storage from "./storage"
export default async function setUserData() {
  const isGuest = (await storage.getString("username")) == "Guest";
  const userDataExists = await storage.getString("created_at");
  if (userDataExists) {
    return;
  } else if (isGuest) {
    storage.set("isGuest", "yes");
    storage.set("pfp", "noprofile.jpg")
    return;
  } else {
  
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      console.error(error || "no user was detected.");
      return; //TODO: add error handling logic
    }
    const id = user.id;
    const { data: userdata, error: usererror } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id);
    if (!userdata || usererror) {
      console.error(usererror || "error selecting user data.");
      return; //TODO: add error handling logic
    }
      storage.set("created_at", userdata[0].created_at)
      storage.set("followersNum", userdata[0].followers)
      storage.set("pfp", userdata[0].pfp)
      storage.set("public", userdata[0].public)
      storage.set("username", userdata[0].username)
      storage.set("id","userdata[0].id")
      storage.set("name", userdata[0].name)
  }
}
