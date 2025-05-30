import React from "react";
import Link from "next/link";
//import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export function BreadcrumbNav() {
  //const pathname = usePathname();
  const { items } = useBreadcrumbStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem
              className={index === items.length - 1 ? "text-primary" : ""}
            >
              {item.href && index < items.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                item.label
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
