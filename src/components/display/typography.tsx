interface ChildrenProps {
  children: React.ReactNode;
}

type ReadonlyChildrenProps = Readonly<ChildrenProps>;

export function H1({ children }: ReadonlyChildrenProps): React.ReactElement {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function H2({ children }: ReadonlyChildrenProps): React.ReactElement {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ children }: ReadonlyChildrenProps): React.ReactElement {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function H4({ children }: ReadonlyChildrenProps): React.ReactElement {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function Lead({ children }: ReadonlyChildrenProps): React.ReactElement {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function Muted({ children }: ReadonlyChildrenProps): React.ReactElement {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function P({ children }: ReadonlyChildrenProps): React.ReactElement {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
