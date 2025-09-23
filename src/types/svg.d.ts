declare module "*.svg" {
  import type React from "react";
  const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
