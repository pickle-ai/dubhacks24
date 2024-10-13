// Home page component
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="font-mono text-center">
        <h1 className="text-center align-middle text-6xl font-extrabold text-green-500">
          Pickle AI
        </h1>
        <p>Personalized feedback on your code solutions!</p>
        <p className="text-center">Get Started:</p>
        <Button>Log in</Button> <Button>Sign up</Button>
      </div>
    </>
  );
}
