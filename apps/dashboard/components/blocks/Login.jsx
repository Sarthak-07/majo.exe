import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { getSession } from "lib/session";
import { ButtonPrimary } from "@/components/Buttons";
import { ProviderLogin } from "@/components/Provider";

export async function Login() {
 const session = await getSession();

 if (!session) {
  return <ProviderLogin provider={{ id: "discord", name: "Discord" }} />;
 }

 return (
  <ButtonPrimary href="/dashboard">
   <ArrowUturnRightIcon className="min-h-5 min-w-5 mr-2 h-5 w-5" aria-hidden="true" role="img" /> Go to dashboard
  </ButtonPrimary>
 );
}
