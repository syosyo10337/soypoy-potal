import Instagram from "@/assets/icons/instagram.svg";

// TODO: スタイル調整
export default function BottomContent() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-sm">
      <p className="text-center md:text-left text-gray-400">
        NPO yosemic Japan ©Copyright 2025 yosemic Ltd. All rights reserved
      </p>
      <a
        href="https://instagram.com/soy.poy_"
        target="_blank"
        rel="noopener
        noreferrer"
        className="flex items-center gap-2 hover:text-gray-300
        transition-colors"
      >
        <Instagram className="w-6 h-6" />
        @soy.poy_
      </a>
    </div>
  );
}
