import { Mail } from "lucide-react";
import Link from "next/link";

export default function ContactArea() {
  return (
    <div className="text-center py-4 ">
      <h2 className="text-3xl font-bold mb-3 font-anymale">Contact</h2>
      <Link
        href="mailto:yosemic@gmail.com"
        className="inline-flex items-end gap-2 text-xl hover:text-gray-300 transition-colors font-bold"
      >
        <Mail className="w-7 h-7" />
        yosemic@gmail.com
      </Link>
    </div>
  );
}
