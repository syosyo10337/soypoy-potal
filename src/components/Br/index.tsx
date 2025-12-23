interface BrProps {
  sp?: boolean;
  md?: boolean;
  lg?: boolean;
}

export function Br({ sp = false, md = false, lg = false }: BrProps) {
  if (!sp && !md && !lg) {
    return <br />;
  }

  return (
    <>
      {sp && <br className="md:hidden" />}
      {md && <br className="hidden md:inline lg:hidden" />}
      {lg && <br className="hidden lg:inline" />}
    </>
  );
}
