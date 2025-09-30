import { Mail } from "lucide-react";
import Link from "next/link";

// TODO: スタイル調整
export default function ContactArea() {
  return (
    <div className="text-center py-8 ">
      <h2 className="text-3xl font-bold mb-4 font-anymale">CONTACT</h2>
      <Link
        href="mailto:yosemic@gmail.com"
        className="inline-flex items-center gap-3 text-xl hover:text-gray-300 transition-colors font-bold"
      >
        <Mail className="w-6 h-6" />
        yosemic@gmail.com
      </Link>
    </div>
  );
}
