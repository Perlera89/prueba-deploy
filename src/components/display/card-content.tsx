import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardItemProps {
  title: string;
  children: React.ReactNode;
}

export default function CardItem({ title, children }: CardItemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </CardContent>
    </Card>
  );
}
