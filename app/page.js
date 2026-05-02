import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { userId } = auth();

  return (
    <div>
      {/* Initial Setup <br />
      <Button variant="primary"> Button </Button> <br />
      <Button variant="glass"> Button </Button> */}
    </div>
  );
}
