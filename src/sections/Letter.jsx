import FinalLetter from "../components/FinalLetter";
import { config } from "../data/config";

export default function Letter() {
  return (
    <section className="relative flex min-h-svh w-full items-center justify-center bg-warm-white">
      <FinalLetter letter={config.finalLetter} senderName={config.senderName} />
    </section>
  );
}
