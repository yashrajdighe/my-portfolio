import Nav from "@/components/Nav";
import { getBasics } from "@/lib/resume";

/**
 * Server wrapper that resolves basics (name, profiles, email) once and hands
 * them to the client Nav. Use this on every page so the top-right social
 * cluster stays consistent site-wide.
 */
export default async function NavBar() {
  const basics = await getBasics();
  return (
    <Nav
      name={basics?.name}
      profiles={basics?.profiles ?? []}
      email={basics?.email}
    />
  );
}
