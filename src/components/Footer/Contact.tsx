import { Mail } from "lucide-react";
import Link from "next/link";

export function Contact() {
  return (
    <div className="text-center py-8 ">
      <h2 className="text-2xl font-bold mb-3 font-anymale">Contact</h2>
      <Link
        href="mailto:yosemic@gmail.com"
        className="inline-flex items-end gap-2 text-lg hover:text-gray-300 transition-colors font-bold"
      >
        <Mail className="w-7 h-7" />
        yosemic@gmail.com
      </Link>
    </div>
  );
}
